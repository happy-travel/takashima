import React from 'react';
import { observer } from 'mobx-react';
import { EntitySelector, useSelector } from 'common/entity-selector';
import $enums from 'stores/enums';

const optionsGenerator = (list = []) =>
    list.map((value) => ({
        value: value.code,
        label: value.name || '',
    }));

const CountrySelector = observer((props) => {
    const { options, loading } = useSelector($enums.countries, optionsGenerator);

    return <EntitySelector placeholder="Any Countries" {...props} options={options} loading={loading} />;
});

export default CountrySelector;
