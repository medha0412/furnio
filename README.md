Furniro – Fullstack E-Commerce Assignment

A full-stack e-commerce application (Furniture Store) built with React + Vite (frontend) and Node.js + Express + MongoDB (backend).
🚀 **Live Demo:** [Frontend on Netlify](https://furniro4.netlify.app/)
⚙️ **API Endpoint:** [Backend on Render](https://furnio-he77.onrender.com)

📖 Contents

Overview

Tech Stack

Features

Quick Start

Configuration

Scripts

API Overview

Data Model

Seeding Products

Frontend Usage Guide

Troubleshooting

Project Structure

Deployment

🔎 Overview

This project delivers a modern and responsive furniture e-commerce platform with:

Product browsing, filtering, sorting, and pagination

Admin CRUD actions (create, update, delete products from UI)

Shopping cart with persistence (localStorage)

Product comparison (select 2 items)

Responsive pages (Landing, Shop, Products, Cart, Checkout, Comparison, etc.)

🛠 Tech Stack

Frontend

React (with Vite)

Tailwind CSS

Axios

React Router

Backend

Node.js + Express

MongoDB + Mongoose

Tooling

ESLint (Vite defaults)

Lucide icons

JSON seeding helpers

Deployment

Frontend: Netlify

Backend: Render

✨ Features

✅ Product CRUD

✅ Server-side filtering, sorting & pagination

✅ Cart with local persistence

✅ Product comparison (2-item limit)

✅ Responsive design

✅ Static assets served from frontend/public/images

⚡ Quick Start
Prerequisites

Node.js 18+

MongoDB (local or cloud e.g., Atlas)

1) Install dependencies
cd backend && npm install
cd ../frontend && npm install

2) Configure environment variables

Backend → backend/.env

MONGODB_URI=mongodb://127.0.0.1:27017/furniro
PORT=3000


Frontend → frontend/.env

VITE_API_BASE_URL=http://localhost:3000

3) Start backend & frontend
# terminal 1
cd backend
npm run dev

# terminal 2
cd frontend
npm run dev


Frontend → http://localhost:5173

Backend → http://localhost:3000

4) (Optional) Seed products
curl -X POST http://localhost:3000/products/seed

⚙️ Configuration (Environment Variables)
Backend (backend/.env)

MONGODB_URI → MongoDB connection string

PORT → Port number (default 3000)

Frontend (frontend/.env)

VITE_API_BASE_URL → Base URL to backend

Local: http://localhost:3000

Production: https://furnio-he77.onrender.com

📡 API Overview

Base URL → ${VITE_API_BASE_URL}

Products API

GET /products → List with filters/pagination

POST /products → Create

PUT /products/:id → Update

DELETE /products/:id → Delete

POST /products/seed → Seed sample products

🗂 Data Model

backend/models/Product.js

{
  name: String,
  brand: String,
  category: String,
  material: String,
  price: Number,
  description: String,
  image: String,       // optional; static fallback in frontend
  oldPrice: Number,
  discount: Number,
  isNew: Boolean,
  createdAt: Date,
}

🌱 Seeding Products

Run:

POST /products/seed


Populates DB with sample furniture items (Syltherine, Leviosa, Lolito, etc.).

🖥 Frontend Usage Guide

Shop (/shop) → filter/sort products, CRUD actions

Landing (/) → hero banner, product grid, details

Cart → persistent across refresh, clear on checkout

Comparison (/comparison) → requires exactly 2 items

🛠 Troubleshooting

No images → confirm frontend/public/images exists

Background not visible → check z-index/overlays

CRUD not updating → ensure backend running & VITE_API_BASE_URL set correctly

Empty DB → run seeding endpoint once

Cart not persisting → ensure localStorage enabled

📂 Project Structure
backend/
  controllers/
  models/
  routes/
  seed/
  utils/
  server.js
frontend/
  public/images/
  src/
    api/
    components/
    contexts/
    pages/
    utils/
    styles/
    main.jsx
    App.jsx

🚀 Deployment

Frontend (Netlify) → https://furniro4.netlify.app/

Backend (Render) → https://furnio-he77.onrender.com

Both are connected — frontend consumes the Render backend via VITE_API_BASE_URL.
