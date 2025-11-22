const request = require("supertest");
const app = require("../../app");

// Mock the Bug model
jest.mock("../../models/Bug", () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    deleteOne: jest.fn(),
  };
});

const Bug = require("../../models/Bug");

describe("Bugs API", () => {
  beforeEach(() => jest.clearAllMocks());

  test("GET /api/bugs returns list", async () => {
    Bug.find.mockResolvedValue([
      {
        _id: "1",
        title: "Bug A",
        description: "Desc A",
        status: "open",
        priority: "low",
      },
      {
        _id: "2",
        title: "Bug B",
        description: "Desc B",
        status: "resolved",
        priority: "high",
      },
    ]);
    const res = await request(app).get("/api/bugs");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(Bug.find).toHaveBeenCalled();
  });

  test("POST /api/bugs creates bug", async () => {
    const payload = {
      title: "New Bug",
      description: "Long enough description",
      status: "open",
      priority: "medium",
    };
    Bug.create.mockResolvedValue({ _id: "123", ...payload });

    const res = await request(app).post("/api/bugs").send(payload);
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("New Bug");
    expect(Bug.create).toHaveBeenCalledWith(payload);
  });

  test("PATCH /api/bugs/:id updates bug or 404", async () => {
    const payload = {
      status: "resolved",
      title: "tmp",
      description: "temporary content",
    };
    Bug.findByIdAndUpdate.mockResolvedValue({ _id: "1", ...payload });

    const res = await request(app).patch("/api/bugs/1").send(payload);
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("resolved");
    expect(Bug.findByIdAndUpdate).toHaveBeenCalled();

    Bug.findByIdAndUpdate.mockResolvedValue(null);
    const res404 = await request(app).patch("/api/bugs/404").send(payload);
    expect(res404.status).toBe(404);
  });

  test("DELETE /api/bugs/:id deletes bug or 404", async () => {
    Bug.deleteOne.mockResolvedValue({ deletedCount: 1 });
    const res = await request(app).delete("/api/bugs/1");
    expect(res.status).toBe(200);
    expect(res.body.deleted).toBe(true);

    Bug.deleteOne.mockResolvedValue({ deletedCount: 0 });
    const res404 = await request(app).delete("/api/bugs/404");
    expect(res404.status).toBe(404);
  });

  test("POST /api/bugs validates input", async () => {
    const res = await request(app)
      .post("/api/bugs")
      .send({ title: "X", description: "short" });
    expect(res.status).toBe(400);
    expect(res.body.errors).toEqual(
      expect.arrayContaining([
        "Title must be at least 3 characters.",
        "Description must be at least 10 characters.",
      ])
    );
    expect(Bug.create).not.toHaveBeenCalled();
  });
});
