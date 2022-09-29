import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import { Menu, Space } from 'antd';
import {
    Logout,
    InfoCircle,
    LinkCircle,
    RepeatCircle,
} from 'iconsax-react';

const TopMenu = () => {
    const location = useLocation();
    let selectedKey = location.pathname.split('/')[1];
    return (
        <Space direction="horizontal" style={{
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'flex-start',
        }}>
            <Space direction="horizontal">
                <div className="logo-wrapper">
                    <img src="/images/logo/logo.png" alt="Happytravel.com" />
                </div>
                <Menu
                    mode="horizontal"
                    selectedKeys={selectedKey}
                    items={[
                        {
                            label: <Link to="/">Instructions</Link>,
                            key: '',
                            icon: <InfoCircle />,
                        },
                        {
                            label: <Link to="/match">Matches</Link>,
                            key: 'match',
                            icon: <LinkCircle />,
                        },
                        {
                            label: <Link to="/history">History</Link>,
                            key: 'history',
                            icon: <RepeatCircle />,
                        },
                    ]}
                />
            </Space>
            <Menu
                items={[
                    {
                        label: <Link to="/logout">Sign Out</Link>,
                        key: 'logout',
                        icon: <Logout />,
                    },
                ]}
            />
        </Space>
    );
};

export default TopMenu;
