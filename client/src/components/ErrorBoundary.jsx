import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    //  log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // render any custom fallback UI
      return (
        this.props.fallback || (
          <div
            style={{
              padding: "20px",
              textAlign: "center",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
            }}
          >
            <h3>Something went wrong</h3>
            <p>{this.state.error?.message || "An unexpected error occurred"}</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
