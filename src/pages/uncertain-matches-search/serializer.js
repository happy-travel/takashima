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

    if (!Object.keys(filters).length) {
        return null;
    }

    return {
        ...filters,
        top: top,
        skip: skip,
    };
};
