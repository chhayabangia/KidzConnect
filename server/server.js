console.log("Starting server...");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

console.log("Modules loaded");

const app = express();
const PORT = process.env.PORT || 5000; // Make sure this is different from the frontend port

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Add CORS headers to all responses
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Import GraphQL setup
const createApolloServer = require("./graphql");

// Import routes
const placesRoutes = require("./routes/placesRoutes");

// Use routes
app.use("/api/places", placesRoutes);

// Test endpoint
app.get("/test", (req, res) => {
  console.log("Test endpoint called");
  res.json({ message: "Server is running!" });
});

// Connect to MongoDB
console.log(
  "Connecting to MongoDB at:",
  process.env.MONGO_URI || "mongodb://localhost:27017/kidz-connect"
);
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/kidz-connect", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
    console.log("Server is ready to accept requests");
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Daycare Schema
const daycareSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  email: String,
  capacity: Number,
  currentEnrollment: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  programs: [String],
  openingHours: String,
});

// Create Daycare model
const Daycare = mongoose.model("Daycare", daycareSchema);

// Routes
// GET all daycares
app.get("/daycares", async (req, res) => {
  try {
    const daycares = await Daycare.find();
    res.json(daycares);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single daycare by ID
app.get("/daycares/:id", async (req, res) => {
  try {
    const daycare = await Daycare.findById(req.params.id);
    if (!daycare) {
      return res.status(404).json({ error: "Daycare not found" });
    }
    res.json(daycare);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new daycare
app.post("/daycares", async (req, res) => {
  try {
    const daycare = new Daycare(req.body);
    const savedDaycare = await daycare.save();
    res.status(201).json(savedDaycare);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT (update) a daycare
app.put("/daycares/:id", async (req, res) => {
  try {
    const daycare = await Daycare.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!daycare) {
      return res.status(404).json({ error: "Daycare not found" });
    }
    res.json(daycare);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a daycare
app.delete("/daycares/:id", async (req, res) => {
  try {
    const daycare = await Daycare.findByIdAndDelete(req.params.id);
    if (!daycare) {
      return res.status(404).json({ error: "Daycare not found" });
    }
    res.json({ message: "Daycare deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search daycares
app.get("/daycares/search", async (req, res) => {
  try {
    const { name, address, program } = req.query;
    const query = {};

    if (name) query.name = { $regex: name, $options: "i" };
    if (address) query.address = { $regex: address, $options: "i" };
    if (program) query.programs = { $in: [program] };

    const daycares = await Daycare.find(query);
    res.json(daycares);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

// Initialize Apollo Server
const startServer = async () => {
  try {
    // Apply Apollo GraphQL middleware
    await createApolloServer(app);

    // Start Express server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log("Server started successfully");
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();
