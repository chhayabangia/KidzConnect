import React, { useState } from 'react';
import { 
  Layout, 
  Card, 
  Statistic, 
  Row, 
  Col, 
  Typography, 
  Table, 
  Tag, 
  Button, 
  Avatar, 
  List, 
  Divider, 
  Calendar, 
  Badge,
  Dropdown,
  Menu,
  Progress,
  Alert,
  Space
} from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  MessageOutlined,
  BellOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  MoreOutlined,
  DollarOutlined,
  FileTextOutlined,
  StarOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;
const { Content } = Layout;

// Mock data for the provider dashboard
const mockData = {
  providerInfo: {
    name: "Sunshine Daycare Center",
    address: "123 Main St, Anytown, USA",
    phone: "(555) 123-4567",
    email: "info@sunshinedaycare.com",
    rating: 4.8,
    capacity: 45,
    currentEnrollment: 38,
    openingHours: "7:00 AM - 6:00 PM",
    programs: ["Infant Care", "Toddler Program", "Preschool", "After School"]
  },
  stats: {
    totalChildren: 38,
    pendingApplications: 5,
    waitlistCount: 3,
    occupancyRate: 84,
    revenueThisMonth: 28500,
    revenueLastMonth: 27200
  },
  recentEnrollments: [
    {
      id: 1,
      childName: "Emma Johnson",
      age: "3 years",
      program: "Preschool",
      startDate: "2023-09-01",
      status: "active"
    },
    {
      id: 2,
      childName: "Noah Williams",
      age: "2 years",
      program: "Toddler Program",
      startDate: "2023-08-15",
      status: "active"
    },
    {
      id: 3,
      childName: "Olivia Davis",
      age: "4 years",
      program: "Preschool",
      startDate: "2023-07-10",
      status: "active"
    }
  ],
  pendingApplications: [
    {
      id: 101,
      childName: "Liam Miller",
      age: "1 year",
      program: "Infant Care",
      applicationDate: "2023-08-25",
      parentName: "David Miller",
      parentContact: "(555) 456-7890"
    },
    {
      id: 102,
      childName: "Sophia Brown",
      age: "3 years",
      program: "Preschool",
      applicationDate: "2023-09-02",
      parentName: "Jennifer Brown",
      parentContact: "(555) 567-8901"
    }
  ],
  upcomingEvents: [
    {
      id: 201,
      title: "Parent-Teacher Conference",
      date: "2023-09-15",
      time: "3:00 PM - 7:00 PM",
      location: "Main Classroom"
    },
    {
      id: 202,
      title: "Fall Festival",
      date: "2023-10-05",
      time: "10:00 AM - 2:00 PM",
      location: "Playground"
    },
    {
      id: 203,
      title: "Staff Training Day",
      date: "2023-09-22",
      time: "9:00 AM - 4:00 PM",
      location: "Conference Room"
    }
  ],
  recentMessages: [
    {
      id: 301,
      from: "Sarah Johnson",
      subject: "Pickup Time Change",
      date: "2023-09-05",
      read: false
    },
    {
      id: 302,
      from: "Michael Williams",
      subject: "Dietary Restrictions",
      date: "2023-09-04",
      read: true
    },
    {
      id: 303,
      from: "Jennifer Davis",
      subject: "Absence Notification",
      date: "2023-09-03",
      read: true
    }
  ]
};

// Function to get calendar event list data
function getCalendarData(value) {
  const listData = [];
  const events = mockData.upcomingEvents;
  
  events.forEach(event => {
    if (value.format('YYYY-MM-DD') === event.date) {
      listData.push({
        type: 'success',
        content: event.title,
      });
    }
  });
  
  return listData;
}

