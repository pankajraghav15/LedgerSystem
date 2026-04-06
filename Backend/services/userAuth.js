import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || "pankaj_test_secret_123";
const TOKEN_EXPIRES = "1d";

// Create JWT token
export const createToken = (user) => {
    const payload = { _id: user._id, role: user.role };
    return jwt.sign(payload, secret, { expiresIn: TOKEN_EXPIRES });
};

// Verify JWT token
export const validateToken = (token) => {
    try {
        return jwt.verify(token, secret);
    } catch (err) {
        console.log("JWT Error:", err.message);
        return null;
    }
};
