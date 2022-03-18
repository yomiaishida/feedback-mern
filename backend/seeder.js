import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import feedbacks from "./data/feedbacks.js";
import Feedback from "./models/feedbackModel.js";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Feedback.deleteMany();

    await Feedback.insertMany(feedbacks);

    console.log("Data Imported!".green.inverse);
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Feedback.deleteMany();

    console.log("Data Destroyed!".red.inverse);
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
