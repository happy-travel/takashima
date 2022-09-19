import React, { useState, useEffect } from 'react';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import { API, useTitle } from 'htcore';
import apiMethods from 'core/methods';
import {PageHeader, Button, Space} from 'antd';
import Loader from 'core/loader';
import MatchingTable from 'components/matching-table';
import {LeftCircleOutlined, ToTopOutlined} from '@ant-design/icons';

const UncertainMatch = () => {
    const { relationAccommodationId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useTitle(`Uncertain Match ${relationAccommodationId}`);

    const [accommodations, setAccommodations] = useState(null);
    const [mergeResult, setMergeResult] = useState({});
    const [tableLoading, setTableLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

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

    useEffect(() => {
        loadPage();
    }, []);

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

    const onShowDetails = (htId) => {
        ///GET
        // apiMethods.accommodationDetails
        alert('details ' + htId);
    };

    const onSubmitMerge = () => {
        // todo: confirmation

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
            success: (result) => {
                // todo: notify success
                // todo: return back
                alert('success. result in console');
                console.log(result);
            },
            after: () => setPageLoading(false)
        });
    };

    const onDeactivate = () => {
        //POST
        // apiMethods.uncertainMatchDeactivate
        // Deactivates related uncertain matches by relation id
    };

    const onReset = () => {
        // todo: confirmation
        loadPage();
        setMergeResult({});
    };

    if (!accommodations) {
        return null;
    }

    const ControlRow = {
        header: '',
        render: (item) => item.id !== accommodations[0].id ? <Space size="small">
            { !Object.keys(mergeResult).includes(item.htId) &&
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
                    <Button onClick={onReset}>Reset</Button>
                    <Button type="primary" onClick={onSubmitMerge} disabled={!Object.keys(mergeResult).length}>
                        Submit Merge Result
                    </Button>
                </>}
            />
            <MatchingTable
                accommodations={accommodations}
                mergeResult={mergeResult}
                loading={tableLoading}
                ControlRow={ControlRow}
            />
        </>
    );
};

export default UncertainMatch;
