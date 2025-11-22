function notFoundHandler(req, res, next) {
  res.status(404).json({ message: "Route not found" });
}

function errorHandler(err, req, res, next) {
  console.error("🔴 Error:", err); // Debug log
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
}

module.exports = { errorHandler, notFoundHandler };
