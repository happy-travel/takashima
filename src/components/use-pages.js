import { useLocation, useNavigate } from 'react-router-dom';

const usePages = (defaultPage) => {
    const location = useLocation();
    const navigate = useNavigate();

    const page = location.state?.page || defaultPage;

    const setPage = (newPage) => {
        navigate('.', {
            state: {
                page: newPage,
            },
        });
    };

    return [
        page,
        setPage,
    ];
};

export default usePages;
