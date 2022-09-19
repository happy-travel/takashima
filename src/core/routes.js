import React from 'react';
import { Routes, Route } from 'react-router-dom';
import UncertainMatchesSearchPage from 'pages/uncertain-matches-search';
import UncertainMatch from 'pages/uncertain-match/match';
import HistorySearchPage from 'pages/history-search';
import MergePage from 'pages/merge/merge';
import NothingFoundPage from 'common/nothing-found';
import HomePage from 'pages/home';
import {Form} from 'antd';

const RoutesPage = () => {
    const [uncertainMatchesSearchForm] = Form.useForm();
    const [historySearchForm] = Form.useForm();

    return (
        <Routes>
            <Route path="/match" element={<UncertainMatchesSearchPage uncertainMatchesSearchForm={uncertainMatchesSearchForm} />} />
            <Route path="/match/:relationAccommodationId" element={<UncertainMatch />} />
            <Route path="/history" element={<HistorySearchPage historySearchForm={historySearchForm} />} />
            <Route path="/history/:mergeId" element={<MergePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NothingFoundPage />} />
        </Routes>
    );
};

export default RoutesPage;
