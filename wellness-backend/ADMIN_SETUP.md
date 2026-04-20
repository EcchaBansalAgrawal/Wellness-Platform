# Admin Dashboard Setup & Guide 👨‍💼

This guide explains how to set up and use the Admin features in the Wellness application.

---

## 🔑 Overview

The Wellness application now features **Role-Based Access Control** with two roles:

- **User** - Regular users who can track assessments and book sessions
- **Admin** - Administrators who can manage users, approve bookings, and view system analytics

---

## 🚀 Setting Up Admin Users

### Step 1: Create an Admin User (Via Database)

Since there's no default admin creation endpoint, you can create an admin user directly in MongoDB:

**Using MongoDB Compass or MongoDB Atlas:**

1. Connect to your MongoDB instance
2. Navigate to `wellness` database → `users` collection
3. Insert a new document:

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "$2b$10$...", // Use bcrypt hashed password
  "role": "Admin",
  "createdAt": new Date(),
  "updatedAt": new Date()
}
```

**Or using Postman/terminal:**

```bash
# First register a normal user
POST http://localhost:5000/api/auth/register
{
  "name": "Admin User",
  "email": "admin@wellness.com",
  "password": "admin123"
}

# Then update the role in MongoDB directly to "Admin"
```

### Step 2: Get Admin Token

Login with your admin account:

```bash
POST http://localhost:5000/api/auth/login

{
  "email": "admin@wellness.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Admin User",
    "email": "admin@wellness.com",
    "role": "Admin"
  }
}
```

**Save this token for admin API calls.**

---

## 📡 Admin API Endpoints

### Base URL
```
http://localhost:5000/api/admin
```

All endpoints require **Admin Authentication** via Bearer token.

### Header Format
```
Authorization: Bearer {ADMIN_TOKEN}
Content-Type: application/json
```

---

## 👥 User Management

### 1️⃣ Get All Users

View all registered users in the system.

```
GET /api/admin/users
Authorization: Bearer {ADMIN_TOKEN}
```

**Response:**
```json
{
  "message": "All users retrieved successfully",
  "total": 5,
  "users": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "age": 28,
      "gender": "Male",
      "role": "User",
      "createdAt": "2026-04-20T10:00:00Z",
      "updatedAt": "2026-04-20T10:00:00Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Admin User",
      "email": "admin@wellness.com",
      "role": "Admin",
      "createdAt": "2026-04-20T09:00:00Z",
      "updatedAt": "2026-04-20T09:00:00Z"
    }
  ]
}
```

### 2️⃣ Get User Details

View detailed information about a specific user including their assessments and bookings.

```
GET /api/admin/users/{userId}
Authorization: Bearer {ADMIN_TOKEN}
```

**Response:**
```json
{
  "message": "User details retrieved",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "User"
  },
  "assessmentCount": 3,
  "bookingCount": 2,
  "assessments": [
    {
      "_id": "507f2f77bcf86cd799439021",
      "mood": "Happy",
      "stressLevel": 5,
      "sleepHours": 8,
      "notes": "Feeling good today"
    }
  ],
  "bookings": [
    {
      "_id": "507f3f77bcf86cd799439031",
      "sessionType": "Meditation",
      "date": "2026-04-25",
      "status": "Confirmed",
      "approvalStatus": "Approved"
    }
  ]
}
```

### 3️⃣ Update User Role

Change a user's role between "User" and "Admin".

```
PUT /api/admin/users/{userId}/role
Authorization: Bearer {ADMIN_TOKEN}
Content-Type: application/json

{
  "role": "Admin"
}
```

**Allowed roles:** `"User"`, `"Admin"`

---

## 📅 Booking Management

### 1️⃣ Get All Bookings

View all bookings in the system with approval statuses.

```
GET /api/admin/bookings
Authorization: Bearer {ADMIN_TOKEN}
```

**Response:**
```json
{
  "message": "All bookings retrieved successfully",
  "total": 10,
  "bookings": [
    {
      "_id": "507f3f77bcf86cd799439031",
      "userId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "sessionType": "Meditation",
      "date": "2026-04-25T10:00:00Z",
      "status": "Pending",
      "approvalStatus": "Pending",
      "notes": "Morning session preferred"
    }
  ]
}
```

### 2️⃣ Approve Booking

Approve a pending booking.

```
PUT /api/admin/bookings/{bookingId}/approve
Authorization: Bearer {ADMIN_TOKEN}
```

**Response:**
```json
{
  "message": "Booking approved successfully",
  "booking": {
    "_id": "507f3f77bcf86cd799439031",
    "userId": {
      "name": "John Doe",
      "email": "john@example.com"
    },
    "sessionType": "Meditation",
    "date": "2026-04-25T10:00:00Z",
    "status": "Confirmed",
    "approvalStatus": "Approved",
    "approvedBy": {
      "name": "Admin User",
      "email": "admin@wellness.com"
    }
  }
}
```

### 3️⃣ Reject Booking

Reject a pending booking with a reason.

```
PUT /api/admin/bookings/{bookingId}/reject
Authorization: Bearer {ADMIN_TOKEN}
Content-Type: application/json

