import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  pressName: String,
  logoImageSrc: String,
  editedTime: String,
  category: String,
  headline: {
    thumbnailSrc: String,
    title: String,
    href: String,
  },
  sideNews: [{ title: String, href: String }],
});

const Subscription = mongoose.model("Subscription", subscriptionSchema)

export default Subscription;