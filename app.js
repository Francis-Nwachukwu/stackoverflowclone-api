import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";

import userRouter from "./routes/users.js";
import questionRouter from "./routes/questions.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
  res.send("Stackoverflowclone-api");
});

app.use("/auth", userRouter);
app.use("/questions", questionRouter);

const mongoDB_URI = process.env.mongoDB_URI;
const PORT = process.env.PORT || 5000;

mongoose
  .connect(mongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch((err) => console.log(err.message));
