import React from 'react';
import Loader from 'core/loader';
import { Layout } from 'antd';
import { authorized } from 'htcore';
import TopMenu from '../common/layout/menu';
import RoutesPage from 'core/routes';

const { Content } = Layout;

const PageTemplate = () => {
    if (!authorized()) {
        return <Loader page />;
    }

    return (
        <Layout>
            <Content>
                <TopMenu />
                <RoutesPage />
            </Content>
        </Layout>
    );
};

export default PageTemplate;
