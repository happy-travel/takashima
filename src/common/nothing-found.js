import React from 'react';
import { Result } from 'antd';
import { BorderOuterOutlined } from '@ant-design/icons';

const NothingFoundPage = () => (
    <Result
        icon={<BorderOuterOutlined />}
        title="Nothing Found"
        subTitle="Something wrong with desired route"
        style={{ margin: '250px 0' }}
    />
);

export default NothingFoundPage;
