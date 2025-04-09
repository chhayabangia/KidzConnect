// This service provides mock data for daycare search functionality

// Function to fetch nearby daycares
export const findNearbyDaycares = async (
  searchTerm = "",
  ageGroup = "All",
  minPrice = 0,
  maxPrice = 4
) => {
  console.log(
    `Searching for daycares with term: ${searchTerm}, ageGroup: ${ageGroup}, price range: ${minPrice}-${maxPrice}`
  );

  try {
    // Generate mock data
    const mockResults = generateMockDaycares(10);

    // Filter the results based on search criteria
    let filteredResults = [...mockResults];

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredResults = filteredResults.filter(
        (daycare) =>
          daycare.name.toLowerCase().includes(term) ||
          daycare.address.toLowerCase().includes(term) ||
          (daycare.description &&
            daycare.description.toLowerCase().includes(term))
      );
    }

    // Filter by age group
    if (ageGroup !== "All") {
      filteredResults = filteredResults.filter(
        (daycare) => daycare.ageGroups && daycare.ageGroups.includes(ageGroup)
      );
    }

    // Filter by price range
    filteredResults = filteredResults.filter((daycare) => {
      const priceValue = daycare.price ? daycare.price.length : 0;
      return priceValue >= minPrice && priceValue <= maxPrice;
    });

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return filteredResults;
  } catch (error) {
    console.error("Error fetching daycares:", error);
    return [];
  }
};

// Generate mock daycare data
function generateMockDaycares(count) {
  const daycares = [];
  const names = [
    "Sunshine Daycare Center",
    "Little Explorers Childcare",
    "Tiny Tots Family Daycare",
    "Happy Kids Learning Center",
    "Bright Beginnings Preschool",
    "Rainbow Children's Academy",
    "Growing Minds Daycare",
    "Little Learners Childcare",
    "Kiddie Corner Daycare",
    "Playful Pandas Childcare",
    "Stepping Stones Daycare",
    "First Steps Learning Center",
  ];

  const features = [
    "Outdoor Playground",
    "Meals Provided",
    "Educational Programs",
    "Swimming Pool",
    "Music Classes",
    "STEM Activities",
    "Small Groups",
    "Home-Cooked Meals",
    "Flexible Hours",
    "Security Cameras",
    "Bilingual Staff",
    "Field Trips",
  ];

  for (let i = 0; i < count; i++) {
    daycares.push({
      id: i + 1,
      name: names[i % names.length],
      address: `${Math.floor(Math.random() * 1000) + 100} ${
        ["Main St", "Oak Ave", "Elm St", "Maple Rd", "Park Blvd"][i % 5]
      }, Anytown, USA`,
      rating: (3.5 + Math.random() * 1.5).toFixed(1),
      price: "$".repeat(Math.floor(Math.random() * 3) + 1),
      ageGroups: ["Infant", "Toddler", "Preschool", "School-Age"].slice(
        0,
        Math.floor(Math.random() * 3) + 1
      ),
      openingHours: `${Math.floor(Math.random() * 3) + 6}:${
        ["00", "30"][Math.floor(Math.random() * 2)]
      } AM - ${Math.floor(Math.random() * 2) + 5}:${
        ["00", "30"][Math.floor(Math.random() * 2)]
      } PM`,
      description:
        "A nurturing environment where children can learn and grow through play and structured activities.",
      features: features
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 2),
      distance: (Math.random() * 5).toFixed(1),
    });
  }

  // Sort by distance
  return daycares.sort(
    (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
  );
}

// Default location (New York City)
const defaultLocation = { lat: 40.7128, lng: -74.006 };

// Get user's current location (simplified to always return default location)
export const getCurrentLocation = () => {
  return Promise.resolve(defaultLocation);
};
