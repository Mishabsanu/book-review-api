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

### 3. Setup Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/bookreview
JWT_SECRET=your_jwt_secret_key
```

### 4. Start Server

```bash
npm run dev
```

---

## 🔑 Authentication Endpoints

```http
POST /api/auth/signup
POST /api/auth/login
```

## 📚 Book Endpoints

```http
                1# Add new book (authrequired) 
POST   /api/V1/book/add-book   - >http://localhost:5000/api/V1/book/add-book

                2# Get all books (pagination, filter)
GET    /api/V1/book/get-books   ->http://localhost:5000/api/V1/book/get-books

                3# Get book by ID with reviews
GET    /api/V1/book/get-book/:id            ->http://localhost:5000/api/V1/book/get-book/684089573401e1e4f4ea7503


                4# Add review to book (auth)
POST   /api/V1/review/books/:id/add-reviews    ->http://localhost:5000/api/V1/review/books/684089573401e1e4f4ea7503/add-reviews
```

## ✏️ Review Endpoints

```http
 # Update own review
PUT    /api/V1/review/update-review/:id        ->http://localhost:5000/api/V1/review/update-review/68408f3fbc9c06cf2081af60  

 # Delete own review
DELETE /api/V1/review/delete-review/:id       ->http://localhost:5000/api/V1/review/delete-review/68408f3fbc9c06cf2081af60
```

## 🔍 Search Endpoint

```http
GET    /api/books/search?title=atomic&author=james&page=1&limit=10 -> http://localhost:5000/api/V1/book/search?title=Atomic Habits


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
curl -X POST http://localhost:5000/api/books \
  -H 'Authorization: Bearer <JWT_TOKEN>' \
  -H 'Content-Type: application/json' \
  -d '{"title":"Book Title","author":"Author","genre":"Fiction"}'
```

---

## 🗃️ Database Schema

### User

```js
{
  name: String,
  email: String,
  password: String (hashed)
}
```

### Book

```js
{
  title: String,
  author: String,
  genre: String,
  createdBy: ObjectId (User)
}
```

### Review

```js
{
  user: ObjectId (User),
  book: ObjectId (Book),
  rating: Number,
  comment: String
}
```

---

## ✍️ Assumptions & Decisions

- A user can review each book only once.
- Only authenticated users can create or edit reviews.
- Pagination is handled using `?page=1&limit=10`.
- Search supports partial and case-insensitive title or author query.

---


