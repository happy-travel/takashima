import React from 'react';
import { observer } from 'mobx-react';
import { EntitySelector, useSelector } from 'common/entity-selector';
import $enums from 'stores/enums';

const optionsGenerator = (list) =>
    list
        .sort((a, b) => Number(a.enableState === 'Disabled') - Number(b.enableState === 'Disabled'))
        .map((value) => ({
            value: value.code,
            label: (value.enableState === 'Disabled' ? '(Disabled) ' : '' ) + value.name + ' (' + value.code + ')',
        }));

const SupplierSelector = observer((props) => {
    const { options, loading } = useSelector($enums.suppliers, optionsGenerator);

    return <EntitySelector placeholder="Any Suppliers" {...props} options={options} loading={loading} />;
});

export default SupplierSelector;
