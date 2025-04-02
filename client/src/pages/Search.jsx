import React, { useState } from "react";
import {
  Input,
  Button,
  Card,
  Row,
  Col,
  Typography,
  Select,
  Slider,
  Space,
  Divider,
  List,
  Tag,
  Rate,
} from "antd";
import {
  SearchOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  SafetyOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// Mock data for daycare providers
const mockDaycares = [
  {
    id: 1,
    name: "Sunshine Daycare Center",
    address: "123 Main St, Anytown, USA",
    rating: 4.8,
    price: "$$",
    ageGroups: ["Infant", "Toddler", "Preschool"],
    openingHours: "7:00 AM - 6:00 PM",
    description:
      "A bright and cheerful environment where children can learn and grow through play and structured activities.",
    features: ["Outdoor Playground", "Meals Provided", "Educational Programs"],
  },
  {
    id: 2,
    name: "Little Explorers Childcare",
    address: "456 Oak Ave, Anytown, USA",
    rating: 4.5,
    price: "$$$",
    ageGroups: ["Toddler", "Preschool", "School-Age"],
    openingHours: "6:30 AM - 6:30 PM",
    description:
      "Focused on developing curious minds through exploration and discovery-based learning.",
    features: ["Swimming Pool", "Music Classes", "STEM Activities"],
  },
  {
    id: 3,
    name: "Tiny Tots Family Daycare",
    address: "789 Elm St, Anytown, USA",
    rating: 4.7,
    price: "$",
    ageGroups: ["Infant", "Toddler"],
    openingHours: "8:00 AM - 5:30 PM",
    description:
      "A home-based daycare offering personalized care in a warm, family environment.",
    features: ["Small Groups", "Home-Cooked Meals", "Flexible Hours"],
  },
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ageGroup, setAgeGroup] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 3]);
  const [distance, setDistance] = useState(10);
  const [searchResults, setSearchResults] = useState(mockDaycares);

  // Handle search
  const handleSearch = () => {
    // this needs to call an API with the search parameters
    // For now, im just filtering the mock data
    const filtered = mockDaycares.filter((daycare) => {
      const matchesSearchTerm =
        searchTerm === "" ||
        daycare.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        daycare.address.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesAgeGroup =
        ageGroup === "All" || daycare.ageGroups.includes(ageGroup);

      const matchesPrice =
        daycare.price.length >= priceRange[0] &&
        daycare.price.length <= priceRange[1];

      return matchesSearchTerm && matchesAgeGroup && matchesPrice;
    });

    setSearchResults(filtered);
  };

  // Price formatter for slider
  const priceFormatter = (value) => {
    if (value === 0) return "$";
    if (value === 1) return "$$";
    if (value === 2) return "$$$";
    return "$$$$";
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Find the Perfect Daycare</Title>
      <Paragraph>
        Search for daycares in your area and filter by your preferences
      </Paragraph>

      <Card style={{ marginBottom: "24px" }}>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Input
                size="large"
                placeholder="Search by name, location, or keywords"
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col xs={24} md={6}>
              <Select
                size="large"
                style={{ width: "100%" }}
                placeholder="Age Group"
                value={ageGroup}
                onChange={setAgeGroup}
              >
                <Option value="All">All Ages</Option>
                <Option value="Infant">Infant (0-1)</Option>
                <Option value="Toddler">Toddler (1-3)</Option>
                <Option value="Preschool">Preschool (3-5)</Option>
                <Option value="School-Age">School-Age (5+)</Option>
              </Select>
            </Col>
            <Col xs={24} md={6}>
              <Button
                type="primary"
                size="large"
                icon={<SearchOutlined />}
                onClick={handleSearch}
                style={{ width: "100%" }}
              >
                Search
              </Button>
            </Col>
          </Row>

          <Divider style={{ margin: "16px 0" }} />

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Text strong>Price Range:</Text>
              <Slider
                range
                min={0}
                max={3}
                defaultValue={priceRange}
                tipFormatter={priceFormatter}
                onChange={setPriceRange}
                marks={{
                  0: "$",
                  1: "$$",
                  2: "$$$",
                  3: "$$$$",
                }}
              />
            </Col>
            <Col xs={24} md={12}>
              <Text strong>Distance:</Text>
              <Slider
                min={1}
                max={50}
                defaultValue={distance}
                onChange={setDistance}
                tipFormatter={(value) => `${value} miles`}
                marks={{
                  1: "1mi",
                  10: "10mi",
                  25: "25mi",
                  50: "50mi",
                }}
              />
            </Col>
          </Row>
        </Space>
      </Card>

      <Title level={3} style={{ marginTop: "32px" }}>
        {searchResults.length} Daycares Found
      </Title>

      <List
        itemLayout="vertical"
        size="large"
        dataSource={searchResults}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <Space>
                <ClockCircleOutlined /> {item.openingHours}
              </Space>,
              <Space>
                <DollarOutlined /> {item.price}
              </Space>,
              <Space>
                <TeamOutlined /> {item.ageGroups.join(", ")}
              </Space>,
            ]}
            extra={
              <div style={{ textAlign: "center" }}>
                <Rate disabled defaultValue={item.rating} />
                <div>{item.rating} / 5</div>
                <Button type="primary" style={{ marginTop: "16px" }}>
                  View Details
                </Button>
              </div>
            }
          >
            <List.Item.Meta
              title={<Title level={4}>{item.name}</Title>}
              description={
                <Space>
                  <EnvironmentOutlined /> {item.address}
                </Space>
              }
            />
            <Paragraph>{item.description}</Paragraph>
            <div>
              {item.features.map((feature) => (
                <Tag color="blue" key={feature} style={{ margin: "4px" }}>
                  <SafetyOutlined /> {feature}
                </Tag>
              ))}
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Search;
