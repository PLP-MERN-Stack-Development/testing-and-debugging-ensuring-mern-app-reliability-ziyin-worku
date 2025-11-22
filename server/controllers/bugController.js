const Bug = require("../models/Bug");
const { validateBugInput } = require("../helpers/validation");

async function createBug(req, res, next) {
  try {
    const { isValid, errors } = validateBugInput(req.body);
    if (!isValid) return res.status(400).json({ errors });

    const bug = await Bug.create(req.body);
    res.status(201).json(bug);
  } catch (err) {
    next(err);
  }
}

async function getBugs(req, res, next) {
  try {
    const bugs = await Bug.find().sort({ createdAt: -1 });
    res.json(bugs);
  } catch (err) {
    next(err);
  }
}

async function updateBug(req, res, next) {
  try {
    const { id } = req.params;
    const { isValid, errors } = validateBugInput({
      ...req.body,
      title: req.body.title ?? "tmp",
      description: req.body.description ?? "temporary content",
    });
    if (!isValid) return res.status(400).json({ errors });

    const updated = await Bug.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Bug not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

async function deleteBug(req, res, next) {
  try {
    const { id } = req.params;
    const result = await Bug.deleteOne({ _id: id });
    if (result.deletedCount === 0)
      return res.status(404).json({ message: "Bug not found" });
    res.json({ deleted: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { createBug, getBugs, updateBug, deleteBug };
