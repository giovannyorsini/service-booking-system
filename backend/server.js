const express = require("express");

// initialize the local server
const app = express();
const PORT = 3000;

app.use(express.json());

// testing the server
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

const ServiceRequest = require("./models/ServiceRequest");

const requests = [];

app.post("/requests", (req, res) => {
  const { name, address, serviceType } = req.body;

  const newRequest = new ServiceRequest(name, address, serviceType);

  requests.push(newRequest);

  res.status(201).json(newRequest);
});
