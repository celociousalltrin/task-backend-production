exports.admin_notification_count = (message) => {
  global.io.emit("admin_notification_count", message);
};
