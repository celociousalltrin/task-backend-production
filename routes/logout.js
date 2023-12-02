var express = require("express");
const { logout } = require("../controllers/logoutController");
var router = express.Router();

router.get("/", logout);

module.exports = router;
