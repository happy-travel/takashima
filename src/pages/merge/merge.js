import React, { useState, useEffect } from 'react';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import { API, useTitle } from 'htcore';
import apiMethods from 'core/methods';
import {PageHeader, Button, Space} from 'antd';
import Loader from 'core/loader';
import MatchingTable from 'components/matching-table';
import {RightCircleOutlined} from '@ant-design/icons';

const UncertainMatch = () => {
    const { mergeId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useTitle(`Merge ${mergeId}`);

    const [accommodations, setAccommodations] = useState(null);
    const [mergeResult, setMergeResult] = useState([]);
    const [tableLoading, setTableLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    const loadPage = () => {
        setPageLoading(true);
        API.get({
            url: apiMethods.mergeHistoryItem(mergeId),
            success: (result) => {
                setAccommodations([
                    result.sourceAccommodation,
                    ...result.mergedAccommodations,
                ]);
                setPageLoading(false);
            },
        });
    };

    useEffect(loadPage, []);

    const onSubmit = () => {
        // todo: confirmation

        if (!Object.keys(mergeResult).length) {
            return;
        }

        setPageLoading(true);

        API.post({
            url: apiMethods.mergeHistoryUnmerge(mergeId),
            body: {
                mergedAccommodationHtIds: mergeResult
            },
            success: (result) => {
                // todo: notify success
                // todo: return back
                alert('success. result in console');
                console.log(result);
            },
            after: () => setPageLoading(false)
        });
    };

    const onReset = () => {
        // todo: confirmation
        loadPage();
        setMergeResult([]);
    };

    const onUnmerge = (htId) => {
        setTableLoading(true);
        setMergeResult([
            ...mergeResult,
            htId,
        ]);
        setTimeout(() => {
            setTableLoading(false);
        }, 300);
    };

    const ControlRow = {
        header: '',
        render: (item) => item.id !== accommodations[0].id ? <Space size="small">
            { !mergeResult.includes(item.htId) &&
                <Button
                    type="primary"
                    size="small"
                    icon={<RightCircleOutlined />}
                    onClick={() => onUnmerge(item.htId)}
                >
                    Unmerge
                </Button>
            }
        </Space> : null,
    };

    if (!accommodations) {
        return null;
    }

    return (
        <>
            { pageLoading &&
                <Loader page />
            }
            <PageHeader
                onBack={() => navigate(-1, { state: location?.state })}
                title="History"
                extra={<>
                    <Button onClick={onReset}>Reset</Button>
                    <Button type="primary" onClick={onSubmit} disabled={!Object.keys(mergeResult).length}>
                        Submit Unmerge
                    </Button>
                </>}
            />
            <MatchingTable
                accommodations={accommodations}
                tableLoading={tableLoading}
                mergeResult={mergeResult}
                ControlRow={ControlRow}
            />
        </>
    );
};

export default UncertainMatch;
