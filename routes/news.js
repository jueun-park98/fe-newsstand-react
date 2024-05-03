import express from "express";
import News from "../models/News.js";

const newsRouter = express.Router();

newsRouter.get("/", async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

export default newsRouter;