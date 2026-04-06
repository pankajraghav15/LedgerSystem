import { validateToken } from "../services/userAuth.js";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.redirect("/login");

        const decoded = validateToken(token);
        if (!decoded) return res.redirect("/login");

        const user = await User.findById(decoded._id).select("-password");
        if (!user) return res.redirect("/login");

        req.user = user;
        next();
    } catch (err) {
        console.error(err);
        res.redirect("/login");
    }
};
