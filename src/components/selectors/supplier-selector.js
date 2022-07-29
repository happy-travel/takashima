import React from 'react';
import { EntitySelector, useSelector } from 'common/entity-selector';
import apiMapperMethods from 'core/mapper-methods';

// todo

const optionsGenerator = (list) =>
    Object.keys(list).map((key) => ({
        value: key,
        label: list[key],
    }));

const SupplierSelector = (props) => {
    const { options, loading } = useSelector(apiMapperMethods.suppliersList, optionsGenerator);

    return <EntitySelector placeholder="Any Supplier" {...props} options={options} loading={loading} />;
};

export default SupplierSelector;
