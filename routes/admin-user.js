var express = require("express");
var router = express.Router();

const {
  getUserList,
  deleteUser,
  verifiedAdminuser,
} = require("../controllers/adminUserController");

router.get("/verify-user", verifiedAdminuser);
router.get("/user-list", getUserList);
router.post("/delete-user/:id", deleteUser);

module.exports = router;
