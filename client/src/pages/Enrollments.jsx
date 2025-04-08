import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Tag, 
  Space, 
  Button, 
  Typography, 
  Tabs, 
  Badge, 
  Avatar, 
  Dropdown, 
  Menu,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  message
} from 'antd';
import { 
  UserOutlined, 
  CalendarOutlined, 
  CheckCircleOutlined, 
  ClockCircleOutlined,
  CloseCircleOutlined,
  MoreOutlined,
  PlusOutlined,
  MailOutlined,
  PhoneOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

// Mock data for enrollments
const mockEnrollments = [
  {
    id: 1,
    childName: 'Emma Johnson',
    childAge: '3 years',
    parentName: 'Sarah Johnson',
    parentContact: {
      email: 'sarah.johnson@example.com',
      phone: '(555) 123-4567'
    },
    daycare: 'Sunshine Daycare Center',
    startDate: '2023-09-01',
    status: 'active',
    program: 'Full-time Preschool',
    notes: 'Allergic to peanuts'
  },
  {
    id: 2,
    childName: 'Noah Williams',
    childAge: '2 years',
    parentName: 'Michael Williams',
    parentContact: {
      email: 'michael.williams@example.com',
      phone: '(555) 234-5678'
    },
    daycare: 'Little Explorers Childcare',
    startDate: '2023-08-15',
    status: 'pending',
    program: 'Part-time Toddler',
    notes: 'Needs afternoon nap'
  },
  {
    id: 3,
    childName: 'Olivia Davis',
    childAge: '4 years',
    parentName: 'Jennifer Davis',
    parentContact: {
      email: 'jennifer.davis@example.com',
      phone: '(555) 345-6789'
    },
    daycare: 'Tiny Tots Family Daycare',
    startDate: '2023-07-10',
    status: 'active',
    program: 'Full-time Pre-K',
    notes: ''
  },
  {
    id: 4,
    childName: 'Liam Miller',
    childAge: '1 year',
    parentName: 'David Miller',
    parentContact: {
      email: 'david.miller@example.com',
      phone: '(555) 456-7890'
    },
    daycare: 'Sunshine Daycare Center',
    startDate: '2023-10-01',
    status: 'waitlisted',
    program: 'Infant Care',
    notes: 'On waitlist for infant room'
  }
];

const Enrollments = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [enrollments, setEnrollments] = useState(mockEnrollments);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Status tag renderer
  const renderStatusTag = (status) => {
    switch (status) {
      case 'active':
        return <Tag icon={<CheckCircleOutlined />} color="success">Active</Tag>;
      case 'pending':
        return <Tag icon={<ClockCircleOutlined />} color="warning">Pending</Tag>;
      case 'waitlisted':
        return <Tag icon={<ClockCircleOutlined />} color="orange">Waitlisted</Tag>;
      case 'cancelled':
        return <Tag icon={<CloseCircleOutlined />} color="error">Cancelled</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  // Action menu for each enrollment
  const actionMenu = (record) => (
    <Menu>
      <Menu.Item key="1" icon={<MailOutlined />} onClick={() => message.info(`Email sent to ${record.parentName}`)}>
        Contact Parent
      </Menu.Item>
      <Menu.Item key="2" onClick={() => handleEditEnrollment(record)}>
        Edit Enrollment
      </Menu.Item>
      <Menu.Item key="3" danger onClick={() => handleCancelEnrollment(record.id)}>
        Cancel Enrollment
      </Menu.Item>
    </Menu>
  );

  // Table columns
  const columns = [
    {
      title: 'Child',
      dataIndex: 'childName',
      key: 'childName',
      render: (text, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div>{text}</div>
            <Text type="secondary">{record.childAge}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Parent',
      dataIndex: 'parentName',
      key: 'parentName',
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <Space size="small">
            <MailOutlined style={{ fontSize: '12px' }} />
            <Text type="secondary" style={{ fontSize: '12px' }}>{record.parentContact.email}</Text>
          </Space>
        </div>
      ),
    },
    {
      title: 'Daycare',
      dataIndex: 'daycare',
      key: 'daycare',
    },
    {
      title: 'Program',
      dataIndex: 'program',
      key: 'program',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text) => (
        <Space>
          <CalendarOutlined />
          {text}
        </Space>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => renderStatusTag(status),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Dropdown overlay={() => actionMenu(record)} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  // Filter enrollments based on active tab
  const getFilteredEnrollments = () => {
    switch (activeTab) {
      case '1': // All
        return enrollments;
      case '2': // Active
        return enrollments.filter(e => e.status === 'active');
      case '3': // Pending
        return enrollments.filter(e => e.status === 'pending');
      case '4': // Waitlisted
        return enrollments.filter(e => e.status === 'waitlisted');
      default:
        return enrollments;
    }
  };

  // Handle tab change
  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  // Show modal for new enrollment
  const showNewEnrollmentModal = () => {
    form.resetFields();
    setIsModalVisible(true);
  };

  // Handle edit enrollment
  const handleEditEnrollment = (record) => {
    form.setFieldsValue({
      childName: record.childName,
      childAge: record.childAge,
      parentName: record.parentName,
      parentEmail: record.parentContact.email,
      parentPhone: record.parentContact.phone,
      daycare: record.daycare,
      program: record.program,
      startDate: record.startDate,
      notes: record.notes
    });
    setIsModalVisible(true);
  };

  // Handle cancel enrollment
  const handleCancelEnrollment = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to cancel this enrollment?',
      content: 'This action cannot be undone.',
      okText: 'Yes, Cancel',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        const updatedEnrollments = enrollments.map(e => 
          e.id === id ? { ...e, status: 'cancelled' } : e
        );
        setEnrollments(updatedEnrollments);
        message.success('Enrollment cancelled successfully');
      }
    });
  };

  // Handle modal OK
  const handleModalOk = () => {
    form.validateFields().then(values => {
      // In a real app, this would send data to the server
      message.success('Enrollment information saved');
      setIsModalVisible(false);
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  // Handle modal cancel
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <Title level={2}>Enrollments</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={showNewEnrollmentModal}
        >
          New Enrollment
        </Button>
      </div>

      <Card>
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane 
            tab={<span>All Enrollments</span>} 
            key="1"
          />
          <TabPane 
            tab={
              <span>
                <Badge status="success" />
                Active
              </span>
            } 
            key="2"
          />
          <TabPane 
            tab={
              <span>
                <Badge status="warning" />
                Pending
              </span>
            } 
            key="3"
          />
          <TabPane 
            tab={
              <span>
                <Badge status="processing" />
                Waitlisted
              </span>
            } 
            key="4"
          />
        </Tabs>
        
        <Table 
          columns={columns} 
          dataSource={getFilteredEnrollments()} 
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Enrollment Form Modal */}
      <Modal
        title="Enrollment Information"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={700}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Title level={4}>Child Information</Title>
          <Form.Item
            name="childName"
            label="Child's Name"
            rules={[{ required: true, message: 'Please enter child\'s name' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="childAge"
            label="Child's Age"
            rules={[{ required: true, message: 'Please enter child\'s age' }]}
          >
            <Input />
          </Form.Item>

          <Title level={4} style={{ marginTop: '24px' }}>Parent Information</Title>
          <Form.Item
            name="parentName"
            label="Parent's Name"
            rules={[{ required: true, message: 'Please enter parent\'s name' }]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="parentEmail"
            label="Email"
            rules={[
              { required: true, message: 'Please enter email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input prefix={<MailOutlined />} />
          </Form.Item>
          
          <Form.Item
            name="parentPhone"
            label="Phone"
            rules={[{ required: true, message: 'Please enter phone number' }]}
          >
            <Input prefix={<PhoneOutlined />} />
          </Form.Item>

          <Title level={4} style={{ marginTop: '24px' }}>Enrollment Details</Title>
          <Form.Item
            name="daycare"
            label="Daycare"
            rules={[{ required: true, message: 'Please select a daycare' }]}
          >
            <Select>
              <Option value="Sunshine Daycare Center">Sunshine Daycare Center</Option>
              <Option value="Little Explorers Childcare">Little Explorers Childcare</Option>
              <Option value="Tiny Tots Family Daycare">Tiny Tots Family Daycare</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="program"
            label="Program"
            rules={[{ required: true, message: 'Please select a program' }]}
          >
            <Select>
              <Option value="Infant Care">Infant Care (0-1 years)</Option>
              <Option value="Part-time Toddler">Part-time Toddler (1-3 years)</Option>
              <Option value="Full-time Toddler">Full-time Toddler (1-3 years)</Option>
              <Option value="Part-time Preschool">Part-time Preschool (3-5 years)</Option>
              <Option value="Full-time Preschool">Full-time Preschool (3-5 years)</Option>
              <Option value="Full-time Pre-K">Full-time Pre-K (4-5 years)</Option>
            </Select>
          </Form.Item>
          
          <Form.Item
            name="startDate"
            label="Start Date"
            rules={[{ required: true, message: 'Please select a start date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="notes"
            label="Additional Notes"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Enrollments;
