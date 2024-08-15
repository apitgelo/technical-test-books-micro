import express from "express";
import * as bookController from "../../controllers/book-controller";
import { validationBodyMiddleware, validationPathMiddleware, validationQueryMiddleware } from "../../middlewares/validation-middleware";
import { BookBrowseParamsValidator, BookCreateValidator, BookIdPathValidator, BookUpdateValidator } from "../../validators/book-validator";

const router = express.Router();

router.post("/", validationBodyMiddleware(BookCreateValidator), bookController.addBook);
router.get("/", validationQueryMiddleware(BookBrowseParamsValidator), bookController.browseBooks);
router.get("/:bookId", validationPathMiddleware(BookIdPathValidator), bookController.getBook);
router.put("/:bookId", [validationPathMiddleware(BookIdPathValidator), validationBodyMiddleware(BookUpdateValidator)], bookController.editBook);
router.delete("/:bookId", validationPathMiddleware(BookIdPathValidator), bookController.removeBook);

export default router;
