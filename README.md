# Wellness Application 🧘‍♀️

A full-stack wellness management application built with **Node.js + Express + MongoDB** backend and **React** frontend. Track your wellness metrics, manage bookings, and generate wellness reports.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing with Postman](#testing-with-postman)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## ✨ Features

- **User Authentication** - Secure registration and login with JWT tokens
- **Assessment Tracking** - Log mood, stress levels, and sleep data
- **Booking Management** - Schedule and manage wellness sessions
- **Dashboard Analytics** - View wellness trends and statistics
- **PDF Reports** - Generate wellness reports
- **Responsive UI** - React-based modern frontend
- **RESTful API** - Complete API with authentication
- **🆕 Role-Based Access** - User and Admin roles for secure access control
- **🆕 Admin Dashboard** - Powerful admin panel for system management
- **🆕 Booking Approval System** - Admins can approve/reject bookings
- **🆕 System Analytics** - Comprehensive statistics and insights

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **bcrypt** - Password hashing
- **JWT** - Authentication tokens
- **PDFKit** - PDF generation
- **CORS** - Cross-origin support

### Frontend
- **React** - UI library
- **Axios** - HTTP client
- **React Router** - Navigation
- **Recharts** - Data visualization
- **CSS** - Styling

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (Local or MongoDB Atlas) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)
- **Postman** (optional, for API testing) - [Download](https://www.postman.com/downloads/)

### Verify Installation

```bash
node --version      # Should be v14+
npm --version       # Should be v6+
mongod --version    # Should show version
```

---

## 📁 Project Structure

```
Wellness/
├── wellness-backend/          # Backend server (Node.js + Express)
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js       # Auth logic
│   │   ├── assessmentController.js # Assessment logic
│   │   ├── bookingController.js    # Booking logic
│   │   ├── dashboardController.js  # Dashboard logic
│   │   └── reportController.js     # Report generation
│   ├── models/
│   │   ├── User.js           # User schema
│   │   ├── Assessment.js     # Assessment schema
│   │   └── Booking.js        # Booking schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── assessmentRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── reportRoutes.js
│   ├── middleware/
│   │   └── authMiddleware.js # JWT verification
│   ├── .env                  # Environment variables
│   ├── .gitignore
│   ├── package.json
│   ├── server.js             # Main server file
│   ├── Wellness-API-Postman.json  # Postman collection
│   └── POSTMAN_SETUP.md      # Postman guide
│
├── wellness-frontend/         # Frontend (React)
│   ├── public/               # Static files
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Sidebar.js
│   │   │   └── ChartComponent.js
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Assessment.js
│   │   │   └── Booking.js
│   │   ├── services/
│   │   │   └── api.js        # API client
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── .gitignore
│   ├── package.json
│   └── README.md
│
└── README.md                 # This file
```

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd Wellness
```

### Step 2: Install Backend Dependencies

```bash
cd wellness-backend
npm install
```

Expected output should show:
```
added 165 packages in X seconds
```

### Step 3: Install Frontend Dependencies

```bash
cd ../wellness-frontend
npm install
```

Expected output should show:
```
added 1XX packages in X seconds
```

---

## ⚙️ Configuration

### Step 1: Create Backend Environment File

Navigate to `wellness-backend` folder and create `.env` file:

```bash
cd wellness-backend
```

Create file `.env` with:

```env
# MongoDB Connection
MONGODB_URI=mongodb://127.0.0.1:27017/wellness

# Server Configuration
PORT=5000

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### Step 2: Start MongoDB

**Option A: Local MongoDB**

```bash
mongod
```

Keep this running in a separate terminal.

**Option B: MongoDB Atlas (Cloud)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a cluster
4. Get connection string
5. Update `.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wellness
```

---

## ▶️ Running the Application

### Terminal 1: Start Backend Server

```bash
cd wellness-backend
npm start
```

Expected output:
```
[nodemon] starting `node server.js`
Server running on port 5000
MongoDB Connected
```

### Terminal 2: Start Frontend Server

```bash
cd wellness-frontend
npm start
```

Expected output:
```
Compiled successfully!

You can now view wellness-frontend in the browser.

  Local:            http://localhost:3001
```

### Step 3: Open in Browser

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:5000

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```
POST /auth/register
Content-Type: application/json

Request Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response: 201 Created
{
  "message": "User registered successfully"
}
```

#### Login User
```
POST /auth/login
Content-Type: application/json

Request Body:
{
  "email": "john@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Assessment Endpoints

#### Add Assessment
```
POST /assessment/add
Authorization: Bearer {TOKEN}
Content-Type: application/json

Request Body:
{
  "userId": "507f1f77bcf86cd799439011",
  "mood": "Happy",
  "stressLevel": 5,
  "sleepHours": 8,
  "notes": "Feeling great!"
}

Response: 201 Created
{
  "message": "Assessment saved",
  "data": { assessment object }
}
```

#### Get All Assessments
```
GET /assessment/all

Response: 200 OK
[ { assessment objects } ]
```

#### Get User Assessments
```
GET /assessment/user/:userId

Response: 200 OK
[ { user's assessment objects } ]
```

### Booking Endpoints

#### Create Booking
```
POST /booking/create
Authorization: Bearer {TOKEN}
Content-Type: application/json

Request Body:
{
  "userId": "507f1f77bcf86cd799439011",
  "sessionType": "Meditation",
  "date": "2026-04-25",
  "notes": "Morning session preferred"
}

Response: 201 Created
{
  "message": "Booking confirmed successfully",
  "booking": { booking object }
}
```

#### Get User Bookings
```
GET /booking/all
Authorization: Bearer {TOKEN}

Response: 200 OK
[ { bookings array } ]
```

#### Update Booking
```
PUT /booking/update/:id
Authorization: Bearer {TOKEN}
Content-Type: application/json

Request Body:
{
  "status": "Confirmed",
  "notes": "Updated notes"
}

Response: 200 OK
{
  "message": "Booking updated",
  "updatedBooking": { booking object }
}
```

#### Delete Booking
```
DELETE /booking/delete/:id
Authorization: Bearer {TOKEN}

Response: 200 OK
{
  "message": "Booking deleted successfully"
}
```

### Dashboard Endpoint

#### Get Dashboard Data
```
GET /dashboard
Authorization: Bearer {TOKEN}

Response: 200 OK
{
  "latest": { latest assessment },
  "averageStress": 6.2,
  "trend": [ trend data array ],
  "totalAssessments": 3
}
```

### Report Endpoint

#### Generate PDF Report
```
GET /report
Authorization: Bearer {TOKEN}

Response: 200 OK
(Downloads PDF file with wellness report)
```

### 🆕 Admin Endpoints

**Requires Admin Role - See [ADMIN_SETUP.md](wellness-backend/ADMIN_SETUP.md) for detailed instructions**

#### Get All Users
```
GET /admin/users
Authorization: Bearer {ADMIN_TOKEN}

Response: 200 OK
{
  "total": 15,
  "users": [ { user objects } ]
}
```

#### Get All Bookings
```
GET /admin/bookings
Authorization: Bearer {ADMIN_TOKEN}

Response: 200 OK
{
  "total": 25,
  "bookings": [ { booking objects with approval status } ]
}
```

#### Approve Booking
```
PUT /admin/bookings/:bookingId/approve
Authorization: Bearer {ADMIN_TOKEN}

Response: 200 OK
{
  "message": "Booking approved successfully",
  "booking": { updated booking object }
}
```

#### Reject Booking
```
PUT /admin/bookings/:bookingId/reject
Authorization: Bearer {ADMIN_TOKEN}
Content-Type: application/json

Request Body:
{
  "reason": "Trainer not available"
}

Response: 200 OK
{
  "message": "Booking rejected successfully",
  "booking": { updated booking object }
}
```

#### Get System Analytics
```
GET /admin/analytics
Authorization: Bearer {ADMIN_TOKEN}

Response: 200 OK
{
  "statistics": {
    "users": { total, admins, regular },
    "bookings": { total, pending, approved, rejected },
    "assessments": { total, averageStress, moodDistribution }
  },
  "recentActivity": { recentUsers, recentBookings }
}
```

---

## 🧪 Testing with Postman

### Step 1: Import Postman Collection

1. Open **Postman**
2. Click **File** → **Import**
3. Select `wellness-backend/Wellness-API-Postman.json`

### Step 2: Set Environment Variables

In Postman collection, set variables:
- `BASE_URL` = `http://localhost:5000`
- `TOKEN` = (obtained after login)
- `USER_ID` = (obtained after login)
- `BOOKING_ID` = (obtained after creating booking)

### Step 3: Test Workflow

1. **Register User** → POST `/api/auth/register`
2. **Login User** → POST `/api/auth/login` (save token & user ID)
3. **Add Assessment** → POST `/api/assessment/add`
4. **Create Booking** → POST `/api/booking/create`
5. **Get Dashboard** → GET `/api/dashboard`
6. **Generate Report** → GET `/api/report`

---

## �‍💼 Admin Dashboard Setup

### Quick Start

1. **Create Admin User** - Update any user's role to "Admin" in MongoDB:
   ```json
   db.users.updateOne(
     { email: "your@email.com" },
     { $set: { role: "Admin" } }
   )
   ```

2. **Login as Admin** - Login with admin credentials to get admin token

3. **Access Admin Features** - Use admin token to access `/api/admin/*` endpoints

### Admin Capabilities

✅ View all users in the system  
✅ View user details and history  
✅ View all bookings  
✅ Approve or reject pending bookings  
✅ View system-wide analytics and statistics  
✅ Promote users to admin role  

### Full Admin Guide

See **[ADMIN_SETUP.md](wellness-backend/ADMIN_SETUP.md)** for:
- Detailed admin setup instructions
- Complete admin API documentation
- Admin workflow examples
- Postman admin collections

---

## �🔧 Troubleshooting

### Issue: Port 3000/3001 Already in Use

**Solution:**
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with process ID)
taskkill /PID <PID> /F

# Or change frontend port:
PORT=3002 npm start
```

### Issue: MongoDB Connection Failed

**Solution:**
```bash
# Start MongoDB service
mongod

# Or verify connection string in .env
# Check MongoDB Atlas credentials if using cloud
```

### Issue: "Cannot find module" Error

**Solution:**
```bash
# Reinstall dependencies
npm install

# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: Token Invalid/Expired

**Solution:**
1. Re-login to get fresh token
2. Copy new token to Postman environment variables
3. Use format: `Bearer <token>` in Authorization header

### Issue: Frontend Shows Blank Page

**Solution:**
1. Check browser console (F12) for errors
2. Verify backend is running on port 5000
3. Check network tab to see API calls
4. Clear browser cache and refresh

### Issue: CORS Errors

**Solution:**
1. Ensure backend is running
2. Check that frontend is on correct port
3. Verify CORS middleware in server.js includes frontend URL

---

## 📝 Environment Variables

### Backend (.env)

```env
# Database Connection
MONGODB_URI=mongodb://127.0.0.1:27017/wellness

# Server Configuration
PORT=5000

# Security
JWT_SECRET=your_secret_key_here
```

---

## 🔐 Security Notes

⚠️ **Production Checklist:**

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Use MongoDB Atlas with strong credentials
- [ ] Enable HTTPS
- [ ] Set `NODE_ENV=production`
- [ ] Configure CORS for your domain
- [ ] Add rate limiting
- [ ] Enable input validation
- [ ] Use environment variables for all secrets
- [ ] Set secure HTTP headers
- [ ] Add logging and monitoring

---

## 📚 Backend Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| express | ^5.2.1 | Web framework |
| mongoose | ^7.7.1 | MongoDB ODM |
| bcrypt | ^6.0.0 | Password hashing |
| jsonwebtoken | ^9.0.3 | JWT tokens |
| cors | ^2.8.6 | CORS support |
| dotenv | ^17.4.2 | Environment variables |
| pdfkit | ^0.18.0 | PDF generation |
| nodemon | ^3.1.14 | Development server |

## 📚 Frontend Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | ^19.2.5 | UI library |
| react-dom | ^19.2.5 | DOM rendering |
| react-router-dom | ^7.14.1 | Navigation |
| axios | ^1.15.1 | HTTP client |
| recharts | ^3.8.1 | Charts/graphs |
| react-scripts | 5.0.1 | Build tools |

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

For issues and questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review API documentation in `wellness-backend/POSTMAN_SETUP.md`
3. Check backend logs for error messages
4. Verify all services are running (MongoDB, Backend, Frontend)

---

## 🎯 Quick Reference - Start Everything

**3 Separate Terminals:**

**Terminal 1: MongoDB**
```bash
mongod
```

**Terminal 2: Backend**
```bash
cd wellness-backend
npm start
```

**Terminal 3: Frontend**
```bash
cd wellness-frontend
npm start
```

Then open browser: **http://localhost:3001**

---

## 📊 Database Collections

MongoDB automatically creates these collections:

- `users` - User accounts and profiles
- `assessments` - Wellness assessment records
- `bookings` - Session bookings and reservations

---

**Made with ❤️ for Wellness** ✨
