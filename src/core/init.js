import { API } from '../htcore';
import apiMethods from 'core/methods';
import $auth from 'stores/auth';
import $enums from 'stores/enums';

const initEnums = () => {
    API.get({
        url: apiMethods.suppliers(),
        success: (data) => $enums.setSuppliers(data),
    });
    API.get({
        url: apiMethods.countries(),
        success: (data) => $enums.setCountries(data),
    });
};

export const initManager = (auth) => {
    if (window.location.href.includes('/auth')) {
        return;
    }

    $auth.setToken(auth.profile?.email);

    initEnums();
};

export const logoutManager = () => {
    $auth.setToken(null);
    $auth.setInformation(null);
};
