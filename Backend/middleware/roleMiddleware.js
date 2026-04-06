export const authorizeRoles = (...allowedRoles) => {

    // Return a function that Express will run when API is called
    return (req, res, next) => {

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        next();
    };
};
