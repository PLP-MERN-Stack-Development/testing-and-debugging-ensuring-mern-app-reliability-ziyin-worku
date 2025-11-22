const { validateBugInput } = require("../../helpers/validation");

describe("validateBugInput", () => {
  test("valid input passes", () => {
    const result = validateBugInput({
      title: "Fix navbar",
      description: "Navbar overlaps content on mobile view",
      status: "open",
      priority: "high",
    });
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test("invalid title/description produce errors", () => {
    const result = validateBugInput({
      title: "Hi",
      description: "Too short",
    });
    expect(result.isValid).toBe(false);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        "Title must be at least 3 characters.",
        "Description must be at least 10 characters.",
      ])
    );
  });

  test("invalid enums produce errors", () => {
    const result = validateBugInput({
      title: "Bug",
      description: "Valid description content.",
      status: "blocked",
      priority: "urgent",
    });
    expect(result.isValid).toBe(false);
    expect(result.errors).toEqual(
      expect.arrayContaining(["Invalid status.", "Invalid priority."])
    );
  });
});
