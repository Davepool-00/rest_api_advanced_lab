# REST API Advanced Lab

A simple Node.js + Express + MongoDB REST API with:
- JWT-based authentication (`/api/auth`)
- Protected CRUD endpoints for students (`/api/students`)

## Requirements
- Node.js (LTS recommended)
- MongoDB running locally (or a hosted MongoDB URI)

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create/update `.env` in the project root:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/Mongotest
   JWT_SECRET=your_secret_here
   ```

## Run
```bash
npm start
```
Server starts on: `http://localhost:3000`

## Test
npm start 

in another terminal
npm run demo

## API
Base URL: `http://localhost:3000`

### Auth
#### Register
`POST /api/auth/register`

Body (JSON):
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

#### Login
`POST /api/auth/login`

Body (JSON):
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

Response includes a JWT token:
```json
{
  "message": "Login successful",
  "token": "..."
}
```

### Using the token (Postman / curl)
All `/api/students/*` routes require an `Authorization` header:
```
Authorization: Bearer <token>
```

### Students (Protected)
#### Get all students
`GET /api/students`

#### Create student
`POST /api/students`

Body (JSON):
```json
{
  "name": "Juan Dela Cruz",
  "course": "BSIT"
}
```

#### Get one student
`GET /api/students/:id`

#### Update student
`PUT /api/students/:id`

Body (JSON) example:
```json
{
  "course": "BSCS"
}
```

#### Delete student
`DELETE /api/students/:id`

## Common Issues
- **MongoDB not connected**: make sure MongoDB is running and `MONGO_URI` is correct.
- **`JWT_SECRET missing in .env`**: add `JWT_SECRET` to `.env`, then restart the server.
- **403 Token missing / 401 Invalid token**: include `Authorization: Bearer <token>` from the login response.
