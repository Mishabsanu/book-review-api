import ReviewModel from "../database/schema/Review.js";

export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const bookId = req.params.id;

    const existing = await ReviewModel.findOne({
      user: req.user.id,
      book: bookId,
    });

    if (existing) {
      return res.status(400).json({
        message: "You have already reviewed this book.",
        status: false,
        result: null,
      });
    }

    const review = await ReviewModel.create({
      user: req.user.id,
      book: bookId,
      rating,
      comment,
    });

    return res.status(201).json({
      message: "Review added successfully.",
      status: true,
      result: review,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      status: false,
      error: err.message,
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const review = await ReviewModel.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!review) {
      return res.status(404).json({
        message: "Review not found or unauthorized",
        status: false,
        result: null,
      });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();

    return res.status(200).json({
      message: "Review updated successfully.",
      status: true,
      result: review,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      status: false,
      error: err.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await ReviewModel.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!review) {
      return res.status(404).json({
        message: "Review not found or unauthorized",
        status: false,
        result: null,
      });
    }

    return res.status(200).json({
      message: "Review deleted successfully.",
      status: true,
      result: review,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      status: false,
      error: err.message,
    });
  }
};
