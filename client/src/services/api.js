import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:5001",
  headers: {
    "Content-Type": "application/json",
  },
});

// Daycare provider API services
export const daycareService = {
  // Get all daycares
  getAllDaycares: async () => {
    try {
      console.log("Fetching daycares from API...");
      // Try direct fetch instead of axios
      const response = await fetch("http://localhost:5001/daycares");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Daycares fetched successfully:", data);
      return data;
    } catch (error) {
      console.error("Error fetching daycares:", error);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      throw error;
    }
  },

  // Get a single daycare by ID
  getDaycareById: async (id) => {
    try {
      const response = await api.get(`/daycares/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching daycare with id ${id}:`, error);
      throw error;
    }
  },

  // Create a new daycare
  createDaycare: async (daycareData) => {
    try {
      const response = await api.post("/daycares", daycareData);
      return response.data;
    } catch (error) {
      console.error("Error creating daycare:", error);
      throw error;
    }
  },

  // Update a daycare
  updateDaycare: async (id, daycareData) => {
    try {
      const response = await api.put(`/daycares/${id}`, daycareData);
      return response.data;
    } catch (error) {
      console.error(`Error updating daycare with id ${id}:`, error);
      throw error;
    }
  },

  // Delete a daycare
  deleteDaycare: async (id) => {
    try {
      const response = await api.delete(`/daycares/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting daycare with id ${id}:`, error);
      throw error;
    }
  },

  // Search daycares
  searchDaycares: async (searchParams) => {
    try {
      const response = await api.get("/daycares/search", {
        params: searchParams,
      });
      return response.data;
    } catch (error) {
      console.error("Error searching daycares:", error);
      throw error;
    }
  },
};

// Export other services as needed
export default api;
