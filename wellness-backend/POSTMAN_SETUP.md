# Wellness API - Postman Setup Guide

## Quick Start

### 1. Import the Collection
1. Open **Postman**
2. Click **File** → **Import**
3. Select `Wellness-API-Postman.json` from the `wellness-backend` folder
4. The collection will be imported with all endpoints and environment variables

### 2. Set Environment Variables
In the collection variables, update:
- `BASE_URL`: `http://localhost:5000` (already set)
- `TOKEN`: Will be populated after login
- `USER_ID`: Your user ID from registration
- `BOOKING_ID`: ID of a booking (for update/delete operations)

### 3. API Workflow

#### Step 1: Register a User
**Endpoint**: `POST /api/auth/register`

Body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response: User created successfully

#### Step 2: Login User
**Endpoint**: `POST /api/auth/login`

Body:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response: 
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "60d5ec49c1234567890abcd",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Action**: Copy the `token` and `user.id` and set them as `TOKEN` and `USER_ID` environment variables in Postman

#### Step 3: Add Assessment
**Endpoint**: `POST /api/assessment/add`

Headers:
- `Authorization`: `Bearer {{TOKEN}}`

Body:
```json
{
  "userId": "{{USER_ID}}",
  "mood": "Happy",
  "stressLevel": 5,
  "sleepHours": 8,
  "notes": "Feeling great today!"
}
```

#### Step 4: Create Booking
**Endpoint**: `POST /api/booking/create`

Headers:
- `Authorization`: `Bearer {{TOKEN}}`

Body:
```json
{
  "userId": "{{USER_ID}}",
  "sessionType": "Meditation",
  "date": "2026-04-25",
  "notes": "Morning session preferred"
}
```

#### Step 5: Get Dashboard Data
**Endpoint**: `GET /api/dashboard`

Headers:
- `Authorization`: `Bearer {{TOKEN}}`

#### Step 6: Generate PDF Report
**Endpoint**: `GET /api/report`

Headers:
- `Authorization`: `Bearer {{TOKEN}}`

This will download a PDF wellness report

---

## API Endpoints Summary

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Assessments
- `POST /api/assessment/add` - Add new assessment
- `GET /api/assessment/all` - Get all assessments
- `GET /api/assessment/user/:userId` - Get user's assessments

### Bookings
- `POST /api/booking/create` - Create booking
- `GET /api/booking/all` - Get user's bookings
- `PUT /api/booking/update/:id` - Update booking
- `DELETE /api/booking/delete/:id` - Cancel booking

### Dashboard
- `GET /api/dashboard` - Get dashboard analytics

### Reports
- `GET /api/report` - Generate PDF report

---

## Important Notes

1. **Authentication**: All protected endpoints require `Authorization: Bearer {{TOKEN}}` header
2. **Token Format**: Use `Bearer <token>` format (space between Bearer and token)
3. **Environment Variables**: Set these after first login to avoid manual copying
4. **Database**: Make sure MongoDB is running before starting the server
5. **CORS**: Backend allows requests from frontend (http://localhost:3000 by default)

---

## Troubleshooting

**Issue**: "No token provided"
- **Solution**: Make sure you're including the `Authorization` header with `Bearer {{TOKEN}}`

**Issue**: "Invalid token"
- **Solution**: Re-login to get a fresh token

**Issue**: "User not found" during login
- **Solution**: Register first before attempting login

**Issue**: MongoDB connection error
- **Solution**: Ensure MongoDB is running locally or update `MONGODB_URI` in `.env`

---

## Testing the Full Flow

1. Register new user
2. Login and copy token + user ID
3. Add assessment (requires token)
4. Create booking (requires token)
5. Get dashboard data (requires token)
6. Generate report (requires token)

All endpoints are now ready for integration with the frontend!
