var express = require("express");
var router = express.Router();

const { verifieduser } = require("../controllers/userController");

router.get("/verify-user", verifieduser);

module.exports = router;
