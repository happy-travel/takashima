import React from 'react';
import { observer } from 'mobx-react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AuthCallback, AuthSilent, AuthLogout, AuthKeeperComponent } from './htcore/auth/pages';
import PageTemplate from './core/page-template';
import $auth from 'stores/auth';

const App = observer(() => (
    <BrowserRouter>
        <Routes>
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/auth/silent" element={<AuthSilent />} />
            <Route path="/logout" element={<AuthLogout />} />
            <Route
                path="/*"
                element={
                    <React.Fragment key={$auth.token}>
                        <AuthKeeperComponent />
                        <PageTemplate />
                    </React.Fragment>
                }
            />
        </Routes>
    </BrowserRouter>
));

export default App;
