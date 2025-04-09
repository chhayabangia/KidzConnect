const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

// Create Apollo Server
const createApolloServer = async (app) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // You can add authentication context here
      return { req };
    },
    formatError: (error) => {
      console.error("GraphQL Error:", error);
      return {
        message: error.message,
        path: error.path,
        ...(process.env.NODE_ENV === "development" && {
          stacktrace: error.extensions?.exception?.stacktrace,
        }),
      };
    },
  });

  await server.start();

  // Apply middleware to Express app
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  console.log(
    `GraphQL server ready at http://localhost:${process.env.PORT || 5002}${
      server.graphqlPath
    }`
  );

  return server;
};

module.exports = createApolloServer;
