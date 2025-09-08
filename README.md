## Setup
Install dependencies

In the root: npm i

In /server: npm i

In /client: npm i

Environment variables

Create /server/.env with:

PORT=4000

MONGODB_URI=mongodb://localhost:27017/flex_reviews

HOSTAWAY_TOKEN=your_hostaway_api_token

Create /client/.env with:

VITE_API_URL=http://localhost:4000

## Run
Start backend (from /server): npm run dev

Start frontend (from /client): npm run dev

The frontend proxies /api to the backend in dev.

Tests (frontend)
From /client:

npm run test (watch)

npm run test:run (single)

npm run test:ui (browser UI)

## Useful endpoints
GET /api/reviews

GET /api/reviews/listings

GET /api/reviews/trend

PATCH /api/reviews/:id

POST /api/reviews/:id/approve

GET /api/hostaway