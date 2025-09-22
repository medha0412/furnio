# Product API Backend

A Node.js + Express backend API for product management with full CRUD operations, including server-side sorting, filtering, and pagination.

## Features

- **Express.js** with CORS enabled for cross-origin requests
- **RESTful API** endpoints for product management
- **Server-side sorting** by brand name and price (asc/desc)
- **Advanced filtering** by brand, category, and price range
- **Pagination** with configurable page size and total count
- **JSON file storage** for product data persistence
- **Sample data seeding** endpoint for testing

## Installation

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:3000` by default.

## API Endpoints

### Health Check
- **GET** `/health` - Check if the server is running

### Products

#### Get Products (with filtering, sorting, pagination)
- **GET** `/products`
- **Query Parameters:**
  - `sortBy` - Sort by field (`brand`, `price`, `id`) (default: `id`)
  - `sortOrder` - Sort order (`asc`, `desc`) (default: `asc`)
  - `brand` - Filter by brand name (partial match)
  - `category` - Filter by category (partial match)
  - `minPrice` - Minimum price filter
  - `maxPrice` - Maximum price filter
  - `page` - Page number (default: `1`)
  - `limit` - Items per page (default: `10`)

**Example requests:**
```bash
# Get all products
GET /products

# Get products sorted by price (descending)
GET /products?sortBy=price&sortOrder=desc

# Filter by brand and category
GET /products?brand=Apple&category=Smartphones

# Price range filtering
GET /products?minPrice=500&maxPrice=1000

# Pagination
GET /products?page=2&limit=5

# Combined filtering, sorting, and pagination
GET /products?brand=Apple&sortBy=price&sortOrder=desc&page=1&limit=3
```

**Response:**
```json
{
  "products": [...],
  "pagination": {
    "currentPage": 1,
    "totalPages": 2,
    "totalCount": 15,
    "limit": 10,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

#### Create Product
- **POST** `/products`
- **Body:** JSON object with product data
- **Required fields:** `name`, `brand`, `category`, `price`
- **Optional fields:** `description`

**Example:**
```bash
POST /products
Content-Type: application/json

{
  "name": "iPhone 16",
  "brand": "Apple",
  "category": "Smartphones",
  "price": 1099.99,
  "description": "Latest iPhone with advanced features"
}
```

#### Update Product
- **PUT** `/products/:id`
- **Body:** JSON object with fields to update

**Example:**
```bash
PUT /products/abc123
Content-Type: application/json

{
  "price": 999.99,
  "description": "Updated description"
}
```

#### Delete Product
- **DELETE** `/products/:id`

**Example:**
```bash
DELETE /products/abc123
```

### Seed Data
- **POST** `/seed` - Populate the database with 10 sample products

**Example:**
```bash
POST /seed
```

## Testing the API

### Using curl

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Seed sample data:**
   ```bash
   curl -X POST http://localhost:3000/seed
   ```

3. **Get all products:**
   ```bash
   curl http://localhost:3000/products
   ```

4. **Get products with filtering:**
   ```bash
   curl "http://localhost:3000/products?brand=Apple&sortBy=price&sortOrder=desc"
   ```

5. **Create a new product:**
   ```bash
   curl -X POST http://localhost:3000/products \
     -H "Content-Type: application/json" \
     -d '{"name":"Test Product","brand":"Test Brand","category":"Test Category","price":99.99}'
   ```

6. **Update a product:**
   ```bash
   curl -X PUT http://localhost:3000/products/PRODUCT_ID \
     -H "Content-Type: application/json" \
     -d '{"price":149.99}'
   ```

7. **Delete a product:**
   ```bash
   curl -X DELETE http://localhost:3000/products/PRODUCT_ID
   ```

### Using Postman

Import the following collection or create requests manually:

1. **Health Check:** `GET http://localhost:3000/health`
2. **Seed Data:** `POST http://localhost:3000/seed`
3. **Get Products:** `GET http://localhost:3000/products`
4. **Create Product:** `POST http://localhost:3000/products`
5. **Update Product:** `PUT http://localhost:3000/products/:id`
6. **Delete Product:** `DELETE http://localhost:3000/products/:id`

## Data Structure

Products are stored in `products.json` with the following structure:

```json
{
  "id": "unique_id",
  "name": "Product Name",
  "brand": "Brand Name",
  "category": "Category",
  "price": 99.99,
  "description": "Product description",
  "image": "https://via.placeholder.com/300x300?text=Product+Image",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request (missing required fields)
- `404` - Not Found (product doesn't exist)
- `500` - Internal Server Error

Error responses include a descriptive message:
```json
{
  "error": "Error description"
}
```

## Development

- **Node.js version:** 14.0.0 or higher
- **Dependencies:** Express, CORS, body-parser
- **Dev Dependencies:** nodemon (for auto-restart during development)

## Environment Variables

- `PORT` - Server port (default: 3000)

## File Structure

```
backend/
├── package.json          # Dependencies and scripts
├── server.js            # Main server file
├── products.json        # Product data storage (created automatically)
└── README.md           # This file
```

## License

MIT



