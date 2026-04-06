import User from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { createToken } from '../services/userAuth.js';

// ---------------- Register User ----------------
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.render("register", { error: "All fields are required" });
        }

        if (!validator.isEmail(email)) {
            return res.render("register", { error: "Invalid email" });
        }

        if (password.length < 6) {
            return res.render("register", { error: "Password must be at least 6 characters" });
        }

        if (await User.findOne({ email })) {
            return res.render("register", { error: "User already exists with this email" });
        }

        // Mongoose will hash password automatically
        await User.create({ name, email, password, userStatus: "active", role: role ||"viewer" });

        res.redirect("/login");

    } catch (err) {
        console.error(err);
        res.render("register", { error: "Server error. Try again later" });
    }
};

// ---------------- Login User ----------------
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.render("login", { error: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.render("login", { error: "Invalid email or password" });
        if (user.userStatus !== "active") return res.render("login", { error: "User is inactive" });

        const match = await user.comparePassword(password);
        if (!match) return res.render("login", { error: "Invalid email or password" });

        const token = createToken(user);
        res.cookie("token", token, { httpOnly: true, sameSite: "lax", maxAge: 24 * 60 * 60 * 1000 });

        res.redirect("/dashboard");

    } catch (err) {
        console.error(err);
        res.render("login", { error: "Server error. Try again later" });
    }
};

// ---------------- Dashboard ----------------
export const dashboard = async (req, res) => {
    res.render("dashboard", { user: req.user });
};

// ---------------- Logout ----------------
export const logoutUser = (req, res) => {
    res.clearCookie("token", { path: '/' }); // Match the path used during login
    res.redirect("/login");
};

// ---------------- Update Profile ----------------
export const updateProfile = async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email || !validator.isEmail(email)) {
        return res.render("dashboard", { user: req.user, error: "Valid name and email are required" });
    }

    try {
        const exists = await User.findOne({ email, _id: { $ne: req.user._id } });
        if (exists) {
            return res.render("dashboard", { user: req.user, error: "Email already in use" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { name, email },
            { returnDocument: 'after', runValidators: true }
        ).select("name email role userStatus");

        res.render("dashboard", { user: updatedUser, success: "Profile updated successfully" });

    } catch (err) {
        console.error(err);
        res.render("dashboard", { user: req.user, error: "Server error. Try again later" });
    }
};

// ---------------- Update Password ----------------
export const updatePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword || newPassword.length < 6) {
        return res.render("dashboard", { user: req.user, error: "Password too short or invalid" });
    }

    if (currentPassword === newPassword) {
        return res.render("dashboard", { user: req.user, error: "New password must be different" });
    }

    try {
        const user = await User.findById(req.user._id).select("password");
        if (!user) return res.render("dashboard", { user: req.user, error: "User not found" });

        const match = await bcrypt.compare(currentPassword, user.password);
        if (!match) return res.render("dashboard", { user: req.user, error: "Current password incorrect" });

        //user.password = await bcrypt.hash(newPassword, 10);
        user.password = newPassword;
        await user.save();

        res.render("dashboard", { user: req.user, success: "Password changed successfully" });

    } catch (err) {
        console.error(err);
        res.render("dashboard", { user: req.user, error: "Server error. Try again later" });
    }
};
