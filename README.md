# Wellness Application 🧘‍♀️

A full-stack wellness management application built with **Node.js + Express + MongoDB** backend and **React** frontend. Track your wellness metrics, manage bookings, and generate wellness reports.

---

## 📋 Table of Contents

- [Features](#features)
- [System Architecture](#system-architecture)
- [Core System Flow](#core-system-flow)
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
- **📅 Calendar Integration** - Google Calendar-style booking management with Month/Week/Day/Agenda views
- **Booking Management** - Schedule, reschedule, and manage wellness sessions
- **Dashboard Analytics** - View wellness trends and statistics
- **PDF Reports** - Generate wellness reports
- **Responsive UI** - React-based modern frontend
- **🆕 Personalized Recommendations** - AI-powered wellness suggestions based on assessments
- **🆕 Role-Based Access** - User and Admin roles for secure access control
- **🆕 Admin Dashboard** - Powerful admin panel for system management
- **🆕 Booking Approval System** - Admins can approve/reject bookings
- **🆕 Booking Rescheduling** - Users can reschedule existing bookings
- **🆕 System Analytics** - Comprehensive statistics and insights
- **🆕 Intelligent Insights** - Automated data analysis and trend detection
- **🆕 Feedback System** - User feedback collection for continuous improvement
- **🆕 Actionable Recommendations** - Direct integration between insights and booking actions

---

## 🏗️ System Architecture

The Wellness Application implements a sophisticated **closed-loop system** that continuously improves user wellness through intelligent data processing and personalized recommendations.

### Core Components

- **Input Layer**: Assessment collection (mood, stress, sleep)
- **Processing Layer**: Data analysis and trend calculation
- **Insight Layer**: Automated understanding of wellness patterns
- **Recommendation Layer**: Personalized action suggestions
- **Action Layer**: Direct booking integration
- **Feedback Layer**: User response measurement
- **Improvement Loop**: Continuous system learning

---

## 🔄 Core System Flow

The application follows a continuous improvement cycle:

`
User Input → Data Processing → Insights → Recommendations → Action → Feedback → Improvement
`

### Detailed Flow

1. **🧾 INPUT LAYER (Assessment Collection)**
   - User logs wellness data (mood, stress, sleep hours, notes)
   - Data stored with automatic timestamps
   - Validation ensures data quality

2. **⚙️ PROCESSING LAYER (Data Analysis)**
   - Calculates averages, trends, and patterns
   - Compares recent vs. historical data
   - Identifies correlations between wellness metrics

3. **🧠 INSIGHT LAYER (Understanding)**
   - Generates automated insights:
     - 'Stress levels have been increasing recently'
     - 'Sleep quality is below optimal levels'
     - 'Mood patterns show positive trends'

4. **🧠 RECOMMENDATION LAYER (Decision Making)**
   - Creates personalized recommendations based on insights
   - Considers user history and trends
   - Prioritizes high-impact suggestions

5. **📅 ACTION LAYER (User Engagement)**
   - Direct integration with booking system
   - One-click actions from recommendations
   - Seamless user experience flow

6. **🔁 FEEDBACK LAYER (Measurement)**
   - Collects user ratings on recommendations
   - Tracks action completion
   - Measures effectiveness of suggestions

7. **📈 IMPROVEMENT LOOP (Learning)**
   - Uses feedback to refine algorithms
   - Adapts recommendations based on success rates
   - Continuous system optimization

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

`ash
node --version      # Should be v14+
npm --version       # Should be v6+
mongod --version    # Should show version
`

---

## 📁 Project Structure

├── wellness-backend/          # Backend server (Node.js + Express)
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js       # Auth logic
│   │   ├── assessmentController.js # Assessment logic
│   │   ├── bookingController.js    # Booking logic
│   │   ├── dashboardController.js  # Dashboard logic
│   │   ├── recommendationController.js # 🆕 Recommendation logic
│   │   ├── feedbackController.js   # 🆕 Feedback system
│   │   └── reportController.js     # Report generation
│   ├── models/
│   │   ├── User.js           # User schema
│   │   ├── Assessment.js     # Assessment schema
│   │   ├── Booking.js        # Booking schema
│   │   └── Feedback.js       # 🆕 Feedback schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── assessmentRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── dashboardRoutes.js
│   │   ├── recommendationRoutes.js # 🆕 Recommendation routes
│   │   ├── feedbackRoutes.js # 🆕 Feedback routes
│   │   └── reportRoutes.js
│   ├── middleware/
│   │   ├── adminMiddleware.js # Admin role verification
│   │   └── authMiddleware.js # JWT verification
│   ├── .env                  # Environment variables
│   ├── .gitignore
│   ├── package.json
│   ├── server.js             # Main server file
│   ├── Wellness-API-Postman.json  # Postman collection
│   ├── POSTMAN_SETUP.md      # Postman guide
│   ├── CALENDAR_SETUP.md     # 🆕 Calendar integration guide
│   └── ADMIN_SETUP.md        # Admin setup guide
│
├── wellness-frontend/         # Frontend (React)
│   ├── public/               # Static files
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── Sidebar.js
│   │   │   ├── ChartComponent.js
│   │   │   ├── CalendarComponent.js    # 🆕 Calendar integration
│   │   │   ├── RecommendationComponent.js # 🆕 AI recommendations
│   │   │   └── RescheduleModal.js      # 🆕 Booking rescheduling
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Assessment.js
│   │   │   └── Booking.js
│   │   ├── services/
│   │   │   └── api.js        # API client
│   │   ├── styles/
│   │   │   ├── CalendarComponent.css   # 🆕 Calendar styling
│   │   │   ├── RecommendationComponent.css # 🆕 Recommendation styling
│   │   │   └── RescheduleModal.css     # 🆕 Modal styling
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── .gitignore
│   ├── package.json
│   └── README.md

---

## 🚀 Installation

### Step 1: Clone the Repository

`ash
git clone https://github.com/your-username/wellness-app.git
cd wellness-app
`

### Step 2: Install Backend Dependencies

`ash
cd wellness-backend
npm install
`

### Step 3: Install Frontend Dependencies

`ash
cd ../wellness-frontend
npm install
`

### Step 4: Set Up Environment Variables

Create a .env file in the wellness-backend directory:

`env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/wellness
JWT_SECRET=your-super-secret-jwt-key-here
`

### Step 5: Start MongoDB

Make sure MongoDB is running on your system:

`ash
# On Windows
net start MongoDB

# On macOS
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
`

---

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | mongodb://127.0.0.1:27017/wellness |
| JWT_SECRET | JWT signing secret | Required |

### Database Setup

The application will automatically create collections when first run. No manual database setup required.

---

## 🏃 Running the Application

### Development Mode

1. **Start Backend:**
   `ash
   cd wellness-backend
   npm run dev
   `

2. **Start Frontend:**
   `ash
   cd wellness-frontend
   npm start
   `

3. **Access Application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Production Mode

`ash
# Backend
cd wellness-backend
npm start

# Frontend (build and serve)
cd wellness-frontend
npm run build
npm install -g serve
serve -s build -l 3000
`

---

## 📚 API Documentation

### Authentication Endpoints
- POST /api/auth/register - User registration
- POST /api/auth/login - User login

### Assessment Endpoints
- POST /api/assessment/add - Add new assessment
- GET /api/assessment/user/:userId - Get user assessments
- GET /api/assessment/insights/:userId - Get processed insights

### Recommendation Endpoints
- GET /api/recommendation - Get personalized recommendations

### Booking Endpoints
- POST /api/booking/create - Create new booking
- GET /api/booking/user/:userId - Get user bookings
- PUT /api/booking/update/:id - Update booking
- DELETE /api/booking/delete/:id - Delete booking

### Feedback Endpoints
- POST /api/feedback/add - Submit feedback
- GET /api/feedback/user - Get user feedback
- GET /api/feedback/stats - Get feedback statistics

---

## 🧪 Testing with Postman

1. Import the Wellness-API-Postman.json collection
2. Set up environment variables in Postman
3. Test authentication first, then other endpoints

See POSTMAN_SETUP.md for detailed instructions.

---

## 🔧 Troubleshooting

### Common Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- Verify network connectivity

**Port Already in Use:**
- Change PORT in .env
- Kill process using the port

**CORS Errors:**
- Backend allows all origins by default
- Check browser console for details

**JWT Token Issues:**
- Ensure JWT_SECRET is set
- Check token expiration (24 hours)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📞 Support

For support, email support@wellness-app.com or create an issue in the repository.
