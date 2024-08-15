import { Form, Input, Modal } from 'antd';
import React from 'react';

interface ShowDetailProps {
  isModalVisible: boolean;
  handleCancel: () => void;
  data: {
    name: string;
    email: string;
    location: string;
    phone: string;
  };
}

const ShowDetail: React.FC<ShowDetailProps> = ({
  isModalVisible,
  handleCancel,
  data,
}) => {
  return (
    <div>
      <Modal
        title=""
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <Form
          layout="vertical"
          className="py-4"
          initialValues={{
            name: data?.name || '',
            email: data?.email || '',
            location: data?.location || '',
            phone: data?.phone || '',
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email address"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: 'Please enter your location' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: 'Please enter your phone number' },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ShowDetail;
