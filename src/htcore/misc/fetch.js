import { HTCore } from '../base/init-application';
import OidcInstance from '../auth/oidc-instance';

const API = {};

API.request = (requestParams) => {
    const {
        url,          // Edo API route
        osaka,        // Osaka API route
        komoro,       // Komoro API route
        body,         // json body to submit
        formDataBody, // data body to submit, will ignore 'body' whenever set
        method,       // http method to fire
        response,     // function(response)                - Fires first
        success,      // function(result)                  - Fires second on success
        error,        // function(error)                   - Fires second on error,
        after,        // function(result, error, response) - Fires the last
        noAuth,       // force to exclude auth token from request
        ignoreErrors, // will not show errors when set
        headers       // Array of response headers names - allow to load headers
    } = requestParams;

    const getLocale = HTCore.getLocale;
    const settings = HTCore.settings;
    const showNotification = HTCore.showNotification;

    const showError = (err, url = '', requestParams) => {
        if (requestParams.ignoreErrors) {
            return;
        }
        if (typeof err.detail == 'string') {
            return showNotification(err.detail);
        }
        if (typeof err.title == 'string') {
            return showNotification(err.title, 'Error');
        }
        if (typeof err == 'string') {
            return showNotification(err, 'Information');
        }
        showNotification('Server Request Error');
    };

    let urlToExecute;
    if (url) {
        urlToExecute = settings.edo(getLocale()) + url;
    }
    if (osaka) {
        urlToExecute = settings.osaka(getLocale()) + osaka;
    }
    if (komoro) {
        urlToExecute = settings.komoro(getLocale()) + komoro;
    }

    return new Promise((resolve, reject) => {
        OidcInstance().getUser().then((auth) => {
            if (!noAuth && !auth?.access_token) {
                return;
            }

            let finalUrl = urlToExecute;
            let responseHeaders = [];
            let request = {
                method,
                headers: new Headers({
                    ...(noAuth ? {} : {
                        'Authorization': `Bearer ${auth.access_token}`
                    }),
                    ...(formDataBody ? {} : {
                        'Content-Type': 'application/json'
                    })
                })
            };

            if (method === 'GET') {
                const getBody = Object.keys(body || {}).map((key) =>
                    Array.isArray(body[key]) ?
                        body[key].map(item => [key, item].map(encodeURIComponent).join('=')) :
                        [key, body[key]].map(encodeURIComponent).join('=')
                ).flat().join('&');
                finalUrl += (getBody ? '?' + getBody : '');
            } else {
                if (formDataBody) {
                    request.body = formDataBody;
                } else if (body) {
                    request.body = JSON.stringify(body);
                }
            }

            let rawResponse = null;
            let failed = false;

            fetch(finalUrl, request)
                .then(
                    (res) => {
                        if (headers) {
                            responseHeaders = headers.map((item) => (res.headers.get(item)));
                        }
                        rawResponse = res;
                        failed = !res || (res && res.status >= 300);
                        if (response) {
                            response(res);
                            return;
                        }
                        return res.text().then((text) => {
                            let value = null;
                            if (text) {
                                try {
                                    value = JSON.parse(text);
                                } catch (e) {
                                    value = text;
                                }
                            }
                            if (headers) {
                                return [value, ...responseHeaders];
                            }
                            return value;
                        });
                    },
                    (error) => {
                        showError(error, url, requestParams);
                        reject(error);
                    }
                )
                .then(
                    (result) => {
                        if (!rawResponse?.status) {
                            reject(null);
                            return;
                        }
                        if (rawResponse.status === 401) {
                            OidcInstance().signinSilent().then(() => {
                                api.request(requestParams);
                            }).catch(() => {
                                OidcInstance().signinRedirect({ state: window.location.pathname });
                            });
                            reject(null);
                            return;
                        }
                        if (rawResponse.status === 403) {
                            showError('Sorry, you don`t have enough permissions', url, requestParams);
                            if (error) {
                                error(result);
                            }
                            if (after) {
                                after(null, null, rawResponse);
                            }
                            reject(result);
                            return;
                        }
                        if (failed) {
                            if (result && result.status >= 400) {
                                showError(result, url, requestParams);
                            }
                            if (error) {
                                error(result);
                            }
                        } else {
                            if (success) {
                                success(result);
                            }
                        }
                        if (after)
                            after(
                                failed ? null : result,
                                failed ? result : null,
                                rawResponse
                            );
                        if (!failed) {
                            resolve(result);
                        }  else {
                            reject(result);
                        }
                    },
                    (err) => {
                        if (error) {
                            error(err);
                        } else {
                            showError(err, null, requestParams);
                        }
                        if (after) {
                            after(null, err, rawResponse);
                        }
                        reject(err);
                    }
                );
            }
        );
    });
};

API.get = (params) =>
    API.request({
        method: 'GET',
        ...params
    });

API.post = (params) =>
    API.request({
        method: 'POST',
        ...params
    });

API.put = (params) =>
    API.request({
        method: 'PUT',
        ...params
    });

API.delete = (params) =>
    API.request({
        method: 'DELETE',
        ...params
    });

export default API;
