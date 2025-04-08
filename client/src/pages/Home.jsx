import React from "react";
import { Card, Row, Col, Button, Typography, Space, Grid } from "antd";
import { SearchOutlined, FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const { useBreakpoint } = Grid;
const { Title, Paragraph } = Typography;

const Home = () => {
  const screens = useBreakpoint();
  const navigate = useNavigate();

  // Determine if we're on a mobile device
  const isMobile = !screens.md;

  return (
    <div style={{ padding: isMobile ? "16px" : "24px" }}>
      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          marginBottom: isMobile ? 32 : 48,
        }}
      >
        <Title
          level={1}
          style={{
            fontSize: isMobile ? "28px" : "36px",
            marginBottom: "16px",
          }}
        >
          Welcome to KidzConnect
        </Title>
        <Paragraph
          style={{
            fontSize: isMobile ? "16px" : "18px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          The platform that bridges the gap between parents and daycare
          providers, making childcare management simple and communication
          seamless.
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
              overflow: "hidden",
              cursor: "pointer"
            }}
            onClick={() => navigate("/search")}
            cover={
              <div
                style={{
                  height: isMobile ? 140 : 180,
                  background:
                    "linear-gradient(135deg, var(--primary-color) 0%, var(--success-color) 100%)",
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
              overflow: "hidden",
              cursor: "pointer"
            }}
            onClick={() => navigate("/provider")}
            cover={
              <div
                style={{
                  height: isMobile ? 140 : 180,
                  background:
                    "linear-gradient(135deg, var(--warning-color) 0%, var(--error-color) 100%)",
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
          src="https://images.unsplash.com/photo-1526634332515-d56c5fd16991?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80"
          alt="Happy children playing"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Features Section */}
      <div style={{ marginTop: isMobile ? 32 : 64 }}>
        <Title
          level={2}
          style={{
            textAlign: "center",
            marginBottom: isMobile ? 24 : 48,
          }}
        >
          Why Choose KidzConnect?
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={8}>
            <Card
              style={{
                height: "100%",
                borderRadius: "16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Title level={4}>Easy Search</Title>
              <Paragraph>
                Find the perfect daycare for your child with our comprehensive
                search tools and detailed provider profiles.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              style={{
                height: "100%",
                borderRadius: "16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Title level={4}>Seamless Communication</Title>
              <Paragraph>
                Stay connected with providers through our integrated messaging
                system for updates and important information.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              style={{
                height: "100%",
                borderRadius: "16px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Title level={4}>Enrollment Management</Title>
              <Paragraph>
                Manage applications, track enrollment status, and handle
                paperwork all in one place.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Home;