{
  "reason": "Trainer not available on this date"
}
```

**Response:**
```json
{
  "message": "Booking rejected successfully",
  "booking": {
    "_id": "507f3f77bcf86cd799439031",
    "status": "Cancelled",
    "approvalStatus": "Rejected",
    "notes": "Trainer not available on this date"
  }
}
```

---

## 📊 System Analytics

### Get System Analytics

View comprehensive statistics about the entire system.

```
GET /api/admin/analytics
Authorization: Bearer {ADMIN_TOKEN}
```

**Response:**
```json
{
  "message": "System analytics retrieved successfully",
  "statistics": {
    "users": {
      "total": 15,
      "admins": 2,
      "regular": 13
    },
    "bookings": {
      "total": 25,
      "pending": 5,
      "approved": 15,
      "rejected": 5
    },
    "assessments": {
      "total": 42,
      "averageStress": 6.2,
      "moodDistribution": {
        "Happy": 15,
        "Neutral": 18,
        "Anxious": 7,
        "Sad": 2
      }
    },
    "bookingsByStatus": {
      "pending": 3,
      "confirmed": 18,
      "completed": 3,
      "cancelled": 1
    }
  },
  "recentActivity": {
    "recentUsers": [ /* 5 most recent users */ ],
    "recentBookings": [ /* 5 most recent bookings */ ]
  }
}
```

---

## 🧪 Testing in Postman

### Step 1: Create Admin Requests

Create a new folder in Postman called **"Admin Endpoints"**.

### Step 2: Set Environment Variables

Add to your Postman environment:

```
{
  "ADMIN_TOKEN": "eyJhbGciOiJIUzI1NiIs...",
  "ADMIN_BASE_URL": "http://localhost:5000/api/admin",
  "USER_ID": "507f1f77bcf86cd799439011",
  "BOOKING_ID": "507f3f77bcf86cd799439031"
}
```

### Step 3: Create Sample Requests

**Get All Users:**
```
GET {{ADMIN_BASE_URL}}/users
Authorization: Bearer {{ADMIN_TOKEN}}
```

**Approve Booking:**
```
PUT {{ADMIN_BASE_URL}}/bookings/{{BOOKING_ID}}/approve
Authorization: Bearer {{ADMIN_TOKEN}}
```

**Get Analytics:**
```
GET {{ADMIN_BASE_URL}}/analytics
Authorization: Bearer {{ADMIN_TOKEN}}
```

---

## 🔐 Security Notes

⚠️ **Important:**

1. **Admin Role Assignment** - Currently, you must update the role directly in the database for security
2. **Token Security** - Admin tokens are powerful, keep them secure and regenerate them regularly
3. **Audit Trail** - The `approvedBy` field tracks which admin approved/rejected bookings
4. **Password Security** - Ensure admin passwords are strong and unique
5. **Access Control** - Only use admin endpoints from secure servers/applications

---

## 🛠️ Troubleshooting

### Issue: "Access denied: Admin privileges required"

**Solution:**
- Verify your token belongs to an admin user
- Login with admin credentials and get a new token
- Check user's role in database is set to "Admin"

### Issue: "Invalid token" error

**Solution:**
- Ensure token hasn't expired (24 hour expiry)
- Re-login to get fresh token
- Verify JWT_SECRET in .env file

### Issue: Admin endpoints not found

**Solution:**
- Verify server.js includes admin routes
- Check server restarted after file changes
- Ensure no typos in endpoint URLs

---

## 📝 Admin Workflow Example

**Typical admin workflow:**

1. ✅ Login as admin → Get admin token
2. 📊 Check analytics → See system status
3. 👥 Review all users → Monitor user growth
4. 📅 View pending bookings → Review approval queue
5. ✔️ Approve/Reject bookings → Manage sessions
6. 👤 View user details → Analyze user activity

---

## 🎯 Admin Features Summary

| Feature | Endpoint | Purpose |
|---------|----------|---------|
| View All Users | GET /admin/users | Monitor user base |
| View User Details | GET /admin/users/{id} | Check user history |
| Update User Role | PUT /admin/users/{id}/role | Promote to admin |
| View All Bookings | GET /admin/bookings | Review sessions |
| Approve Booking | PUT /admin/bookings/{id}/approve | Confirm session |
| Reject Booking | PUT /admin/bookings/{id}/reject | Decline session |
| View Analytics | GET /admin/analytics | System insights |

---

**Admin Dashboard Guide Complete! 🚀**

For questions or issues, check the main README.md or review the API documentation.
