function validateBugInput({ title, description, status, priority }) {
  const errors = [];
  if (!title || title.trim().length < 3)
    errors.push("Title must be at least 3 characters.");
  if (!description || description.trim().length < 10)
    errors.push("Description must be at least 10 characters.");
  if (status && !["open", "in-progress", "resolved"].includes(status))
    errors.push("Invalid status.");
  if (priority && !["low", "medium", "high"].includes(priority))
    errors.push("Invalid priority.");
  return { isValid: errors.length === 0, errors };
}

module.exports = { validateBugInput };
