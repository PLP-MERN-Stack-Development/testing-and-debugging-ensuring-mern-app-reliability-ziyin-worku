const express = require("express");
const {
  createBug,
  getBugs,
  updateBug,
  deleteBug,
} = require("../controllers/bugController");

const router = express.Router();

router.get("/", getBugs);
router.post("/", createBug);
router.patch("/:id", updateBug);
router.delete("/:id", deleteBug);

module.exports = router;
