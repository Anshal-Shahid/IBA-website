const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
    const token = req.cookies.token; // Get token from cookies

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.userId;
        } catch (error) {
            req.userId = null; // If token is invalid, set user as not logged in
        }
    } else {
        req.userId = null; // If no token, user is not logged in
    }

    next(); // Move to the next middleware or route
});

module.exports = { authMiddleware };
