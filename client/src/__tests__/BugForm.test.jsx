import { render, screen, fireEvent } from "@testing-library/react";
import BugForm from "../components/BugForm.jsx";

test("shows validation errors for short inputs", async () => {
  const mockSubmit = jest.fn();
  render(<BugForm onSubmit={mockSubmit} />);

  const title = screen.getByLabelText("title");
  const desc = screen.getByLabelText("description");
  const button = screen.getByRole("button", { name: /report bug/i });

  fireEvent.change(title, { target: { value: "Hi" } });
  fireEvent.change(desc, { target: { value: "short" } });
  fireEvent.click(button);

  expect(await screen.findByRole("alert")).toBeInTheDocument();
  expect(mockSubmit).not.toHaveBeenCalled();
});

test("submits valid form and resets fields", async () => {
  const mockSubmit = jest.fn().mockResolvedValueOnce({});
  render(<BugForm onSubmit={mockSubmit} />);

  fireEvent.change(screen.getByLabelText("title"), {
    target: { value: "Bug Title" },
  });
  fireEvent.change(screen.getByLabelText("description"), {
    target: { value: "Long enough description" },
  });
  fireEvent.click(screen.getByRole("button", { name: /report bug/i }));

  expect(mockSubmit).toHaveBeenCalledWith(
    expect.objectContaining({
      title: "Bug Title",
      description: "Long enough description",
    })
  );
});
