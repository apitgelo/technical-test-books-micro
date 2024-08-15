import express from "express";
import * as bookController from "../../controllers/book-controller";
import { validationBodyMiddleware, validationPathMiddleware } from "../../middlewares/validation-middleware";
import { BookCreateValidator, BookGetPathValidator, BookUpdateValidator } from "../../validators/book-validator";

const router = express.Router();

router.post("/", validationBodyMiddleware(BookCreateValidator), bookController.addBook);
router.get("/", bookController.browseBooks);
router.get("/:bookId", validationPathMiddleware(BookGetPathValidator), bookController.getBook);
router.put("/:bookId", [validationPathMiddleware(BookGetPathValidator), validationBodyMiddleware(BookUpdateValidator)], bookController.editBook);

export default router;
