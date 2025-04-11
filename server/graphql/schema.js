const { gql } = require("apollo-server-express");

// Define GraphQL schema
const typeDefs = gql`
  type Daycare {
    id: ID!
    name: String!
    address: String!
    rating: Float
    price: String
    ageGroups: [String!]
    openingHours: String
    description: String
    features: [String!]
  }

  type Query {
    # Get all daycares
    daycares: [Daycare!]!

    # Get a single daycare by ID
    daycare(id: ID!): Daycare

    # Search for daycares with various filters
    searchDaycares(
      searchTerm: String
      ageGroup: String
      minPrice: Int
      maxPrice: Int
      distance: Int
    ): [Daycare!]!
  }
`;

module.exports = typeDefs;
