const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const bodyParser = require("body-parser");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");

// Create Express app
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true,
  })
);

// Only use one JSON parser to avoid conflicts
app.use(express.json());
app.use(express.static("../client/dist"));

// Basic route
app.get("/", (req, res) => {
  res.send("KidzConnect API");
});

// Routes
const userRoutes = require("./routes/users");
app.use("/users", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Express error:", err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});

// Create Apollo Server
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
    context: ({ req }) => {
      // Add any context data here if needed
      return {};
    },
    formatError: (err) => {
      console.error("GraphQL Error:", err);
      return {
        message: err.message,
        path: err.path,
        extensions: err.extensions,
      };
    },
    debug: true,
  });

  await server.start();

  // Apply middleware
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: false, // We've already set up CORS for the entire app
    bodyParserConfig: {
      limit: "10mb",
    },
  });

  // Add a route to test the GraphQL server
  app.get("/test-graphql", (req, res) => {
    res.json({ message: "GraphQL server is running" });
  });

  // Start server
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(
      `🔍 GraphQL playground available at http://localhost:${port}${server.graphqlPath}`
    );
  });
}

// Start the server
startApolloServer().catch((err) => {
  console.error("Failed to start Apollo Server:", err);
});
