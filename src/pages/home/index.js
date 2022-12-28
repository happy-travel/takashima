import React from 'react';
import { Button, PageHeader, Space } from 'antd';
import { Link } from 'react-router-dom';

const HomePage = () => (
    <>
        <PageHeader title="Welcome!" />
        It's a mapping tool for the old mapper.
        <br />
        Currently we wait for new mapper to be implemented.
        <br />
        <br />
        You resolve Uncertain Matches in current mapping using this tool:
        <ol style={{ marginTop: 10 }}>
            <li>Search for Uncertain Matches</li>
            <li>Select the Uncertain Match to resolve</li>
            <li>If there is nothing to be resolved, you can deactivate a Uncertain Match</li>
            <li>
                If there are any duplicates in Uncertain Match, select the most complete description of
                accommodations as the Main
            </li>
            <li>You can merge more than one group in one Uncertain Match</li>
            <li>
                After you merge duplicates they will be shown as one accommodation in the Agent Application
            </li>
            <li>You can review merges in Merge History and fix merge errors if any</li>
        </ol>
        <Space>
            <Link to="/match">
                <Button type="primary">Find Uncertain Matches</Button>
            </Link>
            <Link to="/history">
                <Button>View Merge History</Button>
            </Link>
        </Space>
    </>
);

export default HomePage;
