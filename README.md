
# Furniro – Full‑Stack Furniture E‑commerce

Modern, responsive furniture store built with React + Vite and Node.js + Express + MongoDB. It supports full product CRUD, server‑side filtering/sorting/pagination, a persistent cart, product comparison, likes, and polished UI with Tailwind CSS.

Live Demo (Frontend): https://furniro4.netlify.app/
Backend API (Render): https://furnio-he77.onrender.com/

## Contents
- Overview
- Live URLs
- Features
- Tech Stack
- Architecture
- Quick Start (Local)
- Configuration (Environment variables)
- Scripts
- API Overview + Examples
- Data Model
- Seeding Products
- Frontend Usage Guide
- Deployment (Render + Netlify)
- Troubleshooting & FAQ
- Project Structure

---

## Overview
Furniro delivers a clean, mobile‑first shopping experience:
- Browse products with filters, sorting, and pagination
- Create/Update/Delete products from the UI
- Persistent cart (localStorage), cleared on successful checkout
- Product detail page and comparison view (exactly two items)
- Hover actions: Add to cart, Like, Compare, Share
- Vite static assets via `public/images` for reliable image delivery

## Live URLs
- Frontend (Netlify): https://furniro4.netlify.app/
- Backend (Render): https://furnio-he77.onrender.com/

## Features
- Product CRUD (Create/Read/Update/Delete)
- Server‑side filters (category/material/brand/price), sort, and paginate
- Responsive layout across Landing, Shop, Products, About, Contact, Cart, Checkout, Comparison
- Cart Sidebar with quantity controls and persistence
- Likes Sidebar with localStorage persistence
- Product comparison (exactly two items in cart)
- Modals for Add/Edit product and Delete confirmation
- SPA routing with Netlify `_redirects` to prevent 404s

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, Axios, React Router
- Backend: Node.js, Express, MongoDB (Mongoose)
- Icons/Utils: Lucide‑react, local helpers

## Architecture
- API‑first: the frontend consumes REST endpoints for products
- Context providers for Cart and Likes with localStorage sync
- Backend controllers handle validation, filtering, sorting, pagination
- Assets served from `frontend/public/images` to avoid bundler path issues

## Quick Start (Local)

Prerequisites:
- Node.js 18+
- MongoDB (local or Atlas connection string)

1) Install dependencies
```bash
# from repo root
cd backend && npm install
cd ../frontend && npm install
```

2) Configure environment variables
Create `backend/.env`:
```bash
MONGODB_URI=mongodb://127.0.0.1:27017/furniro
PORT=3000
```
Create `frontend/.env`:
```bash
VITE_API_BASE_URL=http://localhost:3000
```

3) Run locally (two terminals)
```bash
# terminal 1
cd backend
npm run dev

# terminal 2
cd frontend
npm run dev
```
Frontend: http://localhost:5173  |  Backend: http://localhost:3000

4) (Optional) Seed products
```bash
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

## API Overview + Examples
Base URL: `${VITE_API_BASE_URL || http://localhost:3000}`

Products
- `GET /products` – list with filters
  - Query: `page, limit, sortBy, sortOrder, brand, category, material, minPrice, maxPrice`
- `POST /products` – create
- `PUT /products/:id` – update
- `DELETE /products/:id` – delete
- `POST /products/seed` – seed sample furniture

Example requests (replace base URL for production backend):
```bash
# List chairs under ₹5,000 sorted by price desc
curl "http://localhost:3000/products?category=Chairs&maxPrice=500000&sortBy=price&sortOrder=desc"

# Create a product
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Syltherine Chair",","brand":"Furniro","category":"Chairs","material":"Wood",
    "price":2500000,"description":"Stylish cafe chair"}'

# Update a product
curl -X PUT http://localhost:3000/products/:id \
  -H "Content-Type: application/json" \
  -d '{"price":2300000}'

# Delete a product
curl -X DELETE http://localhost:3000/products/:id

# Seed
curl -X POST http://localhost:3000/products/seed
```

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
- Run `POST /products/seed` to populate the DB with furniture items matching the UI (Syltherine, Leviosa, Lolito, etc.).
- Frontend assigns static images from `/public/images` when `image` is missing.

## Frontend Usage Guide
- Shop (`/shop`):
  - Filter by category/material/brand/price; sort; add/edit/delete products via card actions and modals.
- Products (`/products`):
  - Same toolkit as Shop; shares CRUD/filters/pagination.
- Landing (`/`):
  - Hero, categories, products grid with hover actions; product details view.
- Cart:
  - Persistent between refreshes; clears on checkout; open via header icon.
- Comparison (`/comparison`):
  - Add exactly 2 items to cart, then open comparison view.
- Likes Sidebar:
  - Like products from cards; view/manage in sidebar.

## Deployment

### Backend (Render)
- Service: Web Service
- Root: `backend`
- Build: `npm install`
- Start: `npm start`
- Environment: `MONGODB_URI`, `PORT` (optional)
- Health check path: `/products`

Live: https://furnio-he77.onrender.com/

### Frontend (Netlify)
- Base directory: `frontend`
- Build command: `npm run build`
- Publish directory: `frontend/dist`
- Env vars: `VITE_API_BASE_URL=https://furnio-he77.onrender.com`
- SPA redirects: create `frontend/public/_redirects` with:
```
/* /index.html 200
```

Live: https://furniro4.netlify.app/

## Troubleshooting & FAQ
- Images not visible
  - Ensure assets exist under `frontend/public/images` and referenced as `/images/...` (spaces/parentheses supported).
- Background image hidden
  - Ensure no opaque container overlays; our hero uses an overlay with lower z‑index.
- CRUD not updating
  - Confirm backend is running and `VITE_API_BASE_URL` points to it; check browser devtools Network/Console.
- Empty database
  - Seed once via `POST /products/seed`.
- Netlify 404 on refresh
  - Ensure `_redirects` file is present in `frontend/public`.

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

Maintainers: keep environment secrets in Render/Netlify settings; rotate credentials periodically.
