import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App.jsx";

beforeEach(() => {
  // Mock fetch
  global.fetch = jest.fn((url, options) => {
    if (url.endsWith("/api/bugs") && !options) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              _id: "1",
              title: "Bug #1",
              description: "desc",
              status: "open",
              priority: "low",
            },
          ]),
      });
    }
    if (url.endsWith("/api/bugs") && options?.method === "POST") {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ _id: "2", ...JSON.parse(options.body) }),
      });
    }
    if (url.match(/\/api\/bugs\/\w+/) && options?.method === "PATCH") {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            _id: "1",
            title: "Bug #1",
            description: "desc",
            status: "resolved",
            priority: "low",
          }),
      });
    }
    if (url.match(/\/api\/bugs\/\w+/) && options?.method === "DELETE") {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ deleted: true }),
      });
    }
    return Promise.resolve({ ok: false, json: () => Promise.resolve({}) });
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

test("loads, updates, and deletes a bug via UI", async () => {
  render(<App />);

  // Wait for initial load
  expect(await screen.findByText("Bug #1")).toBeInTheDocument();

  // Resolve bug
  fireEvent.click(screen.getByRole("button", { name: /resolve/i }));
  await waitFor(() =>
    expect(screen.getByText(/resolved/i)).toBeInTheDocument()
  );

  // Delete bug
  fireEvent.click(screen.getByRole("button", { name: /delete/i }));
  await waitFor(() => expect(screen.queryByText("Bug #1")).toBeNull());
});
