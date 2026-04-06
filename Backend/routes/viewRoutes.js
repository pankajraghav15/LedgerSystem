import express from "express";
import { registerUser, loginUser, dashboard, logoutUser, updateProfile, updatePassword } from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { createRecord, getDashboardData, deleteRecord } from "../controller/recordController.js";

const router = express.Router();

// ===== Public Routes =====
router.get("/", (req, res) => res.redirect("/login"));
router.get("/login", (req, res) => res.render("login"));
router.get("/register", (req, res) => res.render("register"));

router.post("/register", registerUser);
router.post("/login", loginUser);

// ===== Protected Routes =====
router.get("/dashboard", protect, getDashboardData);
router.get("/logout", protect, logoutUser);
router.post("/update-profile", protect, updateProfile);
router.post("/update-password", protect, updatePassword);

// Financial Operations
router.post("/records/add", protect, createRecord);
router.get("/records/delete/:id", protect, deleteRecord); // Using GET for simple EJS link delete

export default router;
