import React from 'react';
import { Card, Tabs, Form, Input, Button, Upload, Avatar, Space, Typography } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Profile = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const items = [
    {
      key: '1',
      label: 'Personal Information',
      children: (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            name: 'John Doe',
            email: 'john@example.com',
            phone: '(555) 123-4567',
          }}
        >
          <Space direction="vertical" style={{ width: '100%', marginBottom: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <Avatar size={100} icon={<UserOutlined />} />
              <Upload showUploadList={false}>
                <Button icon={<UploadOutlined />} style={{ marginTop: 16 }}>
                  Change Avatar
                </Button>
              </Upload>
            </div>
          </Space>

          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: '2',
      label: 'Preferences',
      children: (
        <Form layout="vertical">
          <Form.Item
            label="Notification Preferences"
            name="notifications"
          >
            {/* Add notification preferences here */}
          </Form.Item>
        </Form>
      ),
    },
    {
      key: '3',
      label: 'Security',
      children: (
        <Form layout="vertical">
          <Form.Item
            label="Current Password"
            name="currentPassword"
            rules={[{ required: true, message: 'Please input your current password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={[{ required: true, message: 'Please input your new password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary">Update Password</Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <Card>
      <Title level={2}>Profile Settings</Title>
      <Tabs defaultActiveKey="1" items={items} />
    </Card>
  );
};

export default Profile; 