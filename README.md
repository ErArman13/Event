# Event Registration System

A comprehensive web-based event registration system built with Node.js, Express, and EJS templating. This application allows administrators to create and manage events while users can browse and register for events with local JSON file storage.

## 🚀 Features

### Admin Features

- **Event Management**: Create, edit, and delete events
- **Registration Dashboard**: View all registered participants for each event
- **Event Details**: Manage event title, description, date, time, location, and participant limits
- **Real-time Statistics**: Track registration counts and available spots

### User Features

- **Event Browsing**: View all available events with detailed information
- **Event Registration**: Register for events with form validation
- **Registration Tracking**: Search and view personal registrations by email
- **Responsive Design**: Optimized for desktop and mobile devices

### Technical Features

- **Local JSON Storage**: No database setup required - uses `events.json` and `registrations.json`
- **Form Validation**: Server-side and client-side validation
- **Duplicate Prevention**: Prevents duplicate registrations for the same event
- **Capacity Management**: Automatically prevents registration when events are full
- **Bootstrap UI**: Modern, responsive user interface
- **Real-time Updates**: Dynamic progress bars and availability indicators

## 🛠️ Tech Stack

- **Backend**: Node.js + Express.js
- **Frontend**: EJS templating engine + Bootstrap 5
- **Styling**: Custom CSS with Bootstrap components
- **Validation**: Express-validator
- **Data Storage**: Local JSON files
- **Icons**: Bootstrap Icons

## 📁 Project Structure

```
Event-Registration-App/
│
├── server.js                 # Main application server
├── package.json             # Dependencies and scripts
├── events.json              # Event data storage
├── registrations.json       # Registration data storage
├── views/                   # EJS template files
│   ├── index.ejs           # Home page - event listing
│   ├── admin.ejs           # Admin dashboard
│   ├── eventForm.ejs       # Create/edit event form
│   ├── registrationForm.ejs # Event registration form
│   ├── myRegistrations.ejs # User registration lookup
│   ├── success.ejs         # Registration success page
│   └── error.ejs           # Error page
├── public/                  # Static assets
│   ├── css/
│   │   └── style.css       # Custom styles
│   └── js/
│       └── main.js         # Client-side JavaScript
└── README.md               # Project documentation
```

## 🚦 Getting Started

### Prerequisites

- Node.js (version 14.0 or higher)
- npm (Node Package Manager)

### Installation

1. **Clone or download the project**

   ```bash
   cd event-registration-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   Or for production:

   ```bash
   npm start
   ```

4. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`
   - The application will be running with empty events and registrations JSON files

## 📖 Usage Guide

### For Administrators

1. **Access Admin Dashboard**

   - Navigate to `/admin` or click "Admin" in the navigation bar
   - View all events and their registration statistics

2. **Create New Event**

   - Click "Create New Event" button
   - Fill in event details:
     - Event Title (required)
     - Description (required)
     - Date and Time (required)
     - Location (required)
     - Maximum Participants (required, minimum 1)
   - Submit the form to create the event

3. **Manage Existing Events**
   - Edit events by clicking the "Edit" button
   - Delete events using the "Delete" button (includes confirmation dialog)
   - View registered participants directly in the admin dashboard

### For Users

1. **Browse Events**

   - Visit the home page to see all available events
   - View event details, availability, and registration progress

2. **Register for Events**

   - Click "Register Now" on any available event
   - Fill in registration form:
     - Full Name (required)
     - Email Address (required, valid email format)
     - Phone Number (required)
   - Submit to complete registration

3. **View Your Registrations**
   - Navigate to "My Registrations" in the navigation
   - Enter your email address to view all your registered events
   - See confirmation details and event information

## 🔧 Configuration

### Port Configuration

- Default port: 3000
- To change: Set the `PORT` environment variable
  ```bash
  PORT=8080 npm start
  ```

### Data Storage

- Events are stored in `events.json`
- Registrations are stored in `registrations.json`
- Both files are created automatically if they don't exist
- Data persists between application restarts

## 🎨 Customization

### Styling

- Modify `public/css/style.css` for custom styles
- The application uses Bootstrap 5 for base styling
- Custom CSS includes animations, hover effects, and responsive design

### Functionality

- Add new routes in `server.js`
- Create additional EJS templates in the `views/` directory
- Extend client-side functionality in `public/js/main.js`

## 🚨 Error Handling

The application includes comprehensive error handling:

- **Form Validation**: Client and server-side validation with user-friendly error messages
- **Duplicate Registration**: Prevents users from registering for the same event twice
- **Capacity Limits**: Prevents registration when events reach maximum capacity
- **404 Handling**: Custom error page for invalid routes
- **Data Validation**: Ensures data integrity for events and registrations

## 🔒 Security Features

- **Input Validation**: All form inputs are validated using express-validator
- **XSS Protection**: EJS templating provides automatic escaping
- **Data Sanitization**: User inputs are sanitized before storage
- **Error Handling**: Graceful error handling without exposing system details

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes and orientations

## 🚀 Advanced Features (Optional Extensions)

Consider adding these features for enhanced functionality:

- **Email Notifications**: Send confirmation emails to users
- **Event Categories**: Organize events by categories
- **User Authentication**: Add user accounts and login system
- **Payment Integration**: Add payment processing for paid events
- **Calendar Integration**: Export events to calendar applications
- **Search and Filter**: Enhanced search and filtering capabilities
- **Event Images**: Add image upload and display for events
- **QR Code Generation**: Generate QR codes for event check-in
- **Export Data**: Export registrations to CSV/Excel files

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**

   - Change the port number in the environment variable
   - Kill existing processes using the port

2. **File Permission Errors**

   - Ensure the application has write permissions for JSON files
   - Check file permissions in the project directory

3. **Module Not Found Errors**

   - Run `npm install` to install all dependencies
   - Check that all required packages are listed in `package.json`

4. **Template Errors**
   - Verify all EJS template files exist in the `views/` directory
   - Check for syntax errors in EJS templates

## 📝 Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support or questions:

- Check the troubleshooting section
- Review the code comments for implementation details
- Create an issue for bugs or feature requests

## 🏆 Acknowledgments

- Bootstrap team for the excellent UI framework
- Express.js team for the robust web framework
- Node.js community for the runtime environment
- EJS team for the templating engine
