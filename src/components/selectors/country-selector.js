import React from 'react';
import { RequestSelector } from 'common/request-selector';
import apiMapperMethods from 'core/mapper-methods';

// todo

const optionsGenerator = (list = []) =>
    list.map((value) => ({
        value: value.id,
        label: value.countryName,
    }));

const CountrySelector = (props) => (
    <RequestSelector
        request={(value) => ({
            url: apiMapperMethods.searchCountries,
            body: {
                query: value,
            },
        })}
        optionsGenerator={optionsGenerator}
        placeholder="Any Country"
        {...props}
    />
);

export default CountrySelector;
