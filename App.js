import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import newsRouter from "./routes/news.js";
import subscriptionRouter from "./routes/subscription.js";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

app.use("/news", newsRouter);
app.use("/subscriptions", subscriptionRouter)

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
