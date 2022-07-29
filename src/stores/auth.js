import { makeAutoObservable } from 'mobx';
import autosave from 'htcore/misc/autosave';

class AuthStore {
    token = null;
    information = null;
    initialized = false;

    constructor() {
        makeAutoObservable(this);
        autosave(this, '_auth_store_cache');
    }
    setToken(values) {
        this.token = values;
        this.initialized = true;
    }
    setInformation(values) {
        this.information = values;
    }
}

export default new AuthStore();
