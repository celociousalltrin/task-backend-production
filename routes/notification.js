var express = require("express");
var router = express.Router();

const {
  getNotificationList,
  readNotification,
  clearSingleNotification,
  clearNotifications,
} = require("../controllers/notificationController");

router.get("/notifications", getNotificationList);
router.put("/read-notification/:id", readNotification);
router.put("/clear-single-notification/:id", clearSingleNotification);
router.put("/clear-notifications", clearNotifications);

module.exports = router;