// Calendar cell renderer
function dateCellRender(value) {
  const listData = getCalendarData(value);
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {listData.map((item, index) => (
        <li key={index}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
}

const ProviderDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  
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
  
  // Action menu for applications
  const applicationMenu = (
    <Menu>
      <Menu.Item key="1" icon={<CheckCircleOutlined />}>Approve</Menu.Item>
      <Menu.Item key="2" icon={<ClockCircleOutlined />}>Waitlist</Menu.Item>
      <Menu.Item key="3" icon={<MessageOutlined />}>Contact Parent</Menu.Item>
      <Menu.Item key="4" icon={<CloseCircleOutlined />} danger>Reject</Menu.Item>
    </Menu>
  );
  
  // Columns for pending applications table
  const applicationColumns = [
    {
      title: 'Child',
      dataIndex: 'childName',
      key: 'childName',
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <Text type="secondary">{record.age}</Text>
        </div>
      ),
    },
    {
      title: 'Program',
      dataIndex: 'program',
      key: 'program',
    },
    {
      title: 'Application Date',
      dataIndex: 'applicationDate',
      key: 'applicationDate',
    },
    {
      title: 'Parent',
      dataIndex: 'parentName',
      key: 'parentName',
      render: (text, record) => (
        <div>
          <div>{text}</div>
          <Text type="secondary">{record.parentContact}</Text>
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Dropdown overlay={applicationMenu} trigger={['click']}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];
  
  // Handle calendar select
  const onCalendarSelect = (value) => {
    setSelectedDate(value);
  };
  
  return (
    <Content style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>{mockData.providerInfo.name}</Title>
          <Space>
            <EnvironmentOutlined /> {mockData.providerInfo.address}
          </Space>
        </div>
        <Space>
          <Button icon={<FileTextOutlined />}>Edit Profile</Button>
          <Button type="primary" icon={<MessageOutlined />}>Messages</Button>
        </Space>
      </div>
      
      {/* Provider Info Card */}
      <Card style={{ marginBottom: '24px' }}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <Avatar size={64} icon={<UserOutlined />} style={{ backgroundColor: '#1677ff', marginRight: '16px' }} />
                <div>
                  <Title level={4} style={{ margin: 0 }}>{mockData.providerInfo.name}</Title>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <StarOutlined style={{ color: '#faad14', marginRight: '4px' }} />
                    <Text>{mockData.providerInfo.rating}/5.0</Text>
                  </div>
                </div>
              </div>
              <Divider style={{ margin: '12px 0' }} />
              <div>
                <p><PhoneOutlined style={{ marginRight: '8px' }} /> {mockData.providerInfo.phone}</p>
                <p><MailOutlined style={{ marginRight: '8px' }} /> {mockData.providerInfo.email}</p>
                <p><CalendarOutlined style={{ marginRight: '8px' }} /> {mockData.providerInfo.openingHours}</p>
              </div>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <Title level={5}>Programs Offered</Title>
            <div>
              {mockData.providerInfo.programs.map((program, index) => (
                <Tag key={index} color="blue" style={{ margin: '4px' }}>{program}</Tag>
              ))}
            </div>
            <Divider style={{ margin: '12px 0' }} />
            <div>
              <Title level={5}>Capacity</Title>
              <Progress 
                percent={mockData.stats.occupancyRate} 
                status="active" 
                format={() => `${mockData.stats.currentEnrollment}/${mockData.providerInfo.capacity}`}
              />
              <Text type="secondary">Current Occupancy Rate</Text>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <Alert
              message="Upcoming Event"
              description={
                mockData.upcomingEvents[0] ? (
                  <div>
                    <p><strong>{mockData.upcomingEvents[0].title}</strong></p>
                    <p>{mockData.upcomingEvents[0].date} at {mockData.upcomingEvents[0].time}</p>
                    <p>Location: {mockData.upcomingEvents[0].location}</p>
                  </div>
                ) : "No upcoming events"
              }
              type="info"
              showIcon
              style={{ marginBottom: '16px' }}
            />
            <Alert
              message="New Messages"
              description={`You have ${mockData.recentMessages.filter(m => !m.read).length} unread messages`}
              type="warning"
              showIcon
              action={
                <Button size="small" type="text">
                  View All
                </Button>
              }
            />
          </Col>
        </Row>
      </Card>
      
      {/* Stats Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Children"
              value={mockData.stats.totalChildren}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Pending Applications"
              value={mockData.stats.pendingApplications}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Waitlist"
              value={mockData.stats.waitlistCount}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Monthly Revenue"
              value={mockData.stats.revenueThisMonth}
              prefix={<DollarOutlined />}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
            />
            <div style={{ marginTop: '8px' }}>
              {mockData.stats.revenueThisMonth > mockData.stats.revenueLastMonth ? (
                <Tag color="green">↑ {((mockData.stats.revenueThisMonth - mockData.stats.revenueLastMonth) / mockData.stats.revenueLastMonth * 100).toFixed(1)}%</Tag>
              ) : (
                <Tag color="red">↓ {((mockData.stats.revenueLastMonth - mockData.stats.revenueThisMonth) / mockData.stats.revenueLastMonth * 100).toFixed(1)}%</Tag>
              )}
              <Text type="secondary">vs last month</Text>
            </div>
          </Card>
        </Col>
      </Row>
      
      {/* Main Content */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          {/* Pending Applications */}
          <Card 
            title={<Title level={4}>Pending Applications</Title>}
            extra={<Link to="/enrollments">View All</Link>}
            style={{ marginBottom: '24px' }}
          >
            <Table 
              dataSource={mockData.pendingApplications} 
              columns={applicationColumns} 
              rowKey="id"
              pagination={false}
            />
          </Card>
          
          {/* Recent Enrollments */}
          <Card 
            title={<Title level={4}>Recent Enrollments</Title>}
            extra={<Link to="/enrollments">View All</Link>}
          >
            <List
              itemLayout="horizontal"
              dataSource={mockData.recentEnrollments}
              renderItem={item => (
                <List.Item
                  actions={[
                    renderStatusTag(item.status),
                    <Button type="link">View Details</Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={item.childName}
                    description={
                      <Space direction="vertical">
                        <Text>{item.age} • {item.program}</Text>
                        <Text type="secondary">Start Date: {item.startDate}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          {/* Calendar */}
          <Card 
            title={<Title level={4}>Calendar</Title>}
            style={{ marginBottom: '24px' }}
          >
            <Calendar 
              fullscreen={false} 
              dateCellRender={dateCellRender}
              onSelect={onCalendarSelect}
            />
          </Card>
          
          {/* Recent Messages */}
          <Card title={<Title level={4}>Recent Messages</Title>} extra={<Link to="/messages">View All</Link>}>
            <List
              itemLayout="horizontal"
              dataSource={mockData.recentMessages}
              renderItem={item => (
                <List.Item
                  actions={[<Button type="link">Read</Button>]}
                >
                  <List.Item.Meta
                    avatar={
                      <Badge dot={!item.read}>
                        <Avatar icon={<UserOutlined />} />
                      </Badge>
                    }
                    title={item.subject}
                    description={
                      <Space direction="vertical">
                        <Text>From: {item.from}</Text>
                        <Text type="secondary">{item.date}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </Content>
  );
};

export default ProviderDashboard;
