import React from 'react';
import { Table, Badge } from 'antd';

const MatchingTable = ({ accommodations, mergeResult, ControlRow, loading }) => {

    const mergeGroups = Object.keys(mergeResult);

    const rows = [
        ControlRow,
        {
            header: 'Id',
            render: (item) => item.id,
        },
        {
            header: 'HtId',
            render: (item) => item.htId,
        },
        {
            header: 'Locality',
            render: (item) => item.locality + ', ' + item.country,
        },
        {
            header: 'Address',
            render: (item) => item.address,
        },
        {
            header: 'Coordinates',
            render: (item) => <>
                {item.coordinates.latitude}<br />
                {item.coordinates.longitude}
            </>,
        },
        {
            header: 'Rating',
            render: (item) => item.rating,
        },
        {
            header: 'Supplier Codes',
            render: (item) => Object.keys(item.supplierCodes).map(
                (supplier) => <>{supplier + ': ' + item.supplierCodes[supplier]}<br /></>
            ),
        },
        /* todo {
            header: '',
            render: (item) => <>
                <a onClick={() => onShowDetails(item.htId)}>details</a>
            </>,
        }, */
    ];

    const columns = [
        {
            title: '',
            dataIndex: 'header',
            width: 150,
            key: 'header',
            fixed: 'left',
        },
        ...accommodations.map((item, index) => (
            {
                title: (
                    <Badge count={mergeResult[item.htId]?.length && mergeResult[item.htId].length + 1} offset={[10]}>
                        {item.name}
                    </Badge>
                ),
                dataIndex: item.id,
                width: 300,
                key: item.id,
                ...(mergeGroups.includes(item.htId) ? {
                    className: 'column-group',
                } : {}),
                ...(index ? {} : {
                    className: 'column-main',
                    fixed: 'left',
                }),
            }
        )),
    ];

    const data = rows.map((row) => ({
        key: row.header,
        header: row.header,
        ...(accommodations.reduce((val, item) => ({
            ...val,
            [item.id]: row.render(item),
        }), {})),
    }));

    return (
        <Table
            columns={columns}
            dataSource={data}
            scroll={{
                x: 0,
            }}
            pagination={false}
            loading={loading}
        />
    );
};

export default MatchingTable;
