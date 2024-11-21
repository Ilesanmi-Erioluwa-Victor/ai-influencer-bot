import express from "express";
import dotenv from "dotenv";
import { scheduleAutomation } from "./utils/schedule";

dotenv.config();

const app = express();

// Start automation
scheduleAutomation();

app.get("/", (req, res) => {
  res.send("AI Influencer Bot is running...");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
