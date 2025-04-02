import React from 'react';
import { Table, Card, Button, Space, Tag, Badge, Statistic } from 'antd';
import { EditOutlined, DeleteOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';

const DaycareManagement = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'active' ? 'success' : 'default'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
      render: (capacity, record) => (
        <Statistic
          value={record.enrolled}
          suffix={`/ ${capacity}`}
          valueStyle={{ fontSize: '14px' }}
        />
      ),
    },
    {
      title: 'Operating Hours',
      dataIndex: 'hours',
      key: 'hours',
      render: (hours) => (
        <Space>
          <ClockCircleOutlined />
          {hours}
        </Space>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />}>Edit</Button>
          <Button danger icon={<DeleteOutlined />}>Delete</Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'Sunny Daycare',
      status: 'active',
      capacity: 20,
      enrolled: 15,
      hours: '7:00 AM - 6:00 PM',
    },
    {
      key: '2',
      name: 'Rainbow Learning Center',
      status: 'active',
      capacity: 30,
      enrolled: 28,
      hours: '7:30 AM - 5:30 PM',
    },
  ];

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card>
          <Space size="large" style={{ width: '100%', justifyContent: 'space-between' }}>
            <Statistic
              title="Total Daycares"
              value={2}
              prefix={<UserOutlined />}
            />
            <Statistic
              title="Total Enrollments"
              value={43}
              prefix={<UserOutlined />}
            />
            <Statistic
              title="Available Spots"
              value={7}
              prefix={<UserOutlined />}
            />
          </Space>
        </Card>

        <Card
          title="Daycare Management"
          extra={<Button type="primary">Add New Daycare</Button>}
        >
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </Space>
    </div>
  );
};

export default DaycareManagement; 