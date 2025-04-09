const express = require("express");
const cors = require("cors");
const createApolloServer = require("./graphql");

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Simple test endpoint
app.get("/test", (req, res) => {
  res.json({ message: "Express server is working!" });
});

// Start server
const PORT = 5005;

const startServer = async () => {
  try {
    console.log("Starting Apollo Server...");
    // Apply Apollo GraphQL middleware
    await createApolloServer(app);

    console.log("Apollo Server started, now starting Express...");
    // Start Express server
    app.listen(PORT, () => {
      console.log(`Test server running on port ${PORT}`);
      console.log(
        `Visit http://localhost:${PORT}/graphql to access GraphQL playground`
      );
    });
  } catch (error) {
    console.error("Error starting server:", error);
    console.error(error.stack);
    process.exit(1);
  }
};

// Start the server
startServer();
