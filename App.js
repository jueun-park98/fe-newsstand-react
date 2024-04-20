import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import mongoose from "mongoose";
import News from "./models/News.js";
import Subscription from "./models/Subscription.js";
import newsList from "./data/news.js";
import newsRouter from "./routes/news.js";
import subscriptionRouter from "./routes/subscription.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

app.use("/news", newsRouter);
app.use("/subscription", subscriptionRouter);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB에 성공적으로 연결되었습니다."))
  .catch((err) => console.error("MongoDB 연결 실패:", err));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected successfully");
  checkAndInitializeDB();
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

const checkAndInitializeDB = async () => {
  const newsCount = await News.countDocuments();
  const subscriptionCount = await Subscription.countDocuments();

  if (newsCount === 0) {
    try {
      const docs = await News.insertMany(newsList.news);
      console.log("News successfully initialized");
    } catch (err) {
      console.error(err);
    }
  }

  if (subscriptionCount === 0) {
    try {
      const docs = await Subscription.insertMany(newsList.subscription);
      console.log("Subscription successfully initialized");
    } catch (err) {
      console.error(err);
    }
  }
};

