import { set, autorun } from 'mobx';
import { session } from './storage';

const autoSave = (store, key, shorter) => {
    let cached = session.get(key);
    const build = process.env.BUILD_VERSION;

    if (cached) {
        try {
            let value = JSON.parse(cached);
            if (value.build === build) {
                set(store, value);
            }
        } catch (error) {
            console.error(error);
        }
    }

    let throttle;
    autorun(() => {
        cached = session.get(key);
        const extendedValue = { ...store, build };
        const newValue = JSON.stringify(shorter ? shorter(extendedValue) : extendedValue);
        if (cached !== newValue) {
            clearTimeout(throttle);
            throttle = setTimeout(() => {
                session.set(key, newValue);
            }, 350)
        }
    });
};

export default autoSave;
