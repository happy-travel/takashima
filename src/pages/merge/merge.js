import React, { useState, useEffect } from 'react';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import { API, useTitle } from 'htcore';
import apiMethods from 'core/methods';
import { PageHeader, Button } from 'antd';
import Loader from 'core/loader';
import MatchingTable from 'components/matching-table';

const UncertainMatch = () => {
    const { mergeId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useTitle(`Merge ${mergeId}`);

    const [accommodations, setAccommodations] = useState(null);
    const [mergeResult, setMergeResult] = useState({});
    const [tableLoading, setTableLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
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
        })
    }, []);

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
            RelationAccommodationId: match.relationAccommodationId
        };

        API.post({
            url: '/accommodations/uncertain-matches/merge',
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

    const onReset = () => {
        // todo: confirmation

        setAccommodations(match?.accommodations);
        setMergeResult({});
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
                    <Button type="primary" onClick={onSubmitMerge} disabled={!Object.keys(mergeResult).length}>
                        Submit Unmerge
                    </Button>
                </>}
            />
            <MatchingTable
                accommodations={accommodations}
                tableLoading={tableLoading}
                mergeResult={mergeResult}
                ControlRow={{
                    header: '',
                    render: (item) => '',
                }}
            />
        </>
    );
};

export default UncertainMatch;
