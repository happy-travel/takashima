import React from 'react';
import {Button, PageHeader, Space} from 'antd';
import {Link} from 'react-router-dom';

const HomePage = () => (
    <>
        <PageHeader
            title="Welcome!"
        />
        <Space>
            <Link to="/match"><Button>Find Uncertain Matches</Button></Link>
            <Link to="/history"><Button>View Match History</Button></Link>
        </Space>
    </>
);

export default HomePage;
