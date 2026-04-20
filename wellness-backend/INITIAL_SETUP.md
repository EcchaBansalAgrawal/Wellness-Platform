# Initial Setup - Creating Admin User 🚀

After deploying the application for the first time, follow these steps to create your first admin user.

---

## 📋 Method 1: Using MongoDB Compass (GUI)

### Step 1: Open MongoDB Compass

- Download and install [MongoDB Compass](https://www.mongodb.com/products/compass)
- Connect to your MongoDB instance

### Step 2: Navigate to Database

1. Click on `wellness` database
2. Click on `users` collection
3. Click **INSERT DOCUMENT**

### Step 3: Create Admin User

Use this template (you can use any admin credentials you prefer):

```json
{
  "_id": {
    "$oid": "507f1f77bcf86cd799439001"
  },
  "name": "System Admin",
  "email": "admin@wellness.com",
  "password": "$2b$10$BPXSZ9.qLlCqDKvP6KyVyOj.cVsVHVBvVYRZ6Jq8EZVHd1YQXnLJi",
  "role": "Admin",
  "createdAt": {
    "$date": {
      "$numberLong": "1713607200000"
    }
  },
  "updatedAt": {
    "$date": {
      "$numberLong": "1713607200000"
    }
  }
}
```

**Note:** The password hash above is for `admin123`. To create a different password:
1. Use an online bcrypt tool: https://bcrypt.online/
2. Hash your desired password with salt rounds 10
3. Replace the password hash in the JSON above

---

## 📋 Method 2: Using MongoDB Shell

### Step 1: Connect to MongoDB

```bash
mongosh
```

Or if using older MongoDB client:
```bash
mongo
```

### Step 2: Switch to Wellness Database

```bash
use wellness
```

### Step 3: Insert Admin Document

```javascript
db.users.insertOne({
  name: "System Admin",
  email: "admin@wellness.com",
  password: "$2b$10$BPXSZ9.qLlCqDKvP6KyVyOj.cVsVHVBvVYRZ6Jq8EZVHd1YQXnLJi",
  role: "Admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

**Expected Output:**
```
{
  acknowledged: true,
  insertedId: ObjectId("...")
}
```

---

## 📋 Method 3: Using MongoDB Atlas (Cloud)

### Step 1: Go to MongoDB Atlas

1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Navigate to your cluster
3. Click **Browse Collections**

### Step 2: Insert Document

1. Click on `wellness` database → `users` collection
2. Click **INSERT DOCUMENT**
3. Use the JSON template from Method 1 above
4. Click **Insert**

---

## ✅ Verify Admin User Creation

### Check in MongoDB Compass

1. Refresh the collection
2. You should see the new admin document
3. Verify `role: "Admin"` is set

### Check via API

```bash
# Use curl or Postman to test:
POST http://localhost:5000/api/auth/login

{
  "email": "admin@wellness.com",
  "password": "admin123"
}
```

**Expected Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439001",
    "name": "System Admin",
    "email": "admin@wellness.com",
    "role": "Admin"
  }
}
```

---

## 🔑 Creating Additional Admins

Once you have your first admin user, you can promote other users to admin status.

### Option 1: Via API (Requires existing admin)

```bash
PUT http://localhost:5000/api/admin/users/{userId}/role
Authorization: Bearer {ADMIN_TOKEN}
Content-Type: application/json

{
  "role": "Admin"
}
```

### Option 2: Via MongoDB

```javascript
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "Admin" } }
)
```

---

## 📝 Password Reference

### Default Credentials (for testing)

| Email | Password | Role | Hash |
|-------|----------|------|------|
| admin@wellness.com | admin123 | Admin | $2b$10$BPXSZ9.qLlCqDKvP6KyVyOj.cVsVHVBvVYRZ6Jq8EZVHd1YQXnLJi |

**⚠️ IMPORTANT:** Change this password in production!

### Generate Your Own Hash

Use [bcrypt.online](https://bcrypt.online/):

1. Enter your desired password
2. Set rounds to **10**
3. Click **Hash**
4. Copy the hash and use it in the password field

---

## 🗂️ Initial Data Structure

After creating the admin user, your MongoDB `wellness` database should have this structure:

```
wellness/
├── users
│   ├── System Admin (role: Admin)
│   └── Regular Users (role: User)
├── assessments
│   └── (empty initially)
└── bookings
    └── (empty initially)
```

---

## 🚀 Next Steps

1. ✅ Create admin user (this guide)
2. ✅ Login with admin credentials
3. ✅ Access admin dashboard
4. ✅ View analytics and manage users
5. ✅ See [ADMIN_SETUP.md](ADMIN_SETUP.md) for full admin guide

---

## 🆘 Troubleshooting

### Issue: "User not found" when logging in

**Solution:**
- Verify email spelling matches exactly (case-sensitive)
- Check user exists in MongoDB
- Try registering a new user first, then updating role to Admin

### Issue: "Invalid password"

**Solution:**
- Use the password `admin123` if using the provided hash
- If you created custom hash, ensure password matches
- Re-hash your password on bcrypt.online

### Issue: Authentication denied on admin endpoints

**Solution:**
- Verify user's `role` field is exactly `"Admin"` (capital A)
- Check token includes `role` information
- Generate new token after updating role

---

**Setup Complete! Start using the admin dashboard now! 🎉**
