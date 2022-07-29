import { useEffect } from 'react';
import { HTCore } from './init-application';

const useTitle = (title, noSuffix, initiatiors) => {
    const { settings } = HTCore;

    useEffect(() => {
        let newTitle = title || '';
        if (title && !noSuffix) {
            newTitle += ' — ';
        }
        if (!noSuffix) {
            newTitle += settings.pageTitleSuffix
        }
        window.document.title = newTitle;
    }, initiatiors || []);

    return null;
};

export default useTitle;
