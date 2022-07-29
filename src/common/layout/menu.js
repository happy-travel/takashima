import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import $auth from 'stores/auth';
import { Menu } from 'antd';
import { useLocation } from 'react-router-dom';
import {
    NotificationBing,
    Logout,
} from 'iconsax-react';

const TopMenu = observer(() => {
    const location = useLocation();
 // todo
    return (
        <>
            <Link to="/" className="logo-wrapper">
                <img src="/images/logo/logo.png" alt="Happytravel.com" />
            </Link>

            {Boolean($auth.information) && (
                <>
                    <Menu
                        items={[
                            {
                                label: <Link to="/settings">Notification Settings</Link>,
                                key: 'settings',
                                icon: <NotificationBing />,
                            },
                            {
                                label: <Link to="/logout">Sign Out</Link>,
                                key: 'logout',
                                icon: <Logout />,
                            },
                        ]}
                    />
                </>
            )}
        </>
    );
});

export default TopMenu;
