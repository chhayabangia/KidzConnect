const express = require('express');
const axios = require('axios');
const router = express.Router();

// Your Google Maps API key
const GOOGLE_MAPS_API_KEY = 'AIzaSyDkx7a4MMD0tkjmaOZxdMLb_6JAPBp7_nQ';

// Endpoint to search for places (daycares) near a location
router.get('/nearby', async (req, res) => {
  try {
    const { lat, lng, radius = 5000, type = 'daycare' } = req.query;
    
    if (!lat || !lng) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }
    
    // Call Google Places API to find nearby daycares
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location: `${lat},${lng}`,
        radius: radius,
        type: type,
        keyword: 'daycare childcare preschool',
        key: GOOGLE_MAPS_API_KEY
      }
    });
    
    // Transform the response to match our application's data structure
    const places = response.data.results.map(place => ({
      id: place.place_id,
      name: place.name,
      address: place.vicinity,
      rating: place.rating || 0,
      price: place.price_level ? '$'.repeat(place.price_level) : '$$',
      location: {
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng
      },
      // Calculate distance (rough approximation)
      distance: calculateDistance(
        lat, 
        lng, 
        place.geometry.location.lat, 
        place.geometry.location.lng
      ).toFixed(1),
      // Default values for fields not provided by Google Places API
      ageGroups: ['Infant', 'Toddler', 'Preschool'].slice(0, Math.floor(Math.random() * 3) + 1),
      openingHours: place.opening_hours && place.opening_hours.open_now ? 'Open now' : 'Call for hours',
      features: []
    }));
    
    res.json(places);
  } catch (error) {
    console.error('Error fetching nearby places:', error.response ? error.response.data : error.message);
    res.status(500).json({ 
      error: 'Failed to fetch nearby places',
      details: error.response ? error.response.data : error.message
    });
  }
});

// Endpoint to geocode an address or zip code
router.get('/geocode', async (req, res) => {
  try {
    const { address } = req.query;
    
    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }
    
    // Call Google Geocoding API
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: GOOGLE_MAPS_API_KEY
      }
    });
    
    if (response.data.status === 'OK' && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      res.json({
        lat: location.lat,
        lng: location.lng,
        formattedAddress: response.data.results[0].formatted_address
      });
    } else {
      res.status(404).json({ 
        error: 'Location not found',
        status: response.data.status
      });
    }
  } catch (error) {
    console.error('Error geocoding address:', error.response ? error.response.data : error.message);
    res.status(500).json({ 
      error: 'Failed to geocode address',
      details: error.response ? error.response.data : error.message
    });
  }
});

// Endpoint to get place details
router.get('/details/:placeId', async (req, res) => {
  try {
    const { placeId } = req.params;
    
    if (!placeId) {
      return res.status(400).json({ error: 'Place ID is required' });
    }
    
    // Call Google Place Details API
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/details/json', {
      params: {
        place_id: placeId,
        fields: 'name,formatted_address,formatted_phone_number,website,opening_hours,rating,reviews,photos,price_level,geometry',
        key: GOOGLE_MAPS_API_KEY
      }
    });
    
    if (response.data.status === 'OK' && response.data.result) {
      const place = response.data.result;
      
      // Transform the response to match our application's data structure
      const transformedPlace = {
        id: place.place_id,
        name: place.name,
        address: place.formatted_address,
        phone: place.formatted_phone_number || 'Not available',
        website: place.website || null,
        rating: place.rating || 0,
        price: place.price_level ? '$'.repeat(place.price_level) : '$$',
        location: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng
        },
        // Default values for fields not provided by Google Places API
        ageGroups: ['Infant', 'Toddler', 'Preschool'].slice(0, Math.floor(Math.random() * 3) + 1),
        openingHours: place.opening_hours ? 
          place.opening_hours.weekday_text || 'Call for hours' : 
          'Call for hours',
        reviews: place.reviews ? place.reviews.slice(0, 3).map(review => ({
          author: review.author_name,
          rating: review.rating,
          text: review.text,
          time: new Date(review.time * 1000).toLocaleDateString()
        })) : [],
        photos: place.photos ? place.photos.slice(0, 5).map(photo => ({
          reference: photo.photo_reference,
          url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_MAPS_API_KEY}`
        })) : []
      };
      
      res.json(transformedPlace);
    } else {
      res.status(404).json({ 
        error: 'Place not found',
        status: response.data.status
      });
    }
  } catch (error) {
    console.error('Error fetching place details:', error.response ? error.response.data : error.message);
    res.status(500).json({ 
      error: 'Failed to fetch place details',
      details: error.response ? error.response.data : error.message
    });
  }
});

// Helper function to calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 3958.8; // Radius of the Earth in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c; // Distance in miles
  return distance;
}

module.exports = router;
