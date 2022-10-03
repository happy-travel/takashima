import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTitle } from 'htcore';
import apiMethods from 'core/methods';
import { PageHeader } from 'antd';
import { serializeRequest } from './serializer';
import SearchForm from './search-form';
import TablePages from 'components/table-pages';
import { columns } from './columns';
import usePages from 'components/use-pages';

const HistorySearch = ({ historySearchForm }) => {
    useTitle('Merge History');

    const [formValues, setFormValues] = useState(null);
    const [page, setPage] = usePages();
    const navigate = useNavigate();

    useEffect(() => {
        if (page) {
            historySearchForm.validateFields().then(setFormValues);
        }
    }, []);

    const selectRow = ({ mergeId }) => {
        navigate(`/history/${mergeId}`, {
            state: {
                page,
            },
        });
    };

    const onSubmit = (values) => {
        setPage(1);
        setFormValues(values);
    };

    return (
        <>
            <PageHeader title="Merge History" />
            <SearchForm form={historySearchForm} onSubmit={onSubmit} />
            <TablePages
                columns={columns}
                formValues={formValues}
                route={apiMethods.mergeHistorySearch()}
                serializeRequest={serializeRequest}
                page={page}
                setPage={setPage}
                selectRow={selectRow}
            />
        </>
    );
};

export default HistorySearch;
