const express = require("express");
const feedbacks = require("./data/feedbacks");

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/feedback", (req, res) => {
  res.json(feedbacks);
});

app.get("/api/feedback/:id", (req, res) => {
  const feedback = feedbacks.find((f) => f._id === req.params.id);
  console.log(feedback);
  res.json(feedback);
});

app.listen(5000, console.log("Server running on port 5000"));
