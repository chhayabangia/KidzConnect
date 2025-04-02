const theme = {
  token: {
    colorPrimary: "#87CEEB", // Sky blue
    colorSuccess: "#90EE90", // Light green
    colorWarning: "#FFD93D", // Sunny yellow
    colorError: "#FF6B6B", // Coral for errors
    colorInfo: "#87CEEB", // Sky blue
    borderRadius: 12,
    fontFamily:
      "'Comic Sans MS', 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    fontSize: 14,
  },
  components: {
    Button: {
      borderRadius: 20,
      controlHeight: 40,
    },
    Card: {
      borderRadius: 16,
      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.08)",
    },
    Input: {
      borderRadius: 12,
    },
    Select: {
      borderRadius: 12,
    },
    Table: {
      borderRadius: 12,
    },
  },
};

export default theme;
