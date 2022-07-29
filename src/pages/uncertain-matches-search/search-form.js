import React from 'react';
import { Button, Col, Form, Input, Row, Space } from 'antd';

const UncertainMatchesSearchForm = ({ form, onSubmit }) => (
    <Form
        form={form}
        onFinish={onSubmit}
        layout="vertical"
        style={{ marginBottom: 30 }}
    >
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col lg={12} xl={6}>
                <Form.Item name="countryCodes" label="Countries">
                    <Input placeholder="make required - countryCodes" allowClear />
                </Form.Item>
            </Col>
            <Col lg={12} xl={6}>
                <Form.Item name="supplierCodes" label="Suppliers">
                    <Input placeholder="supplierCodes" allowClear />
                </Form.Item>
            </Col>
            <Col lg={12} xl={6}>
                <Form.Item name="accommodationNameQuery" label="Accommodation Name Includes">
                    <Input placeholder="accommodationNameQuery" allowClear />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Space size="large">
                    <Button type="primary" htmlType="submit">
                        Search Uncertain Matches
                    </Button>
                    <Button htmlType="button" onClick={() => {
                        form.resetFields();
                        onSubmit({});
                    }}>
                        Clear Filters
                    </Button>
                </Space>
            </Col>
        </Row>
    </Form>
);

export default UncertainMatchesSearchForm;
