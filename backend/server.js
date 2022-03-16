import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import feedbacks from "./data/feedbacks.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/feedback", (req, res) => {
  res.json(feedbacks);
});

app.get("/api/feedback/:id", (req, res) => {
  const feedback = feedbacks.find((f) => f._id === req.params.id);
  res.json(feedback);
});

app.delete("/api/feedback/:id", (req, res) => {
  const feedback = feedbacks.findById(req.params.id);
  if (feedback) {
    feedback.remove();
    res.json({ message: "Feedback removed" });
  } else {
    res.status(404);
    throw new Error("Feedback not found");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
