import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UncertainMatchesSearchPage from 'pages/uncertain-matches-search';
import NothingFoundPage from 'common/nothing-found';
import {Form} from 'antd';

const RoutesPage = () => {
    const [uncertainMatchesSearchForm] = Form.useForm();

    return (
        <Routes>
            <Route path="/" element={<UncertainMatchesSearchPage uncertainMatchesSearchForm={uncertainMatchesSearchForm} />} />
            <Route path="*" element={<NothingFoundPage />} />
        </Routes>
    );
};

export default RoutesPage;
