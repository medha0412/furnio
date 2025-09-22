# Furniro Fullstack Assignment

A full-stack e‑commerce application (Furniture store) built with a React + Vite frontend and a Node.js + Express + MongoDB backend. It features product CRUD, server-side filtering/sorting/pagination, cart with persistence, product comparison, and a modern responsive UI implemented with Tailwind CSS.

## Contents
- Overview
- Tech Stack
- Features
- Quick Start
- Configuration (Environment variables)
- Scripts
- API Overview
- Data Model
- Seeding Products
- Frontend Usage Guide
- Troubleshooting
- Project Structure

---

## Overview
This project delivers a responsive furniture e‑commerce UI with the following user flows:
- Browse products with filters, sorting, and pagination
- Add/update/delete products (admin UX from the UI)
- Add to cart with persistence across refreshes; clear on checkout
- Product details and related items
- Product comparison (select exactly 2 products from cart)
- Fully responsive pages/components (Landing, Shop, Products, About, Contact, Cart, Checkout, Comparison, Header, Footer, ProductCard, Filters, Modals)

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, Axios, React Router
- Backend: Node.js, Express, MongoDB (Mongoose)
- Tooling: ESLint (via Vite defaults), Lucide icons, local JSON seeding helpers

## Features
- Product CRUD (Create/Read/Update/Delete)
- Server-side filtering, sorting, and pagination
- Responsive design across all core pages/components
- Static asset handling via `frontend/public/images`
- Cart sidebar with persistent items (localStorage)
- Product comparison page (requires exactly 2 items in cart)
- Modals for Add/Edit and Delete confirmation

## Quick Start

Prerequisites:
- Node.js 18+
- MongoDB running locally (or a connection string)

1) Install dependencies
```bash
# from repo root
cd backend && npm install
cd ../frontend && npm install
```

2) Configure environment variables
Create `backend/.env` (optional if using defaults):
```bash
MONGODB_URI=mongodb://127.0.0.1:27017/furniro
PORT=3000
```
Create `frontend/.env` (optional if using defaults):
```bash
VITE_API_BASE_URL=http://localhost:3000
```

3) Start backend and frontend (two terminals)
```bash
# terminal 1
cd backend
npm run dev

# terminal 2
cd frontend
npm run dev
```
Frontend runs at http://localhost:5173, Backend at http://localhost:3000.

4) (Optional) Seed products
```bash
# seed via HTTP
curl -X POST http://localhost:3000/products/seed
```

## Configuration (Environment variables)
Backend (`backend/.env`):
- `MONGODB_URI` – MongoDB connection string
- `PORT` – server port (default 3000)

Frontend (`frontend/.env`):
- `VITE_API_BASE_URL` – base URL to backend (default http://localhost:3000)

## Scripts
Backend (from `backend`):
- `npm run dev` – start with nodemon
- `npm start` – start production server

Frontend (from `frontend`):
- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview built app

## API Overview
Base URL: `${VITE_API_BASE_URL || http://localhost:3000}`

Products
- `GET /products` – list products with filters
  - Query params: `page, limit, sortBy, sortOrder, brand, category, material, minPrice, maxPrice`
- `POST /products` – create product
- `PUT /products/:id` – update product
- `DELETE /products/:id` – delete product
- `POST /products/seed` – seed database with sample furniture products

Request/Response examples can be found in `backend/controllers/productsController.js` and `frontend/src/api/products.js`.

## Data Model
`backend/models/Product.js`
```js
{
  name: String,
  brand: String,
  category: String,
  material: String,
  price: Number,
  description: String,
  image: String, // optional; frontend assigns a static image if empty
  // optional UI fields
  oldPrice: Number,
  discount: Number,
  isNew: Boolean,
  createdAt: Date,
}
```

## Seeding Products
- Run `POST /products/seed` to populate the DB with furniture items matching the UI (e.g., Syltherine, Leviosa, Lolito, etc.).
- Frontend assigns static images from `/public/images` when `image` is missing.

## Frontend Usage Guide
- Shop (`/shop`):
  - Filter by category/material/brand/price; sort by brand/price/name; add/edit/delete products via card actions/modal.
- Products (`/products`):
  - Similar to Shop with shared filters/pagination and CRUD.
- Landing (`/`):
  - Hero banner, categories, products grid with hover actions, product details view.
- Cart:
  - Persistent between refreshes; clear on checkout; Cart Sidebar toggles from header icon.
- Comparison (`/comparison`):
  - Add exactly 2 items to cart then open comparison via sidebar.

## Troubleshooting
- No images appear:
  - Ensure assets exist in `frontend/public/images` and paths use `/images/...`. Filenames with spaces/parentheses are supported.
- Background images not visible:
  - Confirm no opaque container overlays; we use overlays with lower z-index and `pointer-events: none` when needed.
- CRUD not updating list:
  - Verify backend is running and `VITE_API_BASE_URL` points to it. Check console/network for errors.
- Empty DB:
  - Seed with `POST /products/seed` once, then reload.
- Cart not persisting:
  - Ensure localStorage is enabled and not blocked.

## Project Structure
```
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
    main.jsx, App.jsx
```

---

Maintainers: add deployment notes (e.g., Render/Netlify/Vercel + MongoDB Atlas) and environment secrets as needed.
