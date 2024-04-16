import express from "express";
import fs from "fs";
import path from "path";
import { __dirname } from "../App.js";

const subscriptionRouter = express.Router();

subscriptionRouter.get("/", (req, res) => {
  const newsPath = path.join(__dirname, "data/news.json");

  fs.readFile(newsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading news: ", err);
      res.status(500).send("Server Error");
      return;
    }

    try {
      const subscriptions = JSON.parse(data).subscriptions;

      res.set("Cache-Control", "public, max-age=300");
      res.json(subscriptions);
    } catch (parseError) {
      console.error("Error parsing news: ", parseError);
      res.status(500).send("Server Error");
    }
  });
});

subscriptionRouter.post("/", (req, res) => {
  const newsPath = path.join(__dirname, "data/news.json");
  const newSubscription = req.body;

  fs.readFile(newsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading news: ", err);
      res.status(500).send("Server Error");
      return;
    }

    try {
      const parsedData = JSON.parse(data);
      const subscriptions = parsedData.subscriptions;

      subscriptions.push(newSubscription);
      fs.writeFile(newsPath, JSON.stringify(parsedData, null, 2), (writeError) => {
        if (writeError) {
          console.error("Error writing subscription: ", writeError);
          res.status(500).send("Server Error");
          return;
        }

        res.status(201).send("Subscription added successfully");
      });
    } catch (parseError) {
      console.error("Error parsing news: ", parseError);
      res.status(500).send("Server Error");
    }
  });
});

subscriptionRouter.delete("/:id", (req, res) => {
  const newsPath = path.join(__dirname, "data/news.json");
  const subscriptionId = req.params.id;

  fs.readFile(newsPath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading news: ", err);
      res.status(500).send("Server Error");
      return;
    }

    try {
      const parsedData = JSON.parse(data);
      const subscriptions = parsedData.subscriptions;
      const index = subscriptions.findIndex((subscription) => subscription.id === subscriptionId);
      if (index === -1) {
        res.status(404).send("Subscription not found");
        return;
      }

      subscriptions.splice(index, 1);
      fs.writeFile(newsPath, JSON.stringify(parsedData, null, 2), (writeError) => {
        if (writeError) {
          console.error("Error writing news: ", writeError);
          res.status(500).send("Server Error");
          return;
        }

        res.status(200).send("Subscription deleted successfully");
      });
    } catch (parseError) {
      console.error("Error parsing news: ", parseError);
      res.status(500).send("Server Error");
    }
  });
});

export default subscriptionRouter;
