import { Form, Input, Modal } from 'antd';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../Context/AppProvider';
import { AuthContext } from '../../Context/AuthProvider';
import { addDocument } from '../../firebase/services';

function AddRoomModal(props) {
  const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
  const {
    user: { uid },
  } = useContext(AuthContext);

  const [form] = Form.useForm();
  const handleOk = () => {
    addDocument('rooms', { ...form.getFieldValue(), members: [uid] });
    form.resetFields();
    setIsAddRoomVisible(false);
  };
  const handleCancel = () => {
    setIsAddRoomVisible(false);
  };
  return (
    <div>
      <Modal title="Create Room" open={isAddRoomVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form layout="vertical" form={form}>
          <Form.Item label="Room Name" name="name">
            <Input placeholder="Enter room name" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea placeholder="Enter Description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddRoomModal;
