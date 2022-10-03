import React from 'react';
import { Button, Form, Input, Space, DatePicker } from 'antd';
import SupplierSelector from 'components/selectors/supplier-selector';
import CountrySelector from 'components/selectors/country-selector';
import moment from 'moment';

const { RangePicker } = DatePicker;

const HistorySearchForm = ({ form, onSubmit }) => (
    <Form
        form={form}
        onFinish={onSubmit}
        layout="vertical"
        style={{ marginBottom: 30 }}
        initialValues={{
            rangeDates: [moment().add(-1, 'w'), moment()]
        }}
    >
        <Form.Item
            name="rangeDates"
            label="Date of Merge"
            rules={[{ required: true, message: 'Please Select Dates' }]}
        >
            <RangePicker
                placeholder={['From', 'Till']}
                disabledDate={(date) => new Date() < date}
            />
        </Form.Item>
        <Form.Item
            name="countryCodes"
            label="Countries"
        >
            <CountrySelector placeholder="Select Countries" />
        </Form.Item>
        <Form.Item
            name="supplierCodes"
            label="Suppliers"
        >
            <SupplierSelector placeholder="Select Suppliers" />
        </Form.Item>
        <Form.Item name="accommodationNameQuery" label="Accommodation Name Includes">
            <Input placeholder="Enter Accommodation Name (or Part)" allowClear />
        </Form.Item>
        <Space size="large">
            <Button type="primary" htmlType="submit">
                Search in Merge History
            </Button>
            <Button htmlType="button" onClick={() => form.resetFields()}>
                Clear Filters
            </Button>
        </Space>
    </Form>
);

export default HistorySearchForm;
