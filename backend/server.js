import app from "./app.js";
import { ServiceRequest } from "./models/ServiceRequest.js";

// Initialize the local server
const PORT = 3000;

// Testing the server
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// In-memory store used for local development/demo purposes.
// Replace with a database-backed repository for production usage.
const requests = [];

app.post("/requests", (req, res) => {
  const { name, address, serviceType } = req.body;

  // Defensive validation: reject blank/whitespace-only fields up front.
  if (!name?.trim() || !address?.trim() || !serviceType?.trim()) {
    return res.status(400).json({ error: "Fields cannot be empty" });
  }

  // Model instance centralizes defaults (id/status) in one place.
  const newRequest = new ServiceRequest(name, address, serviceType);

  requests.push(newRequest);

  // Return the created resource so clients can render/update immediately.
  res.status(201).json(newRequest);
});

// Minimal read endpoint for listing all currently stored requests.
app.get("/requests", (req, res) => {
  res.json(requests);
});
