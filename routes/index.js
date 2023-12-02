var express = require("express");

var router = express.Router();
const authUserRouter = require("./auth-user");
const authAdminUserRouter = require("./auth-admin-user");
const userRouter = require("./user");
const adminUserRouter = require("./admin-user");
const logoutRouter = require("./logout");
const authUserMiddleware = require("../middlewares/auth.user.middleware");
const authAdminUserMiddleware = require("../middlewares/auth.admin-user.middleware");

router.use("/auth", authUserRouter);
router.use("/auth-admin", authAdminUserRouter);
router.use("/user", authUserMiddleware, userRouter);
router.use("/admin-user", authAdminUserMiddleware, adminUserRouter);
router.use("/logout", logoutRouter);

module.exports = router;
