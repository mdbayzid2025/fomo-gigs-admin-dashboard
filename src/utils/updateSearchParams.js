import { useNavigate, useLocation } from 'react-router-dom';

export const useUpdateSearchParams = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const updateSearchParams = (paramsObject) => {
        const searchParams = new URLSearchParams(location.search);

        Object.entries(paramsObject).forEach(([key, value]) => {
            if (value) {
                searchParams.set(key, value.toString());
            } else {
                searchParams.delete(key);
            }
        });

        navigate(
            {
                pathname: location.pathname,
                search: searchParams.toString(),
            },
            { replace: true }
        );
    };

    return updateSearchParams;
};