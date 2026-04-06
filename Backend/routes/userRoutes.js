import express from "express";
import {
    registerUser,
    loginUser,
    dashboard,
    updateProfile,
    updatePassword,
    logoutUser,
} from "../controller/userController.js";

import { protect } from "../middleware/authMiddleware.js";    // only logged-in users
import { authorizeRoles } from "../middleware/roleMiddleware.js"; // role-based access

const router = express.Router();

// ================= PUBLIC ROUTES =================

// Show register form
router.get("/register", (req, res) => res.render("register"));

// Register user (EJS form)
router.post("/register", registerUser);

// Show login form
router.get("/login", (req, res) => res.render("login"));

// Login user (EJS form)
router.post("/login", loginUser);

// Logout user
router.get("/logout", logoutUser);

// ================= PROTECTED ROUTES =================

// Dashboard / current user page
router.get(
    "/dashboard",
    protect,
    authorizeRoles("admin", "analyst", "viewer"),
    dashboard
);

// Update profile (any logged-in user)
router.post(
    "/update-profile",
    protect,
    authorizeRoles("admin", "analyst", "viewer"),
    updateProfile
);

// Change password
router.post(
    "/change-password",
    protect,
    authorizeRoles("admin", "analyst", "viewer"),
    updatePassword
);

// ================= ROLE-BASED DATA PAGES =================

// Viewer/Admin/Analyst: view data page
router.get(
    "/data",
    protect,
    authorizeRoles("admin", "analyst", "viewer"),
    (req, res) => {
        res.render("dataPage", { user: req.user, message: "Data fetched" });
    }
);

// Analyst/Admin: edit data (via form submission)
router.post(
    "/data/edit/:id",
    protect,
    authorizeRoles("admin", "analyst"),
    (req, res) => {
        // handle edit logic here
        res.render("dataPage", { user: req.user, message: "Data updated" });
    }
);

// Admin only: delete data
router.post(
    "/data/delete/:id",
    protect,
    authorizeRoles("admin"),
    (req, res) => {
        // handle delete logic here
        res.render("dataPage", { user: req.user, message: "Data deleted" });
    }
);

export default router;
