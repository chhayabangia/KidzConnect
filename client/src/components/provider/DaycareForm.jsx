import React from 'react';
import { Form, Input, InputNumber, Select, Button, Card, Space, Upload, message } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const DaycareForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
    message.success('Daycare created successfully!');
  };

  return (
    <Card title="Create New Daycare">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Daycare Name"
          name="name"
          rules={[{ required: true, message: 'Please input daycare name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input description!' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Space>
          <Form.Item
            label="Age Range"
            name="ageRange"
            rules={[{ required: true, message: 'Please select age range!' }]}
          >
            <Select style={{ width: 200 }}>
              <Option value="infant">Infant (0-12 months)</Option>
              <Option value="toddler">Toddler (1-2 years)</Option>
              <Option value="preschool">Preschool (2-4 years)</Option>
              <Option value="prek">Pre-K (4-5 years)</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Capacity"
            name="capacity"
            rules={[{ required: true, message: 'Please input capacity!' }]}
          >
            <InputNumber min={1} max={100} />
          </Form.Item>
        </Space>

        <Form.Item
          label="Operating Hours"
          name="hours"
          rules={[{ required: true, message: 'Please input operating hours!' }]}
        >
          <Input placeholder="e.g., 7:00 AM - 6:00 PM" />
        </Form.Item>

        <Form.Item
          label="Photos"
          name="photos"
          rules={[{ required: true, message: 'Please upload at least one photo!' }]}
        >
          <Upload
            listType="picture-card"
            maxCount={5}
            beforeUpload={() => false}
            multiple
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Daycare
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default DaycareForm; 