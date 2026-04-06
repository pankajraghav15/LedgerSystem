import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors';
import 'dotenv/config';
import { connectToDB } from './Backend/config/db.js';
import userRoutes from './Backend/routes/userRoutes.js';
import viewRoutes from "./Backend/routes/viewRoutes.js";
import path from 'path';

const app = express();
const PORT = process.env.PORT || 4000;

// ---------------- MIDDLEWARES ----------------
app.use(cookieParser());
//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------- EJS SETUP ----------------
app.set("view engine", "ejs");
app.set("views", path.resolve("./frontend/views"));

// Serve static files
app.use(express.static(path.join(process.cwd(), "public")));

// ---------------- DATABASE ----------------
connectToDB();

// ---------------- ROUTES ----------------
// API routes for CRUD and protected actions
app.use("/api/users", userRoutes);

// Frontend routes for EJS pages (login, register, dashboard)
app.use("/", viewRoutes);

// ---------------- CATCH-ALL ----------------
// Optional: redirect unknown routes to login
app.use((req, res) => {
    res.redirect("/login");
});

// ---------------- START SERVER ----------------
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
