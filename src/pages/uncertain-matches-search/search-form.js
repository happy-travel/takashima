import React from 'react';
import { Button, Form, Input, Space } from 'antd';
import SupplierSelector from 'components/selectors/supplier-selector';
import CountrySelector from 'components/selectors/country-selector';

const UncertainMatchesSearchForm = ({ form, onSubmit }) => (
    <Form form={form} onFinish={onSubmit} layout="vertical" style={{ marginBottom: 30 }}>
        <Form.Item name="countryCodes" label="Countries">
            <CountrySelector placeholder="Select Countries" />
        </Form.Item>
        <Form.Item name="supplierCodes" label="Suppliers">
            <SupplierSelector placeholder="Select Suppliers" />
        </Form.Item>
        <Form.Item name="accommodationNameQuery" label="Accommodation Name Includes">
            <Input placeholder="Enter Accommodation Name (or Part)" allowClear />
        </Form.Item>
        <Space size="large">
            <Button type="primary" htmlType="submit">
                Search Uncertain Matches
            </Button>
            <Button htmlType="button" onClick={() => form.resetFields()}>
                Clear Filters
            </Button>
        </Space>
    </Form>
);

export default UncertainMatchesSearchForm;
