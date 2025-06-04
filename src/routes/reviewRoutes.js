import express from "express";

import {
  addReview,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/books/:id/add-reviews", verifyToken, addReview);
router.put("/update-review/:id", verifyToken, updateReview);
router.delete("/delete-review/:id", verifyToken, deleteReview);

export default router;
