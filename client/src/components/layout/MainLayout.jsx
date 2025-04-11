import React, { useState } from "react";
import { Layout, Menu, Drawer, Button, Grid } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  SearchOutlined,
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import "./MainLayout.css";

const { Header, Content, Sider } = Layout;
const { useBreakpoint } = Grid;

const MainLayout = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const screens = useBreakpoint();

  // Determine if on a mobile device
  const isMobile = !screens.md;

  // Public menu items (always visible)
  const publicMenuItems = [
    {
      key: "/",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "/search",
      icon: <SearchOutlined />,
      label: <Link to="/search">Find Daycare</Link>,
    },
    {
      key: "/enrollments",
      icon: <TeamOutlined />,
      label: <Link to="/enrollments">Enrollments</Link>,
    },
  ];

  // Private menu items (only visible when logged in)
  const privateMenuItems = [
    {
      key: "/provider",
      icon: <DashboardOutlined />,
      label: <Link to="/provider">Provider Dashboard</Link>,
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: <Link to="/profile">Profile</Link>,
    },
  ];

  // Combine menu items based on login status
  const menuItems = isLoggedIn
    ? [...publicMenuItems, ...privateMenuItems]
    : publicMenuItems;

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: "#87CEEB",
        paddingBottom: "24px",
      }}
    >
      <Header
        style={{
          padding: "0",
          background: "linear-gradient(180deg, #87CEEB 0%, #ffffff 100%)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: isMobile ? "70px" : "80px",
        }}
      >
        <div
          style={{
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            height: "100%",
            width: isMobile ? "80%" : "100%",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 0", // Add padding to prevent cutoff
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: "#1677FF",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "20px",
                marginRight: "12px",
                fontFamily: "'Comic Sans MS', sans-serif",
              }}
            >
              KC
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: isMobile ? "center" : "flex-start",
              }}
            >
              <h1
                style={{
                  margin: 0,
                  color: "#000000",
                  fontSize: isMobile ? "24px" : "32px",
                  fontFamily: "'Comic Sans MS', sans-serif",
                  fontWeight: "bold",
                  lineHeight: "1.2",
                }}
              >
                KidzConnect
              </h1>
              {!isMobile && (
                <span
                  style={{
                    fontSize: "12px",
                    color: "#666",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    marginTop: "-2px",
                    lineHeight: "1",
                  }}
                >
                  Bridging Parents and Daycare Providers
                </span>
              )}
            </div>
          </div>
        </div>

        <div
          style={{ display: "flex", alignItems: "center", marginRight: "24px" }}
        >
          {/* Login/Logout Button */}
          <Button
            className="login-button"
            type="default"
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            style={{
              fontWeight: "500",
              marginRight: isMobile ? "16px" : "0",
              borderRadius: "2px",
              padding: "4px 16px",
              height: "45px",
              fontSize: "16px",
            }}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </Button>

          {/* Mobile Menu Button */}
          {isMobile && (
            <Button
              type="text"
              icon={<MenuOutlined />}
              onClick={() => setMobileMenuOpen(true)}
              style={{ marginRight: "16px" }}
              size="large"
            />
          )}
        </div>
      </Header>
      <Layout style={{ overflow: "hidden" }}>
        {!isMobile && (
          <Sider
            width={200}
            style={{
              background: "#fff",
              boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
              marginTop: "24px", // Match the top padding of the main content
              marginBottom: "48px",
              borderRadius: "0 16px 16px 0", // Rounded top-right and bottom-right corners
              overflow: "hidden",
              height: "calc(100% - 72px)",
            }}
          >
            <Menu
              mode="inline"
              selectedKeys={[location.pathname]}
              style={{
                height: "calc(100% - 48px)",
                borderRight: 0,
                background: "#fff",
                paddingTop: "15px",
                paddingBottom: "15px",
              }}
              items={menuItems}
            />
          </Sider>
        )}
        <Layout
          style={{
            padding: isMobile ? "16px 16px 32px 16px" : "24px 24px 48px 24px",
            background: "linear-gradient(180deg, #87CEEB 0%, #90EE90 100%)",
            position: "relative",
            height: "calc(100% - 24px)", // Match height with main layout
            borderRadius: "0 0 16px 16px",
            marginBottom: "24px", // Space at the bottom
          }}
        >
          <Content
            style={{
              background: "#fff",
              padding: isMobile ? 16 : 24,
              margin: 0,
              minHeight: 280,
              borderRadius: 16,
              boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
              overflow: "auto", // Important for mobile
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>

      {/* Mobile Drawer Menu */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setMobileMenuOpen(false)}
        open={mobileMenuOpen}
        width={250}
      >
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={() => setMobileMenuOpen(false)}
        />
      </Drawer>
    </Layout>
  );
};

export default MainLayout;
