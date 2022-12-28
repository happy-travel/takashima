import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { API, useTitle } from 'htcore';
import apiMethods from 'core/methods';
import { PageHeader, Button, Space, notification, Popconfirm } from 'antd';
import Loader from 'core/loader';
import MatchingTable from 'components/matching-table';
import { RightCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import moment from 'moment/moment';

const UncertainMatch = () => {
    const { mergeId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useTitle(`Merge ${mergeId}`);

    const [accommodations, setAccommodations] = useState(null);
    const [mergeResult, setMergeResult] = useState([]);
    const [tableLoading, setTableLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [mergeDate, setMergeDate] = useState(null);

    const loadPage = () => {
        setPageLoading(true);
        API.get({
            url: apiMethods.mergeHistoryItem(mergeId),
            success: (result) => {
                setAccommodations([result.sourceAccommodation, ...result.mergedAccommodations]);
                setMergeDate(result.mergeDate);
                setPageLoading(false);
            },
        });
    };

    useEffect(loadPage, []);

    const onSubmit = () => {
        if (!Object.keys(mergeResult).length) {
            return;
        }

        setPageLoading(true);

        API.post({
            url: apiMethods.mergeHistoryUnmerge(mergeId),
            body: {
                mergedAccommodationHtIds: mergeResult,
            },
            success: () => {
                notification.success({
                    message: `Unmerged!`,
                    description: 'Your unmerge request is processing.',
                    placement: 'top',
                });
                navigate('./..');
            },
            after: () => setPageLoading(false),
        });
    };

    const onReset = () => {
        loadPage();
        setMergeResult([]);
    };

    const onUnmerge = (htId) => {
        setTableLoading(true);
        setMergeResult([...mergeResult, htId]);
        setTimeout(() => {
            setTableLoading(false);
        }, 300);
    };

    const ControlRow = {
        header: '',
        render: (item) =>
            item.id !== accommodations[0].id ? (
                <Space size="small">
                    {!mergeResult.includes(item.htId) && (
                        <Button
                            type="primary"
                            size="small"
                            icon={<RightCircleOutlined />}
                            onClick={() => onUnmerge(item.htId)}
                        >
                            Unmerge
                        </Button>
                    )}
                </Space>
            ) : null,
    };

    if (!accommodations) {
        return null;
    }

    return (
        <>
            {pageLoading && <Loader page />}
            <PageHeader
                onBack={() => navigate(-1, { state: location?.state })}
                title={`Merged at ${moment(mergeDate).format('HH:mm:ss, DD.MM.YYYY')}`}
                subTitle={`#${mergeId}`}
                extra={
                    <>
                        <Popconfirm
                            title="Reset changes on page？"
                            icon={<QuestionCircleOutlined />}
                            onConfirm={onReset}
                        >
                            <Button>Reset</Button>
                        </Popconfirm>
                        <Popconfirm
                            title="Submit Unmerge request"
                            icon={<QuestionCircleOutlined />}
                            onConfirm={onSubmit}
                            disabled={!Object.keys(mergeResult).length}
                        >
                            <Button type="primary" disabled={!Object.keys(mergeResult).length}>
                                Submit Unmerge
                            </Button>
                        </Popconfirm>
                    </>
                }
            />
            <MatchingTable
                accommodations={accommodations}
                tableLoading={tableLoading}
                mergeResult={mergeResult}
                ControlRow={ControlRow}
                isMainSelected={true}
            />
        </>
    );
};

export default UncertainMatch;
