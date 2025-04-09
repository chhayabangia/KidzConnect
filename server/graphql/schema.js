const { gql } = require("apollo-server-express");

// Define GraphQL schema
const typeDefs = gql`
  type Location {
    lat: Float!
    lng: Float!
  }

  type Feature {
    name: String!
    description: String
  }

  type AgeGroup {
    name: String!
    minAge: String
    maxAge: String
  }

  type Review {
    author: String!
    rating: Float!
    text: String
    date: String
  }

  type Photo {
    url: String!
    alt: String
  }

  type Daycare {
    id: ID!
    name: String!
    address: String!
    phone: String
    email: String
    website: String
    description: String
    rating: Float
    price: String
    capacity: Int
    currentEnrollment: Int
    openingHours: String
    location: Location
    distance: Float
    ageGroups: [String!]
    features: [String!]
    reviews: [Review]
    photos: [Photo]
  }

  input LocationInput {
    lat: Float
    lng: Float
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
    ): [Daycare!]!
  }
`;

module.exports = typeDefs;
