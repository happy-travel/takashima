const safeString = (val) => val.replace(/'/g, "''");

export const serializeRequest = (values, top = 10, skip = 0) => {
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

    filters.fromDate = values.rangeDates[0].format('YYYY-MM-DDT00:00:00') + 'Z';
    filters.toDate = values.rangeDates[1].format('YYYY-MM-DDT23:59:59') + 'Z';

    return {
        countryCodes: [],
        supplierCodes: [],
        accommodationNameQuery: '',
        ...filters,
        top: top,
        skip: skip,
    };
};
