import { UserManager } from 'oidc-client';

let OidcInstance = null;

export const initOidcInstance = (settings) => {
    const host = window.location.origin;
    const config = {
        authority: settings.identityUrl,
        client_id: settings.identityClientId,
        scope: settings.identityScope,
        post_logout_redirect_uri: host,
        redirect_uri: host + '/auth/callback',
        silent_redirect_uri: host + '/auth/silent',
        response_type: 'code',
        automaticSilentRenew: true,
        loadUserInfo: true,
        filterProtocolClaims: true,
        accessTokenExpiringNotificationTime: 4
    };
    OidcInstance = new UserManager(config);
};

export default () => OidcInstance;
