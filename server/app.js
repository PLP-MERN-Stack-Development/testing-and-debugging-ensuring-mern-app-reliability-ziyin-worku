const express = require("express");
const cors = require("cors");
const bugsRouter = require("./routes/bugs");
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/bugs", bugsRouter);

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
