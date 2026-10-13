import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization header received:", Boolean(authHeader));

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authentication required. Please login."
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        console.log("JWT secret loaded:", Boolean(process.env.JWT_SECRET));
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (error) {
        console.log("JWT verification error:", error.message);
        return res.status(401).json({
            message: "Invalid or expired token. Please login again."
        });
    }
};

export default authMiddleware;