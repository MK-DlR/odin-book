// backend/app.js

require("dotenv").config();

// imports
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const { prisma } = require("./lib/prisma");
const cors = require("cors");

// initialize app
const app = express();

app.set("trust proxy", 1);

// middleware
app.use(express.json()); // parse json for apis
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(express.static(path.join(__dirname, "public"))); // static files
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

// session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }),
);

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

// load passport strategies
const {
  githubAuth,
  serializeUser,
  deserializeUser,
} = require("./config/githubStrategy");

passport.use("github", githubAuth);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// routes
app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const postsRouter = require("./routes/posts.js");
app.use("/posts", postsRouter);

const usersRouter = require("./routes/users.js");
app.use("/users", usersRouter);

app.get("/debug-session", (req, res) => {
  res.json({
    session: req.session,
    passport: req.session?.passport,
    user: req.user,
    cookies: req.headers.cookie || null,
  });
});

// login check and troubleshooting
app.get("/me", (req, res) => {
  console.log("COOKIES:", req.headers.cookie);
  console.log("SESSION ID:", req.sessionID);
  console.log("USER:", req.user);
  console.log("SESSION:", req.session);
  console.log("PASSPORT:", req.session.passport);
  res.json({
    user: req.user || null,
    authenticated: req.isAuthenticated(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not found." });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async (error) => {
  if (error) throw error;
  console.log(`Server running on port ${PORT}.`);

  // test database connection
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection failed:", err);
  }
});

// graceful shutdown
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  console.log("Database disconnected.");
  process.exit(0);
});
