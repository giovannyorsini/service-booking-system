import app from "./app.js";

const PORT = process.env.PORT || 3000;

// Simple health check
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
