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
  const feedback = await Feedback.find({});
  res.json(feedback);
});

app.post("/api/feedback", async (req, res) => {
  const { rating, text } = req.body;

  try {
    const feed = await Feedback.create({ rating, text });
    res.status(200).json(feed);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/api/feedback/:id", async (req, res) => {
  console.log(req.body);
  const { rating, text } = req.body;

  const oldRating = await Feedback.findById(req.params.id);

  if (oldRating) {
    oldRating.rating = rating;
    oldRating.text = text;
  }

  const updatedRating = await oldRating.save();
  res.json(updatedRating);
  res.send("Running");
});

// app.get("/api/feedback/:id", (req, res) => {
//   const feedback = Feedback.find((f) => f._id === req.params.id);
//   if (feedback) {
//     res.json(feedback);
//   } else {
//     res.status(404);
//     throw new Error("Feedback not found");
//   }
// });

app.delete("/api/feedback/:id", async (req, res) => {
  const feedback = Feedback.findById(req.params.id);
  if (feedback) {
    await feedback.deleteOne();
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
