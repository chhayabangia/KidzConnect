// Mock data for daycare providers
const mockDaycares = [
  {
    id: "1",
    name: "Sunshine Daycare Center",
    address: "123 Main St, Anytown, USA",
    rating: 4.8,
    price: "$$",
    ageGroups: ["Infant", "Toddler", "Preschool"],
    openingHours: "7:00 AM - 6:00 PM",
    description:
      "A bright and cheerful environment where children can learn and grow through play and structured activities.",
    features: ["Outdoor Playground", "Meals Provided", "Educational Programs"],
  },
  {
    id: "2",
    name: "Little Explorers Childcare",
    address: "456 Oak Ave, Anytown, USA",
    rating: 4.5,
    price: "$$$",
    ageGroups: ["Toddler", "Preschool", "School-Age"],
    openingHours: "6:30 AM - 6:30 PM",
    description:
      "Focused on developing curious minds through exploration and discovery-based learning.",
    features: ["Swimming Pool", "Music Classes", "STEM Activities"],
  },
  {
    id: "3",
    name: "Tiny Tots Family Daycare",
    address: "789 Elm St, Anytown, USA",
    rating: 4.7,
    price: "$",
    ageGroups: ["Infant", "Toddler"],
    openingHours: "8:00 AM - 5:30 PM",
    description:
      "A home-based daycare offering personalized care in a warm, family environment.",
    features: ["Small Groups", "Home-Cooked Meals", "Flexible Hours"],
  },
  {
    id: "4",
    name: "Bright Beginnings Preschool",
    address: "101 Pine St, Anytown, USA",
    rating: 4.9,
    price: "$$$",
    ageGroups: ["Preschool", "School-Age"],
    openingHours: "7:30 AM - 6:00 PM",
    description:
      "Preparing children for kindergarten with a focus on early literacy and math skills.",
    features: ["Computer Lab", "Language Classes", "Field Trips"],
  },
  {
    id: "5",
    name: "Happy Hearts Daycare",
    address: "222 Maple Dr, Anytown, USA",
    rating: 4.6,
    price: "$$",
    ageGroups: ["Infant", "Toddler", "Preschool"],
    openingHours: "6:00 AM - 7:00 PM",
    description:
      "A loving environment where children's emotional and social development is prioritized.",
    features: ["Art Studio", "Garden", "Pet Corner"],
  },
];

// Helper function to convert price string to number for filtering
const priceToNumber = (price) => {
  return price.length; // $ = 1, $$ = 2, $$$ = 3, $$$$ = 4
};

// Resolvers
const resolvers = {
  Query: {
    daycares: () => {
      console.log("Resolving daycares query");
      return mockDaycares;
    },
    daycare: (_, { id }) => {
      console.log(`Resolving daycare query for id: ${id}`);
      return mockDaycares.find((daycare) => daycare.id === id);
    },
    searchDaycares: (
      _,
      { searchTerm, ageGroup, minPrice, maxPrice, distance }
    ) => {
      console.log("Resolving searchDaycares query with params:", {
        searchTerm,
        ageGroup,
        minPrice,
        maxPrice,
        distance,
      });
      let filteredDaycares = [...mockDaycares];

      // Filter by search term (name or address)
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredDaycares = filteredDaycares.filter(
          (daycare) =>
            daycare.name.toLowerCase().includes(term) ||
            daycare.address.toLowerCase().includes(term) ||
            (daycare.description &&
              daycare.description.toLowerCase().includes(term))
        );
      }

      // Filter by age group
      if (ageGroup && ageGroup !== "All") {
        filteredDaycares = filteredDaycares.filter(
          (daycare) => daycare.ageGroups && daycare.ageGroups.includes(ageGroup)
        );
      }

      // Filter by price range
      if (minPrice !== undefined || maxPrice !== undefined) {
        filteredDaycares = filteredDaycares.filter((daycare) => {
          if (!daycare.price) return true;
          const priceValue = priceToNumber(daycare.price);

          if (minPrice !== undefined && maxPrice !== undefined) {
            return priceValue >= minPrice && priceValue <= maxPrice;
          } else if (minPrice !== undefined) {
            return priceValue >= minPrice;
          } else if (maxPrice !== undefined) {
            return priceValue <= maxPrice;
          }

          return true;
        });
      }

      // In a real app, we would filter by distance using geolocation
      // For now, we'll just return the filtered results
      console.log(
        `Found ${filteredDaycares.length} daycares matching criteria`
      );
      return filteredDaycares;
    },
  },
};

module.exports = resolvers;
