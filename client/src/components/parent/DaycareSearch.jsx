import React from 'react';
import { Input, Card, Row, Col, Select, Button, Space, Rate, Tag } from 'antd';
import { SearchOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Search } = Input;
const { Option } = Select;

const DaycareSearch = () => {
  const daycares = [
    {
      id: 1,
      name: 'Sunny Daycare',
      rating: 4.5,
      reviews: 28,
      address: '123 Main St, City',
      hours: '7:00 AM - 6:00 PM',
      price: '$800/month',
      ageRange: ['infant', 'toddler'],
      availability: '3 spots left',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: 2,
      name: 'Rainbow Learning Center',
      rating: 4.8,
      reviews: 42,
      address: '456 Oak Ave, City',
      hours: '7:30 AM - 5:30 PM',
      price: '$900/month',
      ageRange: ['toddler', 'preschool'],
      availability: '1 spot left',
      image: 'https://via.placeholder.com/300x200',
    },
  ];

  return (
    <div>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Search
              placeholder="Search by location or daycare name"
              enterButton={<SearchOutlined />}
              size="large"
            />
            <Space>
              <Select defaultValue="all" style={{ width: 120 }}>
                <Option value="all">All Ages</Option>
                <Option value="infant">Infant</Option>
                <Option value="toddler">Toddler</Option>
                <Option value="preschool">Preschool</Option>
              </Select>
              <Select defaultValue="all" style={{ width: 120 }}>
                <Option value="all">All Prices</Option>
                <Option value="low">Under $500</Option>
                <Option value="medium">$500-$1000</Option>
                <Option value="high">Over $1000</Option>
              </Select>
            </Space>
          </Space>
        </Card>

        <Row gutter={[16, 16]}>
          {daycares.map((daycare) => (
            <Col xs={24} sm={12} md={8} key={daycare.id}>
              <Card
                hoverable
                cover={<img alt={daycare.name} src={daycare.image} />}
              >
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <h3>{daycare.name}</h3>
                  <Space>
                    <Rate disabled defaultValue={daycare.rating} />
                    <span>({daycare.reviews} reviews)</span>
                  </Space>
                  <Space>
                    <EnvironmentOutlined />
                    {daycare.address}
                  </Space>
                  <Space>
                    <ClockCircleOutlined />
                    {daycare.hours}
                  </Space>
                  <Space>
                    <Tag color="blue">{daycare.price}</Tag>
                    <Tag color="green">{daycare.availability}</Tag>
                  </Space>
                  <Button type="primary" block>
                    View Details
                  </Button>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
    </div>
  );
};

export default DaycareSearch; 