const express = require('express')
const router = express.Router()
const authController = require("../Controllers/auth-controller")
const authMiddleware = require("../middleware/auth-middleware")
router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/user").get(authMiddleware, authController.user);
module.exports = router;