import React, { useState, useEffect } from "react";
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
  Spin,
  message,
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

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [ageGroup, setAgeGroup] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 3]);
  const [distance, setDistance] = useState(10);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch daycares on component mount
  useEffect(() => {
    fetchDaycares();
  }, []);

  // Fetch daycares from the GraphQL API
  const fetchDaycares = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Fetching daycares...");

      // Use mock data for now since we're having issues with the GraphQL server
      const mockData = [
        {
          id: "1",
          name: "Sunshine Daycare Center",
          address: "123 Main St, Anytown, USA",
          rating: 4.8,
          price: "$$",
          ageGroups: ["Infant", "Toddler", "Preschool"],
          openingHours: "7:00 AM - 6:00 PM",
          description:
            "A bright and cheerful environment where children can learn and grow through play and structured activities.",
          features: [
            "Outdoor Playground",
            "Meals Provided",
            "Educational Programs",
          ],
        },
        {
          id: "2",
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
          id: "3",
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
        {
          id: "4",
          name: "Bright Beginnings Preschool",
          address: "101 Pine St, Anytown, USA",
          rating: 4.9,
          price: "$$$",
          ageGroups: ["Preschool", "School-Age"],
          openingHours: "7:30 AM - 6:00 PM",
          description:
            "Preparing children for kindergarten with a focus on early literacy and math skills.",
          features: ["Computer Lab", "Language Classes", "Field Trips"],
        },
        {
          id: "5",
          name: "Happy Hearts Daycare",
          address: "222 Maple Dr, Anytown, USA",
          rating: 4.6,
          price: "$$",
          ageGroups: ["Infant", "Toddler", "Preschool"],
          openingHours: "6:00 AM - 7:00 PM",
          description:
            "A loving environment where children's emotional and social development is prioritized.",
          features: ["Art Studio", "Garden", "Pet Corner"],
        },
      ];

      setSearchResults(mockData);
      console.log("Using mock data for daycares");
    } catch (err) {
      console.error("Error fetching daycares:", err);
      setError("Failed to fetch daycares. Please try again later.");
      // Use mock data as fallback
      setSearchResults([
        {
          id: "1",
          name: "Sunshine Daycare Center",
          address: "123 Main St, Anytown, USA",
          rating: 4.8,
          price: "$$",
          ageGroups: ["Infant", "Toddler", "Preschool"],
          openingHours: "7:00 AM - 6:00 PM",
          description:
            "A bright and cheerful environment where children can learn and grow through play and structured activities.",
          features: [
            "Outdoor Playground",
            "Meals Provided",
            "Educational Programs",
          ],
        },
        {
          id: "2",
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
          id: "3",
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
      ]);
      message.error("Failed to fetch daycares. Using mock data instead.");
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("Searching daycares with criteria:", {
        searchTerm,
        ageGroup,
        priceRange,
        distance,
      });
      // Convert price range to min/max values
      const minPrice = priceRange[0];
      const maxPrice = priceRange[1];

      // Use mock data for now since we're having issues with the GraphQL server
      setSearchResults(
        [
          {
            id: "1",
            name: "Sunshine Daycare Center",
            address: "123 Main St, Anytown, USA",
            rating: 4.8,
            price: "$$",
            ageGroups: ["Infant", "Toddler", "Preschool"],
            openingHours: "7:00 AM - 6:00 PM",
            description:
              "A bright and cheerful environment where children can learn and grow through play and structured activities.",
            features: [
              "Outdoor Playground",
              "Meals Provided",
              "Educational Programs",
            ],
          },
          {
            id: "2",
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
            id: "3",
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
        ].filter((daycare) => {
          // Apply filters
          let matches = true;

          // Filter by search term
          if (searchTerm) {
            const term = searchTerm.toLowerCase();
            const nameMatch = daycare.name.toLowerCase().includes(term);
            const addressMatch = daycare.address.toLowerCase().includes(term);
            const descMatch = daycare.description.toLowerCase().includes(term);
            matches = matches && (nameMatch || addressMatch || descMatch);
          }

          // Filter by age group
          if (ageGroup && ageGroup !== "All") {
            matches = matches && daycare.ageGroups.includes(ageGroup);
          }

          // Filter by price
          if (minPrice > 0 || maxPrice < 3) {
            const priceValue = daycare.price.length;
            matches =
              matches && priceValue >= minPrice && priceValue <= maxPrice;
          }

          return matches;
        })
      );

      setLoading(false);
    } catch (err) {
      console.error("Error searching daycares:", err);
      setError("Failed to search daycares. Please try again later.");
      message.error("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
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

      {loading ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Spin size="large" />
          <p style={{ marginTop: "16px" }}>Loading daycares...</p>
        </div>
      ) : error ? (
        <div style={{ textAlign: "center", padding: "50px" }}>
          <Text type="danger">{error}</Text>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Search;
