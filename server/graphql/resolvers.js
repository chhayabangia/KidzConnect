// Mock data for daycares
const mockDaycares = [
  {
    id: '1',
    name: 'Sunshine Daycare Center',
    address: '123 Main St, New York, NY 10001',
    phone: '(555) 123-4567',
    email: 'info@sunshinedaycare.com',
    website: 'https://www.sunshinedaycare.com',
    description: 'A nurturing environment where children can learn and grow through play and structured activities.',
    rating: 4.7,
    price: '$$$',
    capacity: 50,
    currentEnrollment: 42,
    openingHours: 'Mon-Fri: 7:00 AM - 6:00 PM',
    location: { lat: 40.7501, lng: -73.9964 },
    distance: 0.5,
    ageGroups: ['Infant', 'Toddler', 'Preschool'],
    features: ['Outdoor Playground', 'Meals Provided', 'Educational Programs'],
    reviews: [
      { author: 'Jane Smith', rating: 5.0, text: 'Wonderful staff and great facilities!', date: '2023-05-15' },
      { author: 'John Doe', rating: 4.5, text: 'My child loves going here every day.', date: '2023-04-22' }
    ],
    photos: [
      { url: 'https://example.com/daycare1.jpg', alt: 'Playground area' },
      { url: 'https://example.com/daycare2.jpg', alt: 'Classroom' }
    ]
  },
  {
    id: '2',
    name: 'Little Explorers Childcare',
    address: '456 Oak Ave, New York, NY 10002',
    phone: '(555) 234-5678',
    email: 'contact@littleexplorers.com',
    website: 'https://www.littleexplorers.com',
    description: 'Fostering curiosity and learning through exploration and creative play.',
    rating: 4.5,
    price: '$$',
    capacity: 35,
    currentEnrollment: 30,
    openingHours: 'Mon-Fri: 6:30 AM - 5:30 PM',
    location: { lat: 40.7605, lng: -73.9799 },
    distance: 1.2,
    ageGroups: ['Toddler', 'Preschool'],
    features: ['STEM Activities', 'Music Classes', 'Bilingual Staff'],
    reviews: [
      { author: 'Sarah Johnson', rating: 4.0, text: 'Great curriculum and caring teachers.', date: '2023-06-10' }
    ],
    photos: [
      { url: 'https://example.com/explorers1.jpg', alt: 'Science corner' }
    ]
  },
  {
    id: '3',
    name: 'Tiny Tots Family Daycare',
    address: '789 Elm St, New York, NY 10003',
    phone: '(555) 345-6789',
    email: 'info@tinytots.com',
    website: 'https://www.tinytots.com',
    description: 'A home-like environment with personalized care for each child.',
    rating: 4.8,
    price: '$$$$',
    capacity: 20,
    currentEnrollment: 18,
    openingHours: 'Mon-Fri: 8:00 AM - 5:00 PM',
    location: { lat: 40.7305, lng: -73.9859 },
    distance: 1.8,
    ageGroups: ['Infant', 'Toddler'],
    features: ['Small Groups', 'Home-Cooked Meals', 'Flexible Hours'],
    reviews: [
      { author: 'Michael Brown', rating: 5.0, text: 'The individual attention my baby receives is amazing!', date: '2023-03-05' },
      { author: 'Emily Wilson', rating: 4.5, text: 'Warm and caring environment.', date: '2023-02-18' }
    ],
    photos: [
      { url: 'https://example.com/tinytots1.jpg', alt: 'Play area' },
      { url: 'https://example.com/tinytots2.jpg', alt: 'Nap room' }
    ]
  },
  {
    id: '4',
    name: 'Happy Kids Learning Center',
    address: '101 Park Blvd, New York, NY 10004',
    phone: '(555) 456-7890',
    email: 'hello@happykids.com',
    website: 'https://www.happykids.com',
    description: 'Preparing children for academic success through play-based learning.',
    rating: 4.2,
    price: '$',
    capacity: 60,
    currentEnrollment: 45,
    openingHours: 'Mon-Fri: 7:30 AM - 6:30 PM',
    location: { lat: 40.7420, lng: -74.0080 },
    distance: 2.3,
    ageGroups: ['Toddler', 'Preschool', 'School-Age'],
    features: ['After-School Program', 'Summer Camp', 'Field Trips'],
    reviews: [
      { author: 'David Lee', rating: 4.0, text: 'Good value and convenient hours.', date: '2023-01-30' }
    ],
    photos: [
      { url: 'https://example.com/happykids1.jpg', alt: 'Art room' }
    ]
  },
  {
    id: '5',
    name: 'Bright Beginnings Preschool',
    address: '222 Maple Rd, New York, NY 10005',
    phone: '(555) 567-8901',
    email: 'admin@brightbeginnings.edu',
    website: 'https://www.brightbeginnings.edu',
    description: 'A structured preschool program focused on kindergarten readiness.',
    rating: 4.9,
    price: '$$$',
    capacity: 40,
    currentEnrollment: 38,
    openingHours: 'Mon-Fri: 8:30 AM - 3:30 PM',
    location: { lat: 40.7650, lng: -73.9700 },
    distance: 2.7,
    ageGroups: ['Preschool'],
    features: ['Kindergarten Prep', 'Reading Program', 'Computer Lab'],
    reviews: [
      { author: 'Lisa Chen', rating: 5.0, text: 'Excellent academic preparation for kindergarten!', date: '2023-06-22' },
      { author: 'Robert Taylor', rating: 4.8, text: 'My child learned so much here.', date: '2023-05-11' }
    ],
    photos: [
      { url: 'https://example.com/bright1.jpg', alt: 'Reading corner' },
      { url: 'https://example.com/bright2.jpg', alt: 'Outdoor play area' }
    ]
  }
];

// Helper function to convert price string to numeric value for filtering
function priceToNumber(price) {
  return price ? price.length : 0;
}

// GraphQL resolvers
const resolvers = {
  Query: {
    // Get all daycares
    daycares: () => mockDaycares,
    
    // Get a single daycare by ID
    daycare: (_, { id }) => mockDaycares.find(daycare => daycare.id === id),
    
    // Search for daycares with various filters
    searchDaycares: (_, { searchTerm = '', ageGroup = 'All', minPrice = 0, maxPrice = 4 }) => {
      // Start with all daycares
      let results = [...mockDaycares];
      
      // Filter by search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        results = results.filter(daycare => 
          daycare.name.toLowerCase().includes(term) || 
          daycare.address.toLowerCase().includes(term) ||
          (daycare.description && daycare.description.toLowerCase().includes(term))
        );
      }
      
      // Filter by age group
      if (ageGroup !== 'All') {
        results = results.filter(daycare => 
          daycare.ageGroups && daycare.ageGroups.includes(ageGroup)
        );
      }
      
      // Filter by price range
      results = results.filter(daycare => {
        const priceValue = priceToNumber(daycare.price);
        return priceValue >= minPrice && priceValue <= maxPrice;
      });
      
      return results;
    }
  }
};

module.exports = resolvers;
