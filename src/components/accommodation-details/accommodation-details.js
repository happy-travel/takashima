import React, { useState } from 'react';
import { API } from 'htcore';
import apiMethods from 'core/methods';
import {Button, Modal} from 'antd';
import { JSONTree } from 'react-json-tree';

const AccommodationDetails = ({ htId }) => {
    const [accommodation, setAccommodation] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const loadAccommodation = () => {
        if (loading) {
            return;
        }
        setAccommodation(null);
        setLoading(true);
        API.get({
            url: apiMethods.accommodationDetails(htId),
            success: (result) => {
                setAccommodation(result);
                setModalVisible(true);
            },
            after: () => {
                setLoading(false);
            }
        });
    };

    return (
        <>
            <Button onClick={loadAccommodation} size="small" type={modalVisible ? 'primary' : null} loading={loading}>
                {htId}
            </Button>
            <Modal
                title={htId}
                visible={modalVisible}
                footer={null}
                onCancel={()=> setModalVisible(false)}
                width={800}
            >
                <JSONTree
                    data={accommodation}
                    theme="monokai"
                    hideRoot
                    invertTheme={true}
                    getItemString={() => null}
                    shouldExpandNode={() => true}
                />
            </Modal>
        </>
    );
};

export default AccommodationDetails;
