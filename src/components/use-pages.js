import { useLocation, useNavigate } from 'react-router-dom';

const usePages = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const page = location.state?.page || 1;

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
