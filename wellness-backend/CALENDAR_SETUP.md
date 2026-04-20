# 📅 Calendar Integration Guide

A complete Google Calendar-style calendar interface for managing wellness bookings with rescheduling capabilities.

---

## 🎯 Overview

The Wellness application now features a professional calendar view where users can:

- ✅ View all their wellness sessions in a calendar format
- ✅ Switch between Month, Week, Day, and Agenda views
- ✅ Create new bookings by clicking on calendar dates
- ✅ Reschedule existing bookings with new dates
- ✅ Track booking approval status with color indicators
- ✅ See booking details at a glance

---

## 🌟 Features

### Calendar Views

1. **Month View** - Overview of all bookings for the month
2. **Week View** - Detailed view of bookings for the current week
3. **Day View** - Single day agenda with hourly breakdown
4. **Agenda View** - List view of upcoming bookings

### Event Colors

Calendar events are color-coded by approval status:

- 🟦 **Blue** - Default (Pending approval)
- 🟩 **Green** - Approved booking
- 🟥 **Red** - Rejected booking
- 🟨 **Yellow** - Pending approval

### Quick Actions

- Click any booking to view details
- Click "Reschedule" to change date/time
- Click "Delete" to remove a booking
- Click empty calendar slot to create new booking

---

## 📱 User Interface

### Calendar Component

```
┌─────────────────────────────────────────┐
│  📅 Wellness Session Calendar           │
│                      [+ New Booking]    │
├─────────────────────────────────────────┤
│  [Month] [Week] [Day] [Agenda]          │
│  April 2026                              │
├─────────────────────────────────────────┤
│  Mo Tu We Th Fr Sa Su                   │
│  ... 14 15 16 17 18 19                  │
│  20 [📍Meditation] 22 23 24 25 26       │
│     (Green - Approved)                  │
└─────────────────────────────────────────┘
```

### Booking Card

```
┌─────────────────────────────┐
│ Meditation      [Approved]  │
├─────────────────────────────┤
│ 📅 Date: Apr 20, 2026       │
│ ⏰ Time: 10:00 AM           │
│ 📝 Status: Confirmed        │
│ 📄 Notes: Morning session   │
├─────────────────────────────┤
│ [🔄 Reschedule] [🗑️ Delete] │
└─────────────────────────────┘
```

### Reschedule Modal

```
┌──────────────────────────────────┐
│ Reschedule Session           [×] │
├──────────────────────────────────┤
│ Meditation                       │
│ Current: Apr 20, 2026 at 10:00   │
│ Status: Approved                 │
│                                  │
│ New Date:      [2026-04-25]      │
│ New Time:      [14:30]           │
│ Notes:         [...]             │
│                                  │
│ Preview: Fri Apr 25, 2:30 PM    │
├──────────────────────────────────┤
│              [Cancel] [Reschedule]
└──────────────────────────────────┘
```

---

## 🚀 How to Use

### 1. View Calendar

Navigate to the **Booking** page to see your calendar:

```
Left Sidebar → Booking → Calendar View
```

### 2. Create New Booking

**Option A: Click on Calendar Date**
```
1. Click on any empty date in the calendar
2. Form appears to create a booking
3. Select session type
4. Confirm date
5. Add optional notes
6. Click "Create Booking"
```

**Option B: Use New Booking Button**
```
1. Click "+ New Booking" button
2. Form expands below calendar
3. Fill in all fields
4. Click "Create Booking"
```

### 3. Reschedule Booking

```
1. Click on a booking card
2. Click "🔄 Reschedule" button
3. Modal opens with current details
4. Select new date and time
5. Update notes if needed
6. Preview new schedule
7. Click "Reschedule" to confirm
```

### 4. Delete Booking

```
1. Find booking in calendar or cards
2. Click "🗑️ Delete" button
3. Confirm deletion in popup
4. Booking removed from calendar
```

### 5. Switch Calendar Views

```
Click view buttons in calendar header:
[Month] [Week] [Day] [Agenda]
```

---

## 🔧 Backend API Endpoints

### Create Booking

```
POST /api/booking/create
Authorization: Bearer {TOKEN}
Content-Type: application/json

{
  "sessionType": "Meditation",
  "date": "2026-04-25T10:00:00Z",
  "notes": "Morning session"
}

Response: 201 Created
{
  "message": "Booking confirmed successfully",
  "booking": { booking object }
}
```

### Get All Bookings

```
GET /api/booking/all
Authorization: Bearer {TOKEN}

Response: 200 OK
[ { booking objects array } ]
```

### Reschedule Booking ⭐ NEW

