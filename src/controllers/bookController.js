import BookModel from "../database/schema/Book.js";
import ReviewModel from "../database/schema/Review.js";
import { getPagination } from "../utils/pagination.js";
import sanitize from "mongo-sanitize";

export const addBook = async (req, res) => {
  try {
    const sanitizedData = sanitize(req.body);
    const book = await BookModel.create({
      ...sanitizedData,
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Book added successfully",
      status: true,
      result: book,
    });
  } catch (err) {
    console.error("Add Book Error:", err);
    res.status(500).json({ message: "Internal server error", status: false });
  }
};

export const getBooks = async (req, res) => {
  try {
    const { author, genre } = req.query;
    const { page, limit, skip } = getPagination(req);

    const query = {};
    if (author) query.author = new RegExp(sanitize(author), "i");
    if (genre) query.genre = new RegExp(sanitize(genre), "i");

    const books = await BookModel.find(query).skip(skip).limit(limit);
    const total = await BookModel.countDocuments(query);

    res.status(200).json({
      message: "Books fetched successfully",
      status: true,
      result: books,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Get Books Error:", err);
    res.status(500).json({ message: "Error fetching books", status: false });
  }
};

export const getBookById = async (req, res) => {
  try {
    const bookId = sanitize(req.params.id);
    const book = await BookModel.findById(bookId);

    if (!book)
      return res.status(404).json({ message: "Book not found", status: false });

    const reviews = await ReviewModel.find({ book: bookId })
      .populate("user", "name")
      .limit(10);

    const avgRating = await ReviewModel.aggregate([
      { $match: { book: book._id } },
      { $group: { _id: "$book", avgRating: { $avg: "$rating" } } },
    ]);

    res.status(200).json({
      status: true,
      result: {
        book,
        averageRating: avgRating[0]?.avgRating || 0,
        reviews,
      },
    });
  } catch (err) {
    console.error("Get Book By ID Error:", err);
    res.status(500).json({ message: "Error fetching book", status: false });
  }
};

export const searchBooks = async (req, res) => {
  try {
    const { title, author } = req.query;
    const { page, limit, skip } = getPagination(req);

    const query = {};
    if (title) query.title = new RegExp(sanitize(title), "i");
    if (author) query.author = new RegExp(sanitize(author), "i");

    const books = await BookModel.find(query).skip(skip).limit(limit);
    const total = await BookModel.countDocuments(query);

    res.status(200).json({
      message: "Search results",
      status: true,
      result: books,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error("Search Books Error:", err);
    res.status(500).json({ message: "Search failed", status: false });
  }
};
