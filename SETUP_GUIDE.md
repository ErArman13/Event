# 🚀 Event Registration System - Setup Guide

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (version 14.0 or higher) - Download from [nodejs.org](https://nodejs.org/)
- **npm** (comes with Node.js)
- A **code editor** (VS Code recommended)
- A **web browser** (Chrome, Firefox, Edge)

## 📁 Project Files

This folder contains a complete Event Registration System with:

- Local JSON storage (no database needed)
- Admin panel for event management
- User registration system
- Responsive web design

## ⚡ Quick Start (5 minutes)

### Step 1: Open Terminal/Command Prompt

- **Windows**: Press `Win + R`, type `cmd`, press Enter
- **Mac/Linux**: Open Terminal
- Navigate to the project folder:
  ```bash
  cd path/to/event-registration-system
  ```

### Step 2: Install Dependencies

```bash
npm install
```

_This downloads all required packages (express, ejs, etc.)_

### Step 3: Start the Application

```bash
npm start
```

_Or for development mode:_

```bash
npm run dev
```

### Step 4: Open in Browser

- Go to: **http://localhost:3000**
- The application is now running!

## 🌐 Application URLs

| Page                 | URL                                    | Purpose            |
| -------------------- | -------------------------------------- | ------------------ |
| **Homepage**         | http://localhost:3000                  | View all events    |
| **Admin Panel**      | http://localhost:3000/admin            | Manage events      |
| **My Registrations** | http://localhost:3000/my-registrations | Find registrations |

## 👨‍💼 How to Use (Admin)

### Creating Events:

1. Go to http://localhost:3000/admin
2. Click "Create New Event"
3. Fill in event details:
   - Title, Description, Date, Time
   - Location, Max Participants
4. Click "Create Event"

### Managing Events:

- **Edit**: Click "Edit" button on any event
- **Delete**: Click "Delete" button (with confirmation)
- **View Registrations**: See all participants in admin panel

## 👥 How to Use (Users)

### Registering for Events:

1. Go to http://localhost:3000
2. Browse available events
3. Click "Register Now"
4. Fill in: Name, Email, Phone
5. Submit registration

### Finding Your Registrations:

1. Go to http://localhost:3000/my-registrations
2. Enter your email address
3. View all your registered events

## 🔧 Troubleshooting

### Common Issues:

**1. "Port 3000 already in use"**

```bash
# Kill existing processes
npm run kill-port  # If available
# Or manually change port:
set PORT=3001 && npm start
```

**2. "Cannot find module" errors**

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

**3. Form submission hanging/buffering**

- Clear browser cache (Ctrl+F5)
- Try different browser
- Check browser console for errors (F12)

**4. Server won't start**

```bash
# Check Node.js version
node --version
# Should be 14.0 or higher

# Try running directly
node server.js
```

## 📂 File Structure

```
Event-Registration-System/
├── server.js              # Main application server
├── package.json           # Dependencies and scripts
├── events.json            # Event data storage
├── registrations.json     # Registration data storage
├── views/                 # HTML templates
│   ├── index.ejs         # Homepage
│   ├── admin.ejs         # Admin dashboard
│   ├── eventForm.ejs     # Create/edit events
│   └── registrationForm.ejs # User registration
├── public/               # Static assets
│   ├── css/style.css    # Styles
│   └── js/main.js       # JavaScript
└── README.md            # Documentation
```

## 🔄 Starting Fresh

If you want to start with empty data:

1. **Clear Events**: Delete content of `events.json` and replace with `[]`
2. **Clear Registrations**: Delete content of `registrations.json` and replace with `[]`
3. **Restart Server**: Stop (Ctrl+C) and start again

## 📝 Current Data

Your system currently has:

- **1 Event**: "this is" event in Kanpur (May 26, 2026)
- **1 Registration**: Arman Ahmad registered for the event

## 🚀 Development Mode

For development with auto-restart on file changes:

```bash
npm run dev
```

_Uses nodemon to restart server when files change_

## 🌍 Making it Public (Optional)

To share with others online, you can:

1. **Deploy to Heroku**: Free hosting
2. **Use ngrok**: Temporary public URL
3. **Deploy to Vercel/Netlify**: Static hosting

## 📞 Support

If you encounter any issues:

1. Check the terminal/console for error messages
2. Verify Node.js is installed correctly
3. Make sure all files are present
4. Try the troubleshooting steps above

## 🎯 Features Included

- ✅ Event creation and management
- ✅ User registration with validation
- ✅ Email-based registration lookup
- ✅ Capacity limits and duplicate prevention
- ✅ Responsive design for mobile/desktop
- ✅ Local JSON storage (no database needed)
- ✅ Real-time registration tracking

---

**Enjoy your Event Registration System!** 🎉

_For questions or support, refer to the README.md file or check the code comments._
