
const jwt = require("jsonwebtoken");
const UserRegister = require("../Models/auth-models");

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res
            .status(401)
            .json({ message: "Unauthorized HTTP, Token not provided" });
    }

    console.log("token middleware", token);

    // Remove "Bearer " from token
    const jwtToken = token.replace("Bearer ", "");

    try {
        // Verifying the token
        const isVerified = jwt.verify(jwtToken, process.env.SECRET_KEY);

        // Getting the complete user details & also we don't want password to be sent
        const userData = await UserRegister.findOne({ email: isVerified.email }).select({
            password: 0,
        });

        req.token = token;
        req.user = userData;
        req.userID = userData._id;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
};

module.exports = authMiddleware;
