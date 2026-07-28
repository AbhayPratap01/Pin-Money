import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "./models/User.js";
import Loan from "./models/Loan.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

// ─── Helpers ────────────────────────────────────────────────────────────────

function createToken(user) {
  return jwt.sign({ id: user._id, mobile: user.mobile }, JWT_SECRET, { expiresIn: "7d" });
}

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  if (!token) return res.status(401).json({ error: "No token provided" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

// ─── Health ──────────────────────────────────────────────────────────────────

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", db: mongoose.connection.readyState === 1 ? "connected" : "disconnected" });
});

// ─── Register ────────────────────────────────────────────────────────────────

app.post("/api/register", async (req, res) => {
  try {
    const { name, mobile, email, pan, aadhaar, password } = req.body;
    if (!name || !mobile || !email || !pan || !aadhaar || !password)
      return res.status(400).json({ error: "All fields are required" });

    const existing = await User.findOne({ $or: [{ mobile }, { email: email.toLowerCase() }] });
    if (existing) return res.status(409).json({ error: "User already exists with this mobile or email" });

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await User.create({
      name,
      mobile,
      email: email.toLowerCase(),
      pan,
      aadhaar,
      password: hashedPassword,
    });

    const token = createToken(user);
    const { password: _pw, ...safeUser } = user.toObject();
    res.status(201).json({ user: safeUser, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed" });
  }
});

// ─── Login ───────────────────────────────────────────────────────────────────

app.post("/api/login", async (req, res) => {
  try {
    const { mobile, password } = req.body;
    if (!mobile || !password)
      return res.status(400).json({ error: "Mobile number and password are required" });

    const user = await User.findOne({ mobile });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = createToken(user);
    const { password: _pw, ...safeUser } = user.toObject();
    res.json({ user: safeUser, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

// ─── Profile ─────────────────────────────────────────────────────────────────

app.get("/api/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: "Could not fetch profile" });
  }
});

// ─── Loans ───────────────────────────────────────────────────────────────────

app.post("/api/loans", authMiddleware, async (req, res) => {
  try {
    const { personalDetails, employmentDetails, loanDetails } = req.body;
    if (!personalDetails || !employmentDetails || !loanDetails)
      return res.status(400).json({ error: "Missing required loan application details" });

    // Count existing loans to simulate realistic status variety for demo
    const existingCount = await Loan.countDocuments({ userId: req.user.id });
    let status = "Pending";
    if (existingCount === 0) status = "Approved";
    else if (existingCount === 1) status = "Rejected";

    const loan = await Loan.create({
      userId: req.user.id,
      personalDetails,
      employmentDetails,
      loanDetails,
      status,
    });

    res.status(201).json(loan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit loan application" });
  }
});

app.get("/api/loans", authMiddleware, async (req, res) => {
  try {
    const loans = await Loan.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch loans" });
  }
});

// ─── CIBIL ───────────────────────────────────────────────────────────────────

app.post("/api/cibil", authMiddleware, async (req, res) => {
  try {
    const { pan, name, mobile, dob } = req.body;
    if (!pan || !name || !mobile || !dob)
      return res.status(400).json({ error: "All fields are required to check CIBIL score" });

    let user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Generate a stable score if none exists
    if (!user.cibilScore) {
      user.cibilScore = Math.floor(700 + Math.random() * 120);
      await user.save();
    }

    res.json({ cibilScore: user.cibilScore, name, pan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not process CIBIL check" });
  }
});

// ─── Start ───────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
