import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
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

const News = mongoose.model("News", newsSchema);

export default News;