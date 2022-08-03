import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTitle } from 'htcore';
import { PageHeader } from 'antd';
import { serializeRequest } from './serializer';
import SearchForm from './search-form';
import TablePages from 'components/table-pages';
import { columns } from './columns';
import usePages from 'components/use-pages';

const UncertainMatchesSearch = ({ uncertainMatchesSearchForm }) => {
    useTitle('Uncertain Matches');

    const [formValues, setFormValues] = useState(null);
    const [page, setPage] = usePages();
    const navigate = useNavigate();

    useEffect(() => {
        if (page) {
            uncertainMatchesSearchForm.validateFields().then(setFormValues);
        }
    }, []);

    const selectRow = ({ relationAccommodationId }) => {
        navigate(`/match/${relationAccommodationId}`, {
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
            <PageHeader title="Uncertain Matches" />
            <SearchForm form={uncertainMatchesSearchForm} onSubmit={onSubmit} />
            { Boolean(page) &&
                <TablePages
                    columns={columns}
                    formValues={formValues}
                    route={'/accommodations/uncertain-matches/search'}
                    serializeRequest={serializeRequest}
                    page={page}
                    setPage={setPage}
                    selectRow={selectRow}
                />
            }
        </>
    );
};

export default UncertainMatchesSearch;
