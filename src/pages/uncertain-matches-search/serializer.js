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

    return {
        ...filters,
        top: top,
        skip: skip,
    };
};
