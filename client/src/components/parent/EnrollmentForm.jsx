import React from 'react';
import { Form, Input, Select, DatePicker, Button, Card, Space, Upload, message } from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const EnrollmentForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
    message.success('Enrollment request submitted successfully!');
  };

  return (
    <Card title="Submit Enrollment Request">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Child's Name"
          name="childName"
          rules={[{ required: true, message: 'Please input child\'s name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Child's Date of Birth"
          name="dob"
          rules={[{ required: true, message: 'Please select date of birth!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Age Group"
          name="ageGroup"
          rules={[{ required: true, message: 'Please select age group!' }]}
        >
          <Select>
            <Option value="infant">Infant (0-12 months)</Option>
            <Option value="toddler">Toddler (1-2 years)</Option>
            <Option value="preschool">Preschool (2-4 years)</Option>
            <Option value="prek">Pre-K (4-5 years)</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Desired Start Date"
          name="startDate"
          rules={[{ required: true, message: 'Please select start date!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          label="Schedule"
          name="schedule"
          rules={[{ required: true, message: 'Please select schedule!' }]}
        >
          <Select>
            <Option value="fullTime">Full Time (5 days/week)</Option>
            <Option value="partTime">Part Time (3 days/week)</Option>
            <Option value="flexible">Flexible Schedule</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Parent/Guardian Name"
          name="parentName"
          rules={[{ required: true, message: 'Please input parent/guardian name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contact Information"
          name="contact"
          rules={[{ required: true, message: 'Please input contact information!' }]}
        >
          <Input.TextArea rows={2} placeholder="Phone number and email" />
        </Form.Item>

        <Form.Item
          label="Additional Notes"
          name="notes"
        >
          <Input.TextArea rows={4} placeholder="Any special requirements or concerns" />
        </Form.Item>

        <Form.Item
          label="Documents"
          name="documents"
          rules={[{ required: true, message: 'Please upload required documents!' }]}
        >
          <Upload
            listType="picture-card"
            maxCount={3}
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
            Submit Request
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default EnrollmentForm; 