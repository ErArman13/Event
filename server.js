const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const { body, validationResult } = require("express-validator");

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine and views directory
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Helper functions for JSON file operations
const readJSONFile = (filename) => {
  try {
    const data = fs.readFileSync(filename, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeJSONFile = (filename, data) => {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
};

// Routes

// Test endpoint for debugging
app.post("/test-create", (req, res) => {
  console.log("TEST ENDPOINT HIT!");
  console.log("Body:", req.body);
  res.json({ success: true, body: req.body });
});

// Test registration endpoint
app.post("/test-register", (req, res) => {
  console.log("TEST REGISTRATION HIT!");
  console.log("Body:", req.body);
  res.json({ success: true, body: req.body });
});

// Simple form test
app.get("/test-form", (req, res) => {
  res.send(`
    <html>
    <body>
      <h2>Simple Event Form Test</h2>
      <form method="POST" action="/admin/event">
        <p>Title: <input type="text" name="title" value="Test Event" required></p>
        <p>Description: <input type="text" name="description" value="Test Description" required></p>
        <p>Date: <input type="date" name="date" value="2025-12-01" required></p>
        <p>Time: <input type="time" name="time" value="10:00" required></p>
        <p>Location: <input type="text" name="location" value="Test Location" required></p>
        <p>Max Participants: <input type="number" name="maxParticipants" value="10" required></p>
        <button type="submit">Create Event (Direct)</button>
      </form>
      <hr>
      <form method="POST" action="/test-create">
        <input type="text" name="title" placeholder="Title" required>
        <input type="text" name="description" placeholder="Description" required>
        <button type="submit">Test JSON Response</button>
      </form>
      <hr>
      <h2>Registration Test</h2>
      <form method="POST" action="/register">
        <p>Event ID: <input type="hidden" name="eventId" value="1"></p>
        <p>Name: <input type="text" name="name" value="Test User" required></p>
        <p>Email: <input type="email" name="email" value="test@example.com" required></p>
        <p>Phone: <input type="tel" name="phone" value="1234567890" required></p>
        <button type="submit">Test Registration (Direct)</button>
      </form>
    </body>
    </html>
  `);
});

// Home page - Display all events
app.get("/", (req, res) => {
  const events = readJSONFile("events.json");
  const registrations = readJSONFile("registrations.json");

  // Count registrations for each event
  const eventsWithRegistrationCount = events.map((event) => {
    const eventRegistrations = registrations.filter(
      (reg) => reg.eventId === event.id
    );
    return {
      ...event,
      registrationCount: eventRegistrations.length,
      spotsAvailable: event.maxParticipants - eventRegistrations.length,
    };
  });

  res.render("index", { events: eventsWithRegistrationCount });
});

// Admin dashboard
app.get("/admin", (req, res) => {
  const events = readJSONFile("events.json");
  const registrations = readJSONFile("registrations.json");

  const eventsWithRegistrations = events.map((event) => {
    const eventRegistrations = registrations.filter(
      (reg) => reg.eventId === event.id
    );
    return {
      ...event,
      registrations: eventRegistrations,
      registrationCount: eventRegistrations.length,
    };
  });

  res.render("admin", { events: eventsWithRegistrations });
});

// Create event form
app.get("/admin/create-event", (req, res) => {
  res.render("eventForm", { event: null, errors: null });
});

// Edit event form
app.get("/admin/edit-event/:id", (req, res) => {
  const events = readJSONFile("events.json");
  const event = events.find((e) => e.id === parseInt(req.params.id));

  if (!event) {
    return res.redirect("/admin");
  }

  res.render("eventForm", { event, errors: null });
});

// Create/Update event
app.post(
  "/admin/event",
  [
    body("title").notEmpty().withMessage("Event title is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("date").notEmpty().withMessage("Date is required"),
    body("time").notEmpty().withMessage("Time is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("maxParticipants")
      .isInt({ min: 1 })
      .withMessage("Max participants must be a positive number"),
  ],
  (req, res) => {
    console.log("=== POST /admin/event - Request received ===");
    console.log("Request body:", req.body);
    console.log("Request headers:", req.headers);

    const errors = validationResult(req);
    console.log("Validation errors:", errors.array());

    if (!errors.isEmpty()) {
      console.log("Validation failed, returning form with errors");
      const event = req.body.id
        ? { ...req.body, id: parseInt(req.body.id) }
        : null;
      return res.render("eventForm", { event, errors: errors.array() });
    }

    const events = readJSONFile("events.json");
    const { title, description, date, time, location, maxParticipants } =
      req.body;

    if (req.body.id) {
      // Update existing event
      const eventIndex = events.findIndex(
        (e) => e.id === parseInt(req.body.id)
      );
      if (eventIndex !== -1) {
        events[eventIndex] = {
          id: parseInt(req.body.id),
          title,
          description,
          date,
          time,
          location,
          maxParticipants: parseInt(maxParticipants),
          createdAt: events[eventIndex].createdAt,
        };
      }
    } else {
      // Create new event
      const newEvent = {
        id: events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1,
        title,
        description,
        date,
        time,
        location,
        maxParticipants: parseInt(maxParticipants),
        createdAt: new Date().toISOString(),
      };
      events.push(newEvent);
    }

    console.log("Saving events to file:", events);
    try {
      writeJSONFile("events.json", events);
      console.log("Events saved successfully");
      console.log("Redirecting to /admin");
      return res.redirect("/admin");
    } catch (error) {
      console.error("Error saving events:", error);
      return res.render("eventForm", {
        event: null,
        errors: [{ msg: "Error saving event. Please try again." }],
      });
    }
  }
);

// Delete event
app.post("/admin/delete-event/:id", (req, res) => {
  const events = readJSONFile("events.json");
  const registrations = readJSONFile("registrations.json");

  const eventId = parseInt(req.params.id);

  // Remove event
  const updatedEvents = events.filter((e) => e.id !== eventId);
  writeJSONFile("events.json", updatedEvents);

  // Remove all registrations for this event
  const updatedRegistrations = registrations.filter(
    (r) => r.eventId !== eventId
  );
  writeJSONFile("registrations.json", updatedRegistrations);

  res.redirect("/admin");
});

// Registration form
app.get("/register/:id", (req, res) => {
  const events = readJSONFile("events.json");
  const registrations = readJSONFile("registrations.json");

  const event = events.find((e) => e.id === parseInt(req.params.id));

  if (!event) {
    return res.redirect("/");
  }

  const eventRegistrations = registrations.filter(
    (reg) => reg.eventId === event.id
  );
  const spotsAvailable = event.maxParticipants - eventRegistrations.length;

  if (spotsAvailable <= 0) {
    return res.render("error", {
      message: "Sorry, this event is fully booked!",
      backUrl: "/",
    });
  }

  res.render("registrationForm", { event, errors: null });
});

// Process registration
app.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("phone").notEmpty().withMessage("Phone number is required"),
    body("eventId").isInt().withMessage("Invalid event"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const events = readJSONFile("events.json");
      const event = events.find((e) => e.id === parseInt(req.body.eventId));
      return res.render("registrationForm", { event, errors: errors.array() });
    }

    const events = readJSONFile("events.json");
    const registrations = readJSONFile("registrations.json");

    const event = events.find((e) => e.id === parseInt(req.body.eventId));

    if (!event) {
      return res.redirect("/");
    }

    // Check if event is full
    const eventRegistrations = registrations.filter(
      (reg) => reg.eventId === event.id
    );
    if (eventRegistrations.length >= event.maxParticipants) {
      return res.render("error", {
        message: "Sorry, this event is fully booked!",
        backUrl: "/",
      });
    }

    // Check for duplicate registration
    const existingRegistration = registrations.find(
      (reg) => reg.eventId === event.id && reg.email === req.body.email
    );

    if (existingRegistration) {
      return res.render("error", {
        message: "You have already registered for this event!",
        backUrl: "/",
      });
    }

    // Create new registration
    const newRegistration = {
      id:
        registrations.length > 0
          ? Math.max(...registrations.map((r) => r.id)) + 1
          : 1,
      eventId: parseInt(req.body.eventId),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      registeredAt: new Date().toISOString(),
    };

    registrations.push(newRegistration);
    writeJSONFile("registrations.json", registrations);

    res.render("success", {
      message: "Registration successful!",
      event: event,
      registration: newRegistration,
    });
  }
);

// My registrations
app.get("/my-registrations", (req, res) => {
  res.render("myRegistrations");
});

// Search registrations by email
app.post(
  "/search-registrations",
  [body("email").isEmail().withMessage("Valid email is required")],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("myRegistrations", {
        registrations: null,
        events: null,
        errors: errors.array(),
        searchEmail: "",
      });
    }

    const events = readJSONFile("events.json");
    const registrations = readJSONFile("registrations.json");

    const userRegistrations = registrations.filter(
      (reg) => reg.email === req.body.email
    );
    const userEvents = userRegistrations.map((reg) => {
      const event = events.find((e) => e.id === reg.eventId);
      return {
        ...reg,
        event: event,
      };
    });

    res.render("myRegistrations", {
      registrations: userRegistrations,
      events: userEvents,
      errors: null,
      searchEmail: req.body.email,
    });
  }
);

// Error handling middleware
app.use((req, res) => {
  res.status(404).render("error", {
    message: "Page not found",
    backUrl: "/",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
