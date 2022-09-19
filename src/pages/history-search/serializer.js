const safeString = (val) => val.replace(/'/g, "''");

export const serializeRequest = (values, top, skip) => {
    const filters = {};

    if (values.countryCodes) {
        filters.countryCodes = values.countryCodes;
    }

    if (values.supplierCodes) {
        filters.supplierCodes = values.supplierCodes;
    }

    if (values.accommodationNameQuery) {
        filters.accommodationNameQuery = safeString(values.accommodationNameQuery);
    }

    return {
        fromDate: values.rangeDates[0],
        toDate: values.rangeDates[1],
        countryCodes: [],
        supplierCodes: [],
        accommodationNameQuery: '',
        ...filters,
        top: top,
        skip: skip,
    };
};
