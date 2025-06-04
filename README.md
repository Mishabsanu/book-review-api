# Book Review API

A clean and modular RESTful API for a Book Review system built with Node.js, Express, and MongoDB.

## ✅ Features

- JWT Authentication (Signup & Login)
- Add, view, and search books
- Add, edit, delete reviews (one review per user per book)
- Pagination and filtering
- Modular architecture (controllers, services, models, routes)
- Centralized error handling

---

## 📁 Folder Structure

```
book-review-api/
├── src/
│   ├── config/              # DB configuration
│   ├── controllers/         # Handles HTTP logic
│   ├── middlewares/         # Auth, error handling
│   ├── models/              # Mongoose schemas
│   ├── routes/              # Route handlers
│   ├── services/            # Business logic
│   ├── utils/               # Token, response helpers
│   └── app.js               # Express app
├── .env                     # Env variables
├── server.js                # Server entry
├── README.md
└── package.json
```

---

## ⚙️ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/book-review-api.git
cd book-review-api
```

### 2. Install Dependencies

```bash
npm install
```

Make sure to install `nodemon`:

```bash
npm install --save-dev nodemon
```

Update your `package.json` scripts:

```json
"scripts": {
  "start": "nodemon server.js"
}
```

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookreview
JWT_SECRET=your_jwt_secret_key
```

### 4. Start Server

```bash
npm start
```

---

## 🔑 Authentication Endpoints

```http
POST /api/V1/auth/signup
POST /api/V1/auth/login
```

## 📚 Book Endpoints

```http
# 1. Add new book (auth required)
POST /api/V1/book/add-book

# 2. Get all books (pagination, filter)
GET /api/V1/book/get-books

# 3. Get book by ID with reviews
GET /api/V1/book/get-book/:id

# 4. Add review to book (auth)
POST /api/V1/review/books/:id/add-reviews
```

## ✏️ Review Endpoints

```http
# Update own review
PUT /api/V1/review/update-review/:id

# Delete own review
DELETE /api/V1/review/delete-review/:id
```

## 🔍 Search Endpoint

```http
GET /api/V1/book/search?title=Atomic&author=James&page=1&limit=10
```

---

## 🧪 Example Requests

### Signup

```bash
curl -X POST http://localhost:5000/api/V1/auth/signup \
  -H 'Content-Type: application/json' \
  -d '{"name":"Mishab","email":"mishabsanu298@gmail.com","password":"123456"}'
```

### Login

```bash
curl -X POST http://localhost:5000/api/V1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"mishabsanu298@gmail.com","password":"123456"}'
```

### Add Book

```bash
curl -X POST http://localhost:5000/api/V1/book/add-book \
  -H 'Authorization: Bearer <JWT_TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{"title":"Book Title","author":"Author","genre":"Fiction"}'
```

---

## 🗃️ Database Schema

### User

```js
{
  name: String,                   // User's full name
  email: String,                  // Unique user email
  password: String,               // Hashed password
  created_at: Date,               // Timestamp of creation
  updated_at: Date,               // Timestamp of last update
  deleted_at: Date | null         // Soft delete timestamp
}

```

### Book

```js
{
  title: String,                  // Title of the book
  genre: String,                  // Genre/category of the book
  author: String,                 // Author name
  createdBy: ObjectId (User),     // Reference to the User who created it
  created_at: Date,               // Timestamp of creation
  updated_at: Date,               // Timestamp of last update
  deleted_at: Date | null         // Soft delete timestamp
}

```

### Review

```js
{
  user: ObjectId (User),          // Reference to the User who reviewed
  book: ObjectId (Book),          // Reference to the Book being reviewed
  rating: Number,                 // Star rating (e.g., 1 to 5)
  comment: String,                // Review text
  created_at: Date,               // Timestamp of creation
  updated_at: Date,               // Timestamp of last update
  deleted_at: Date | null         // Soft delete timestamp
}

```

---

## ✍️ Assumptions & Decisions

- A user can review each book only once.
- Only authenticated users can create or edit reviews.
- Pagination is handled using `?page=1&limit=10`.
- Search supports partial and case-insensitive title or author query.
