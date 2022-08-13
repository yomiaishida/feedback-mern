import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
// import feedbacks from "./data/feedbacks.js";
import Feedback from "./models/feedbackModel.js";
import colors from "colors";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.get("/api/feedback", async (req, res) => {
  // res.json(Feedback);

  const feedback = await Feedback.find();
  console.log(feedback);
  res.json(feedback);
});

app.post("/api/create", async (req, res) => {
  // res.send("API is running...");
  // console.log(req.body);
  const { rating, text } = req.body;

  try {
    const feed = await Feedback.create({ rating, text });
    res.status(200).json(feed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/feedback/:id", (req, res) => {
  const feedback = Feedback.find((f) => f._id === req.params.id);
  if (feedback) {
    res.json(feedback);
  } else {
    res.status(404);
    throw new Error("Feedback not found");
  }
});

app.delete("/api/feedback/:id", async (req, res) => {
  const feedback = Feedback.findById(req.params.id);
  if (feedback) {
    await feedback.remove();
    res.json({ message: "Feedback removed" });
  } else {
    res.status(404);
    throw new Error("Feedback not found");
  }
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