```
PUT /api/booking/reschedule/:bookingId
Authorization: Bearer {TOKEN}
Content-Type: application/json

{
  "date": "2026-04-25T14:30:00Z",
  "notes": "Updated notes (optional)"
}

Response: 200 OK
{
  "message": "Booking rescheduled successfully",
  "booking": { updated booking object }
}
```

### Update Booking

```
PUT /api/booking/update/:bookingId
Authorization: Bearer {TOKEN}
Content-Type: application/json

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

### Delete Booking

```
DELETE /api/booking/delete/:bookingId
Authorization: Bearer {TOKEN}

Response: 200 OK
{
  "message": "Booking deleted successfully"
}
```

---

## 📊 Booking Status Lifecycle

```
Created
   ↓
Pending (Approval) ─→ 🟨 Yellow in Calendar
   ↓ (Admin approves)
Approved ───────────→ 🟩 Green in Calendar
   ↓ (Session happens)
Completed ──────────→ 🟦 Gray in Calendar

OR

Pending (Approval) ─→ 🟨 Yellow in Calendar
   ↓ (Admin rejects)
Rejected ───────────→ 🟥 Red in Calendar
   ↓ (Cancelled)
Cancelled
```

---

## 🧪 Testing in Postman

### Create Test Booking

```
POST http://localhost:5000/api/booking/create
Authorization: Bearer {YOUR_TOKEN}
Content-Type: application/json

{
  "sessionType": "Meditation",
  "date": "2026-04-25T10:00:00Z",
  "notes": "Morning meditation session"
}
```

### Reschedule Test Booking

```
PUT http://localhost:5000/api/booking/reschedule/{BOOKING_ID}
Authorization: Bearer {YOUR_TOKEN}
Content-Type: application/json

{
  "date": "2026-04-26T14:00:00Z",
  "notes": "Changed to afternoon session"
}
```

### Get All Bookings

```
GET http://localhost:5000/api/booking/all
Authorization: Bearer {YOUR_TOKEN}
```

---

## 💾 Frontend Components

### CalendarComponent.js
- Manages react-big-calendar integration
- Handles event coloring by status
- Supports multiple calendar views
- Event selection handling

### RescheduleModal.js
- Modal for rescheduling bookings
- Date and time picker
- Live preview of new schedule
- Form validation

### BookingPage.js
- Main booking management page
- Calendar view integration
- Booking card grid
- New booking form
- Delete and reschedule actions

---

## 🎨 Styling Features

### Responsive Design
- Mobile-friendly calendar layout
- Adaptive grid for booking cards
- Touch-friendly buttons

### Visual Feedback
- Hover effects on cards
- Status-based color coding
- Loading states
- Success/error messages

### Accessibility
- Keyboard navigation support
- Clear date/time formats
- Color-blind friendly status indicators
- Alt text for icons

---

## ⚙️ Dependencies

```json
{
  "react-big-calendar": "^1.x.x",
  "date-fns": "^2.x.x"
}
```

These were added automatically when you installed:
```bash
npm install react-big-calendar date-fns --save
```

---

## 🐛 Troubleshooting

### Issue: Calendar not showing events

**Solution:**
```
1. Verify API is returning bookings:
   GET /api/booking/all
2. Check browser console for errors
3. Ensure date format is ISO 8601
4. Refresh page or clear cache
```

### Issue: Cannot reschedule booking

**Solution:**
```
1. Verify booking is not completed
2. Check you have valid auth token
3. Ensure new date is in the future
4. Try deleting and recreating
```

### Issue: Modal not opening

**Solution:**
```
1. Check browser console for errors
2. Verify RescheduleModal component imported
3. Clear browser cache
4. Try refreshing page
```

### Issue: Styling looks broken

**Solution:**
```
1. Verify CSS files imported correctly
2. Run: npm install
3. Clear node_modules and reinstall
4. Restart development server
```

---

## 📈 Future Enhancements

Potential features to add:

- 📧 Email notifications for bookings
- 🔔 In-app notifications and reminders
- 👥 Group session bookings
- 🌍 Timezone support
- 📥 Calendar export to .ics
- 🔄 Recurring bookings
- 🎨 Custom calendar themes

---

## 📚 Related Documentation

- [Main README](../README.md) - Project overview
- [Admin Setup](ADMIN_SETUP.md) - Admin features
- [API Documentation](../README.md#-api-documentation) - Full API reference
- [Postman Setup](POSTMAN_SETUP.md) - API testing guide

---

## ✅ Checklist

- ✅ Calendar component renders correctly
- ✅ Events display with correct colors
- ✅ Can create new booking from calendar
- ✅ Can reschedule existing booking
- ✅ Can delete booking
- ✅ Multiple calendar views work
- ✅ Responsive on mobile devices
- ✅ API endpoints working
- ✅ Error handling in place

---

**Calendar Integration Complete! Start managing your wellness sessions visually! 📅✨**
