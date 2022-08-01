import { useState, useEffect } from 'react';

const useSelector = (data, optionsGenerator) => {
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!data) {
            setOptions([]);
            setLoading(true);
        } else {
            setOptions(optionsGenerator(data));
            setLoading(false);
        }
    }, [data]);

    return {
        loading,
        options,
    };
};

export default useSelector;
