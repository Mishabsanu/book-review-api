import express from "express";
import {
  addBook,
  getBooks,
  getBookById,
  searchBooks,
} from "../controllers/bookController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add-book", verifyToken, addBook);
router.get("/get-books", getBooks);
router.get("/get-book/:id", getBookById);
router.get("/search", searchBooks);

export default router;
