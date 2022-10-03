import React, { useState, useEffect } from 'react';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import { API, useTitle } from 'htcore';
import apiMethods from 'core/methods';
import {PageHeader, Button, Space, notification, Popconfirm} from 'antd';
import Loader from 'core/loader';
import MatchingTable from 'components/matching-table';
import {LeftCircleOutlined, QuestionCircleOutlined, ToTopOutlined} from '@ant-design/icons';

const UncertainMatch = () => {
    const { relationAccommodationId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useTitle(`Uncertain Match ${relationAccommodationId}`);

    const [accommodations, setAccommodations] = useState(null);
    const [mergeResult, setMergeResult] = useState({});
    const [tableLoading, setTableLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [isMainSelected, setMainSelected] = useState(false);

    const loadPage = () => {
        setPageLoading(true);
        API.get({
            url: apiMethods.uncertainMatch(relationAccommodationId),
            success: (result) => {
                setAccommodations(result.accommodations);
                setPageLoading(false);
            },
        });
    };

    useEffect(loadPage, []);

    const onMerge = (htId) => {
        setTableLoading(true);
        setMergeResult({
            ...mergeResult,
            [accommodations[0].htId]: (
                mergeResult[accommodations[0].htId] ? [
                    ...mergeResult[accommodations[0].htId],
                    htId
                ] : [htId]
            ),
        });
        setAccommodations([
            ...accommodations
                .filter((accommodation) => accommodation.htId !== htId),
        ]);
        setTimeout(() => {
            setTableLoading(false);
        }, 300);
    };

    const onSetMain = (htId) => {
        setTableLoading(true);
        setMainSelected(true);
        setAccommodations([
            ...accommodations
                .filter((accommodation) => accommodation.htId === htId),
            ...accommodations
                .filter((accommodation) => accommodation.htId !== htId)
                .sort((a, b) => Number(Object.keys(mergeResult).includes(a.htId)) - Number(Object.keys(mergeResult).includes(b.htId))),
        ]);
        setTimeout(() => {
            setTableLoading(false);
        }, 300);
    };

    const onSubmitMerge = () => {
        if (!Object.keys(mergeResult).length) {
            return;
        }

        setPageLoading(true);

        const body = {
            AccommodationHtIds: Object.keys(mergeResult).map(
                (groupMainItem) => ({
                    HtIds: [
                        groupMainItem,
                        ...mergeResult[groupMainItem],
                    ],
                })
            ),
            RelationAccommodationId: relationAccommodationId
        };

        API.post({
            url: apiMethods.uncertainMatchesMerge(),
            body,
            success: () => {
                notification.success({
                    message: `Merged!`,
                    description: 'This Uncertain Match merged as you formed request. Merge result will be added to the Merge History soon.',
                    placement: 'top',
                });
                navigate('./..');
            },
            after: () => setPageLoading(false)
        });
    };

    const onDeactivate = () => {
        setPageLoading(true);
        API.post({
            url: apiMethods.uncertainMatchDeactivate(relationAccommodationId),
            success: () => {
                notification.success({
                    message: `Deactivate!`,
                    description: 'This Uncertain Match was deactivated as you mentioned that there are nothing to merge.',
                    placement: 'top',
                });
                navigate('./..');
            },
            after: () => setPageLoading(false)
        });
    };

    const onReset = () => {
        loadPage();
        setMergeResult({});
        setMainSelected(false);
    };

    if (!accommodations) {
        return null;
    }

    const ControlRow = {
        header: '',
        render: (item) => (item.id !== accommodations[0].id || !isMainSelected) ? <Space size="small">
            { !Object.keys(mergeResult).includes(item.htId) && isMainSelected &&
                <Button
                    type="primary"
                    size="small"
                    icon={<LeftCircleOutlined />}
                    onClick={() => onMerge(item.htId)}
                >
                    Merge
                </Button>
            }
            <Button
                size="small"
                icon={<ToTopOutlined />}
                onClick={() => onSetMain(item.htId)}
            >
                Set As Main
            </Button>
        </Space> : null,
    };

    return (
        <>
            { pageLoading &&
                <Loader page />
            }
            <PageHeader
                onBack={() => navigate(-1, { state: location?.state })}
                title="Uncertain Match"
                extra={<>
                    <Popconfirm
                        title="Reset changes on page？"
                        icon={<QuestionCircleOutlined />}
                        onConfirm={onReset}
                    >
                        <Button>Reset</Button>
                    </Popconfirm>
                    <Popconfirm
                        title="Deactivate a merge request？"
                        icon={<QuestionCircleOutlined />}
                        onConfirm={onDeactivate}
                        disabled={Boolean(Object.keys(mergeResult).length)}
                    >
                        <Button disabled={Boolean(Object.keys(mergeResult).length)}>
                            Nothing to Merge
                        </Button>
                    </Popconfirm>
                    <Popconfirm
                        title="Submit Merge request"
                        icon={<QuestionCircleOutlined />}
                        onConfirm={onSubmitMerge}
                        disabled={!Object.keys(mergeResult).length}
                    >
                        <Button type="primary" disabled={!Object.keys(mergeResult).length}>
                            Submit Merge Result
                        </Button>
                    </Popconfirm>
                </>}
            />
            <MatchingTable
                accommodations={accommodations}
                mergeResult={mergeResult}
                loading={tableLoading}
                ControlRow={ControlRow}
                isMainSelected={isMainSelected}
            />
        </>
    );
};

export default UncertainMatch;
