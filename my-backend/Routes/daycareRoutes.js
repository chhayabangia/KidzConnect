const Daycare = require("../models/Daycare");


app.post("/daycares", async (req, res) => {
  try {
    const daycare = new Daycare(req.body);
    const saved = await daycare.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


app.get("/daycares", async (req, res) => {
  const daycares = await Daycare.find();
  res.json(daycares);
});
