import express from "express";
import Subscription from "../models/Subscription.js";

const subscriptionRouter = express.Router();

subscriptionRouter.get("/", async (req, res) => {
  try {
    const subscriptions = await Subscription.find();
    res.json(subscriptions);
  } catch (error) {
    res.status(500).send("Server Error")
  }
});

export default subscriptionRouter;
