import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { MONGODB_URI } from "./config";
import rateLimiter from "./middlewares/rate-limiter";
import { inputSanitizer, validateInput } from "./middlewares/input-sanitizer";
import Router from "./routes";

dotenv.config();

const app = express();

const mongoUrl = MONGODB_URI;
mongoose.connect(mongoUrl)
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running and mongodb env configuration is valid. " + err);
    process.exit();
  });

app.set("port", process.env.PORT || 3000);

app.use(rateLimiter);
app.use(inputSanitizer);
app.use(validateInput);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: "application/*+json" }));
app.use(bodyParser.raw({ type: "application/vnd.api+json" }));
app.use(bodyParser.text({ type: "text/html" }));

Router.configure(app);

export default app;
