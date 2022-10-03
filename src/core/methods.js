const apiMethods = {
    countries: () => '/countries',
    suppliers: () => '/suppliers',
    uncertainMatchesSearch: () => `/accommodations/uncertain-matches/search`,
    uncertainMatch: (relationAccommodationId) => `/accommodations/uncertain-matches/relations/${relationAccommodationId}`,
    uncertainMatchDeactivate: (relationAccommodationId) => `/accommodations/uncertain-matches/relations/${relationAccommodationId}/deactivate`,
    uncertainMatchesMerge: () => '/accommodations/uncertain-matches/merge',
    accommodationDetails: (accommodationHtId) => `/accommodations/${accommodationHtId}/detailed-data`,
    mergeHistorySearch: () => `/accommodations/merge-history/search`,
    mergeHistoryItem: (mergeId) => `/accommodations/merge-history/${mergeId}`,
    mergeHistoryUnmerge: (mergeId) => `/accommodations/merge-history/unmerge/${mergeId}`,
};

export default apiMethods;
