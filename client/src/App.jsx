import React, { Suspense } from "react";
import { ConfigProvider, Spin } from "antd";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes.jsx";
import theme from "./theme/themeConfig";
import "./App.css";

// Router component to handle route rendering
const Router = () => {
  const element = useRoutes(routes);
  return element;
};

function App() {
  return (
    <ConfigProvider theme={theme}>
      <Suspense
        fallback={
          <div
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "var(--primary-color)",
            }}
          >
            <Spin size="large" />
          </div>
        }
      >
        <Router />
      </Suspense>
    </ConfigProvider>
  );
}

export default App;
