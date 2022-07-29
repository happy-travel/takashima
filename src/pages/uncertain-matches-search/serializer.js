// todo

const safeString = (val) => val.replace(/'/g, "''");

export const serializeRequest = (values, top, skip) => {
    const filters = {};

   // if (values.countryCodes) { // todo
        //filters.countryCodes = values.countryCodes;
        filters.countryCodes = ['AE'];
    //}

    if (values.supplierCodes) {
        filters.supplierCodes = values.supplierCodes;
    }

    //if (values.accommodationNameQuery) {
        //filters.accommodationNameQuery = safeString(values.accommodationNameQuery);
        filters.accommodationNameQuery = 'jumeirah';
    //}

    return {
        ...filters,
        top: top,
        skip: skip,
    };
};
