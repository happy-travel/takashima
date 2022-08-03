import React, { useState, useEffect } from 'react';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import { API, useTitle } from 'htcore';
import { PageHeader, Button } from 'antd';
import Loader from 'core/loader';
import MatchingTable from './matching-table';

const UncertainMatch = () => {
    const { relationAccommodationId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    useTitle(`Uncertain Match ${relationAccommodationId}`);

    const [accommodations, setAccommodations] = useState(null);
    const [mergeResult, setMergeResult] = useState({});
    const [tableLoading, setTableLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        API.get({
            url: `/accommodations/uncertain-matches/relations/${relationAccommodationId}`,
            success: (result) => {
                setAccommodations(result.accommodations);
                setPageLoading(false);
            },
        })
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
        // /api/{v}/accommodations/{accommodationHtId}/detailed-data
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

    const onDeactivate = () => {
        //POST
        // /api/{v}/accommodations/uncertain-matches/relations/{relationAccommodationId}/deactivate
        // Deactivates related uncertain matches by relation id
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
                tableLoading={tableLoading}
                onMerge={onMerge}
                onSetMain={onSetMain}
                onShowDetails={onShowDetails}
                mergeResult={mergeResult}
            />
        </>
    );
};

export default UncertainMatch;
