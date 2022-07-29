import { makeAutoObservable } from 'mobx';

class EnumsStore {
    suppliers = null;
    countries = null;

    constructor() {
        makeAutoObservable(this);
    }

    setSuppliers(values) {
        this.suppliers = values;
    }
    setCountries(values) {
        this.countries = values;
    }
}

export default new EnumsStore();
