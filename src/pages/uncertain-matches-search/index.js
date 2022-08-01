import React, { useEffect, useState } from 'react';
import { useTitle } from 'htcore';
import { PageHeader } from 'antd';
import { serializeRequest } from './serializer';
import SearchForm from './search-form';
import UncertainMatchPage from '../uncertain-match/match';
import TablePages from 'components/table-pages';
import { columns } from './columns';
import usePages from 'components/use-pages';

const UncertainMatchesSearch = ({ uncertainMatchesSearchForm }) => {
    useTitle('Uncertain Matches');

    const [formValues, setFormValues] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const [page, setPage] = usePages();

    useEffect(() => {
        uncertainMatchesSearchForm.validateFields().then(setFormValues);
    }, []);

    const onSubmit = (values) => {
        setPage(1);
        setFormValues(values);
    };

    if (selectedRow) {
        return <UncertainMatchPage match={selectedRow} onBack={() => setSelectedRow(null)} />;
    }

    return (
        <>
            <PageHeader title="Uncertain Matches" />
            <SearchForm form={uncertainMatchesSearchForm} onSubmit={onSubmit} />
            <TablePages
                columns={columns}
                formValues={formValues}
                route={'/accommodations/uncertain-matches/search'}
                serializeRequest={serializeRequest}
                page={page}
                setPage={setPage}
                selectRow={setSelectedRow}
            />
        </>
    );
};

export default UncertainMatchesSearch;
