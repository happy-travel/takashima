import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { initApplication } from './htcore';
import { initManager, logoutManager } from './core/init';
import settings from './settings';
import { message } from 'antd';
import Loader from './core/loader';

import './styles/antd.less';
import './styles/styles.sass';

initApplication({
    settings,
    getLocale: () => 'en',
    showNotification: (text, type) => {
        if (type === 'Error') {
            return message.error(text, 10);
        }
        if (type === 'Information') {
            return message.info(text, 10);
        }
        return message.warning(text, 10);
    },
    onLogin: (auth) => {
        initManager(auth);
    },
    onLogout: () => {
        logoutManager();
    },
    Loader: () => <Loader white page />,
});

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
