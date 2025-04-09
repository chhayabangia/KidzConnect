import React from "react";
import { Card, Row, Col, Button, Typography, Space, Grid } from "antd";
import { SearchOutlined, FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { useBreakpoint } = Grid;
const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();
  const screens = useBreakpoint();

  // Determine if on a mobile device
  const isMobile = !screens.md;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="home-container"
      style={{
        padding: isMobile ? "20px 16px" : "40px 20px",
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
        overflowX: "hidden", // Prevent horizontal scrolling
      }}
    >
      <Space
        direction="vertical"
        size={isMobile ? 24 : 48}
        style={{ width: "100%" }}
      >
        {/* Hero Section */}
        <div
          style={{
            textAlign: "center",
            marginBottom: isMobile ? 24 : 48,
            background: "#fff",
            padding: isMobile ? "24px 16px" : "32px",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
          }}
        >
          <Title
            level={1}
            style={{
              marginBottom: 16,
              color: "#333",
              fontSize: isMobile ? "28px" : "clamp(28px, 5vw, 48px)",
            }}
          >
            Welcome to KidzConnect
          </Title>
          <Paragraph
            style={{
              fontSize: isMobile ? "16px" : "clamp(16px, 3vw, 20px)",
              color: "#666",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            Connecting parents with quality daycare providers in your area
          </Paragraph>
        </div>

        {/* Main Actions */}
        <Row gutter={[24, 24]} justify="center">
          {/* Find Daycare Card */}
          <Col xs={24} sm={24} md={12} lg={10}>
            <Card
              hoverable
              className="action-card"
              style={{
                height: "100%",
                background: "#fff",
                borderRadius: "16px",
                transition: "transform 0.3s ease",
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              cover={
                <div
                  style={{
                    height: isMobile ? 140 : 180,
                    background:
                      "linear-gradient(135deg, #52c41a 0%, #237804 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SearchOutlined
                    style={{ fontSize: isMobile ? 48 : 64, color: "#fff" }}
                  />
                </div>
              }
            >
              <Title level={3} style={{ marginBottom: 16, color: "#333" }}>
                Find Daycare
              </Title>
              <Paragraph
                style={{
                  fontSize: "16px",
                  color: "#666",
                  marginBottom: 24,
                  minHeight: isMobile ? "auto" : "48px",
                }}
              >
                Search for available daycares in your area and view detailed
                information about their services.
              </Paragraph>
              <Button
                style={{
                  background: "linear-gradient(135deg, #52c41a, #237804)",
                  border: "none",
                }}
                type="primary"
                size="large"
                icon={<SearchOutlined />}
                onClick={() => navigate("/search")}
                block
              >
                Start Searching
              </Button>
            </Card>
          </Col>

          {/* Provider Card */}
          <Col xs={24} sm={24} md={12} lg={10}>
            <Card
              hoverable
              className="action-card"
              style={{
                height: "100%",
                background: "#fff",
                borderRadius: "16px",
                transition: "transform 0.3s ease",
              }}
              cover={
                <div
                  style={{
                    height: isMobile ? 140 : 180,
                    background:
                      "linear-gradient(135deg, #faad14 0%, #f5222d 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FormOutlined
                    style={{ fontSize: isMobile ? 48 : 64, color: "#fff" }}
                  />
                </div>
              }
            >
              <Title level={3} style={{ marginBottom: 16, color: "#333" }}>
                For Providers
              </Title>
              <Paragraph
                style={{
                  fontSize: "16px",
                  color: "#666",
                  marginBottom: 24,
                  minHeight: isMobile ? "auto" : "48px",
                }}
              >
                Register your daycare, manage enrollments, and connect with
                parents in your community.
              </Paragraph>
              <Button
                type="primary"
                size="large"
                icon={<FormOutlined />}
                onClick={() => navigate("/provider")}
                block
              >
                Provider Dashboard
              </Button>
            </Card>
          </Col>
        </Row>

        {/* Image Section */}
        <div
          style={{
            textAlign: "center",
            marginTop: isMobile ? 32 : 64,
            marginBottom: isMobile ? 32 : 64,
            padding: 0,
            maxWidth: "900px",
            margin: "0 auto",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src="/images/daycare-kids.jpg"
            alt="Happy children at daycare"
            loading="lazy"
            style={{
              width: "100%",
              height: "auto",
              maxHeight: "400px",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        {/* Features Section */}
        <div
          style={{
            textAlign: "center",
            marginTop: 0,
            padding: isMobile ? "24px 16px" : "32px 16px",
            background: "#fff",
            borderRadius: "16px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            maxWidth: "900px",
            margin: "0 auto",
          }}
        >
          <Title
            level={2}
            style={{
              marginBottom: isMobile ? 24 : 32,
              color: "#333",
              fontSize: isMobile ? "24px" : "28px",
              lineHeight: "1.3",
              maxWidth: "300px",
              margin: "0 auto 24px auto",
            }}
          >
            Why Choose KidzConnect?
          </Title>
          <Row
            gutter={[16, 16]}
            justify="center"
            style={{
              marginTop: "10px",
              maxWidth: "800px",
              margin: "10px auto 0",
            }}
          >
            {[
              {
                title: "Easy Search",
                description: "Find the perfect daycare with simple tools",
              },
              {
                title: "Verified Providers",
                description:
                  "All providers are verified for your peace of mind",
              },
              {
                title: "Quick Enrollment",
                description: "Simple and fast enrollment process",
              },
            ].map((feature, index) => (
              <Col xs={24} sm={24} md={8} lg={8} key={index}>
                <Card
                  style={{
                    height: "100%",
                    background: "#fff",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    padding: "16px",
                    minHeight: isMobile ? "120px" : "140px",
                    maxWidth: "500px",
                    margin: "0 auto",
                  }}
                >
                  <Title
                    level={4}
                    style={{
                      marginBottom: 8,
                      color: "#333",
                      fontSize: "20px",
                      lineHeight: "1.3",
                      textAlign: "center",
                    }}
                  >
                    {feature.title}
                  </Title>
                  <Paragraph
                    style={{
                      fontSize: "16px",
                      color: "#666",
                      margin: 0,
                      lineHeight: "1.5",
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                    }}
                  >
                    {feature.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* CTA Footer Section */}
        <div
          style={{
            textAlign: "center",
            padding: isMobile ? "24px 16px" : "48px",
            background: "#f0f2f5",
            borderRadius: "16px",
            marginTop: 48,
          }}
        >
          <Title level={3}>Ready to get started?</Title>
          <Paragraph>
            Join KidzConnect today and find the perfect match for your
            childcare needs.
          </Paragraph>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/register")}
            style={{ marginTop: 16 }}
          >
            Register Now
          </Button>
        </div>
      </Space>
    </div>
  );
};

export default Home;
