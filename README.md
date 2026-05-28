# Bookify — Student Book Discovery and Recommendation Platform

Bookify is a full-stack book discovery platform designed for students to search books, manage wishlists, track reading activity, and receive personalized recommendations. The system includes separate student and admin flows, allowing students to discover and save books while admins manage the book catalogue.

## Project Overview

Bookify helps students find books based on department, genre, and interest. Students can register, log in, explore books, add books to their wishlist, track reading progress, and view recommended books.

The project also includes an admin dashboard for managing book-related data, making it a complete student-focused book management and recommendation platform.

## Features

* Student login and signup
* Admin login and dashboard
* Student dashboard
* Book search and discovery
* Wishlist management
* Personalized book recommendations
* Student reading tracker
* Book catalogue management
* REST API-based backend
* MongoDB database integration

## Tech Stack

### Frontend

* Next.js
* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* REST APIs

### Tools

* Git
* GitHub
* MongoDB Compass
* VS Code
* Vercel

## Architecture

```text
User
 |
 |-- Next.js Landing Page
 |
 |-- Static Bookify App Pages
 |     |-- Login / Signup
 |     |-- Student Dashboard
 |     |-- Admin Dashboard
 |     |-- Wishlist
 |     |-- Tracker
 |     |-- Recommendations
 |
 |-- Express.js Backend API
 |
 |-- MongoDB Database
       |-- users
       |-- books
       |-- wishlists
```

The Next.js landing page acts as the project entry point. The actual Bookify application screens are served from the `public/bookify` folder. The backend exposes REST APIs for users, books, wishlists, and recommendations.

## How to Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/njshrutics24-bot/newproject.git
cd newproject
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Run the frontend

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

Bookify app starts at:

```text
http://localhost:3000/bookify/index.html
```

### 4. Install backend dependencies

Open a new terminal:

```bash
cd backend
npm install
```

### 5. Create backend environment file

Create a `.env` file inside the `backend` folder:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/newproject
JWT_SECRET=bookify_dev_secret_12345
PORT=5000
CLIENT_URL=http://localhost:3000
```

### 6. Run the backend

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:5000
```

Health check:

```text
http://localhost:5000/api/health
```

## API Endpoints

### User Routes

```text
POST /api/users/register
POST /api/users/login
```

### Book Routes

```text
GET /api/books
GET /api/books/:id
GET /api/books/search?q=
GET /api/books/department/:deptCode
GET /api/books/genre/:genreName
```

### Wishlist Routes

```text
GET /api/wishlist
POST /api/wishlist
DELETE /api/wishlist/:id
```

### Recommendation Routes

```text
GET /api/recommendations
```

## Screenshots

Add screenshots here after capturing the working app.

Recommended screenshots:

```text
Landing Page
Login Page
Student Dashboard
Admin Dashboard
Wishlist Page
Tracker Page
Recommendations Page
```

Example format:

```md
![Landing Page](./screenshots/landing-page.png)
![Student Dashboard](./screenshots/student-dashboard.png)
```

## Resume Summary

Built a full-stack student book discovery platform with login/signup, student dashboard, admin dashboard, book search, wishlist, tracker, and recommendation modules. Developed REST APIs using Node.js, Express.js, and MongoDB to manage users, books, wishlists, and recommendations.

## Resume Bullet Points

* Built a full-stack student book discovery platform with student/admin authentication, book search, wishlist management, reading tracker, and personalized recommendation features.
* Developed REST APIs using Node.js, Express.js, and MongoDB to manage users, books, wishlists, and recommendation data.
* Designed separate student and admin dashboards to support role-based user flows and book catalogue management.

## Future Improvements

* Deploy backend on Render or Railway
* Connect frontend to deployed backend URL
* Add production MongoDB Atlas database
* Improve UI responsiveness
* Add admin book creation and update forms
* Add richer recommendation logic based on student reading history
