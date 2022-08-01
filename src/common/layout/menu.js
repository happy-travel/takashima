import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Space } from 'antd';
import {
    Logout,
} from 'iconsax-react';

const TopMenu = () => (
    <Space direction="horizontal" style={{
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'flex-start',
    }}>
        <div className="logo-wrapper">
            <img src="/images/logo/logo.png" alt="Happytravel.com" />
        </div>
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

export default TopMenu;
