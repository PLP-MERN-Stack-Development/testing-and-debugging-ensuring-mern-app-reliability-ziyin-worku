import { render, screen } from "@testing-library/react";
import BugList from "../components/BugList.jsx";

test("renders empty state when no bugs", () => {
  render(<BugList bugs={[]} onUpdate={() => {}} onDelete={() => {}} />);
  expect(screen.getByText(/no bugs reported/i)).toBeInTheDocument();
});

test("renders list items", () => {
  const bugs = [
    {
      _id: "1",
      title: "A",
      description: "desc A",
      status: "open",
      priority: "low",
    },
    {
      _id: "2",
      title: "B",
      description: "desc B",
      status: "resolved",
      priority: "high",
    },
  ];
  render(<BugList bugs={bugs} onUpdate={() => {}} onDelete={() => {}} />);
  expect(screen.getByText(/A/)).toBeInTheDocument();
  expect(screen.getByText(/B/)).toBeInTheDocument();
});
