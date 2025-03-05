const jwt = require("jsonwebtoken");
const Log = require("../models/Log");
const User = require("../models/User");
const mongoose = require("mongoose");

const JWT_SECRET = "Trackmates";
const MONGO_URL = "mongodb://127.0.0.1:27017/HWH_TrackMates";

mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware for JWT authentication
const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.jwt || (req.headers["authorization"] && req.headers["authorization"].split(" ")[1]);
    if (!token) return res.status(401).redirect("/unauthorized");

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userID = decoded.userID;
    next();
  } catch (err) {
    console.error("JWT Verification Error:", err);
    return res.status(401).redirect("/unauthorized");
  }
};

// Login Function
const login = async (req, res) => {
  try {
    const { email, password, guest } = req.body;

    if (guest) {
      const guestUser = { _id: "guest", name: "Guest User", email: "guest@example.com" };
      const token = jwt.sign({ userID: guestUser._id }, JWT_SECRET, { expiresIn: "1h" });
      res.cookie("jwt", token, { httpOnly: true, secure: true, sameSite: "Strict" });
      return res.redirect("/dashboard-guest");
    }

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.redirect("/login?error=Invalid credentials");
    }

    const token = jwt.sign({ userID: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.cookie("jwt", token, { httpOnly: true, secure: true, sameSite: "Strict" });
    res.redirect("/dashboard");
  } catch (err) {
    console.error("Login Error:", err);
    res.redirect("/");
  }
};

// Dashboard Function
const dashboard = async (req, res) => {
  try {
    const user = await User.findById(req.userID);
    if (!user) throw new Error("User not found");
    res.render("dashboard", { user });
  } catch (err) {
    console.error("Dashboard Error:", err);
    res.redirect("/dashboard-guest");
  }
};

// Guest Dashboard
const guestDashboard = (req, res) => {
  res.render("dashboard-guest", { user: { name: "Guest User" } });
};

// Logout Function
const logout = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/");
};

// Routes for additional views
const article = (req, res) => {
  res.render("article", { article: req.query.article }); // Ensure `article` is provided
};
const calendar = (req, res) => res.render("calendar");
const learn = (req, res) => res.render("learn");
const loginPage = (req, res) => res.render("login");
const profile = (req, res) => res.render("profile");
const test = (req, res) => res.render("test");
const unauthorized = (req, res) => res.render("unauthorized");
const user = (req, res) => res.render("user");





module.exports = {
  login,
  dashboard,
  guestDashboard,
  logout,
  authMiddleware,
  article,
  calendar,
  learn,
  loginPage,
  profile,
  test,
  unauthorized,
  user,
};
