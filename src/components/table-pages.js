import React, { useEffect, useState } from 'react';
import { API } from 'htcore';
import Loader from 'core/loader';
import { Table } from 'antd';

const PAGE_SIZE = 10;

const TablePages = ({ columns, serializeRequest, formValues, route, rowKey = 'id', page, setPage, selectRow }) => {
    const [list, setList] = useState(null);
    const [total, setTotal] = useState(0);

    const loadPage = () => {
        setList(null);
        if (formValues) {
            API.post({
                url: route,
                body: serializeRequest(formValues, PAGE_SIZE, (page - 1) * PAGE_SIZE),
                success: (result) => {
                    setList(result.accommodationUncertainMatchRelationsData);
                    setTotal(result.totalNumberOfItems);
                },
            });
        }
    };

    useEffect(() => {
        loadPage();
    }, [formValues, page]);

    return (
        <Table
            dataSource={list}
            columns={
                list?.length
                    ? columns({ page }, selectRow).map((column) => ({
                          title: column.header,
                          ...(typeof column.cell === 'string'
                              ? { dataIndex: column.cell }
                              : { render: (text, record) => column.cell(record) }),
                          key: typeof column.cell === 'string' ? column.cell : column.title,
                      }))
                    : null
            }
            pagination={{
                current: page,
                total,
                showQuickJumper: false,
                showSizeChanger: false,
                pageSize: PAGE_SIZE,
                onChange: setPage,
                showTotal: (total, range) => (
                    <div style={{ marginRight: 20 }}>
                        {`${range[0]}-${range[1]}`} of <b>{total} items</b>
                    </div>
                ),
                position: ['topRight'],
            }}
            loading={list === null}
            rowKey={rowKey}
            locale={{
                emptyText: list === null ? <Loader /> : 'Nothing to Show',
            }}
            style={{ minHeight: 1000 }}
        />
    );
};

export default TablePages;
