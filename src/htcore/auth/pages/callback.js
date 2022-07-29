import { useEffect } from 'react';
import OidcInstance from '../oidc-instance';
import { authSetToStorage } from '../index';
import { useNavigate } from "react-router-dom";

const AuthCallbackComponent = () => {
    const navigate = useNavigate();

    const onRedirectSuccess = (auth) => {
        OidcInstance().clearStaleState();
        authSetToStorage(auth);
        navigate(auth.state || '/');
    };

    const onRedirectError = () => {
        // implement error handler
        navigate('/');
    };

    useEffect(() => {
        OidcInstance().signinRedirectCallback()
            .then(onRedirectSuccess)
            .catch(onRedirectError);
    }, []);

    return null;
};

export default AuthCallbackComponent;
