import express from "express";
import * as bookController from "../../controllers/book-controller";
import { validationBodyMiddleware } from "../../middlewares/validation-middleware";
import { BookCreateValidator } from "../../validators/book-validator";

const router = express.Router();

router.post("/", validationBodyMiddleware(BookCreateValidator), bookController.addBook);

export default router;
