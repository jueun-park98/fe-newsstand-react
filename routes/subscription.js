import express from "express";
import Subscription from "../models/Subscription.js";

const subscriptionRouter = express.Router();

subscriptionRouter.get("/", async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.json(subscriptions);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

subscriptionRouter.post("/", async (req, res) => {
  try {
    const { news } = req.body;
    const newSubscription = new Subscription(news);

    await newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

subscriptionRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Subscription.findByIdAndDelete(id);

    if (!result) res.status(404).send("Subscription not found");
    res.status(200).json({ message: "Subscription deleted successfully" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

export default subscriptionRouter;
