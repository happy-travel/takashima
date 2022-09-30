import React from 'react';
import { Table, Badge } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { HOTEL_STARS } from 'htcore/enum';

const isEqualStrings = (a = '', b = '') => (
    String(a).toLowerCase() === String(b).toLowerCase() ? 'equal' : ''
);

const isEqualCoordinates = (a = {}, b = {}) => (
   ((Math.abs(a.latitude - b.latitude) < 0.0001) &&
    (Math.abs(a.longitude - b.longitude) < 0.0001)) ? 'equal' : ''
);

const MatchingTable = ({ accommodations, mergeResult, ControlRow, loading, isMainSelected }) => {

    const mergeGroups = Object.keys(mergeResult);

    const main = isMainSelected ? accommodations[0] : {};

    const rows = [
        ControlRow,
        {
            header: 'HtId',
            render: (item) => item.htId,
        },
        {
            header: 'Locality',
            render: (item) => <>
                <span className={isEqualStrings(main.locality, item.locality)}>{item.locality},</span>{' '}
                <span className={isEqualStrings(main.country, item.country)}>{item.country}</span>
            </>,
        },
        {
            header: 'Address',
            render: (item) => <span className={isEqualStrings(main.address, item.address)}>{item.address}</span>,
        },
        {
            header: 'Coordinates',
            render: (item) => <div className={isEqualCoordinates(main.coordinates, item.coordinates)}>
                {item.coordinates.latitude}<br />
                {item.coordinates.longitude}
            </div>,
        },
        {
            header: 'Rating',
            render: (item) => <div className={isEqualStrings(main.rating, item.rating)}>
                {new Array(HOTEL_STARS.indexOf(item.rating)).length}
                {' '}<StarOutlined />
            </div>,
        },
        {
            header: 'GIATA',
            render: (item) => <span className={isEqualStrings(main.giataId, item.giataId)}>
                {item.giataId}
            </span>,
        },
        {
            header: 'Supplier Codes',
            render: (item) => Object.keys(item.supplierCodes).map(
                (supplier) => <>
                    <b>{supplier + ': '}</b> {item.supplierCodes[supplier]}<br />
                </>
            ),
        },
        {
            header: 'Contacts',
            render: (item) => <div style={{ fontSize: '12px', maxWidth: 200 }}>
                { Boolean(item.contacts.emails.length) &&
                    <><b>Emails:</b> {item.contacts.emails.join(', ')}<br/></>
                }
                { Boolean(item.contacts.phones.length) &&
                    <><b>Phones:</b> {item.contacts.phones.join(', ')}<br/></>
                }
                { Boolean(item.contacts.webSites.length) &&
                    <><b>Websites:</b> {item.contacts.webSites.join(', ')}<br/></>
                }
                { Boolean(item.contacts.faxes.length) &&
                    <><b>Faxes:</b> {item.contacts.faxes.join(', ')}<br/></>
                }
            </div>
        },
    ];

    const columns = [
        {
            title: '',
            dataIndex: 'header',
            width: 150,
            key: 'header',
            fixed: 'left',
            className: 'column-header',
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
                ...((index || !isMainSelected) ? {} : {
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
