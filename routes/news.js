import express from "express";
import fs from "fs";
import path from "path";
import { __dirname } from "../App.js";

const newsRouter = express.Router();

newsRouter.get("/", (req, res) => {
  const newsPath = path.join(__dirname, "data/news.json");

  fs.readFile(newsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading news: ", err);
      res.status(500).send("Server Error");
      return;
    }

    try {
      const news = JSON.parse(data).news;

      res.set("Cache-Control", "public, max-age=300");
      res.json(news);
    } catch (parseError) {
      console.error("Error parsing news: ", parseError);
      res.status(500).send("Server Error");
    }
  });
});

export default newsRouter;