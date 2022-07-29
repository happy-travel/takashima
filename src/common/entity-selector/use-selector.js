import { useState, useEffect } from 'react';
import { API } from 'htcore';

const useSelector = (route, optionsGenerator) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        API.get({
            url: route,
            success: (data) => setOptions(optionsGenerator(data)),
            after: () => setLoading(false),
        });
    }, []);

    return {
        loading,
        options,
    };
};

export default useSelector;
