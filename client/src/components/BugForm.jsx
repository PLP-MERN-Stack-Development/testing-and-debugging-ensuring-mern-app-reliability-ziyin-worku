import { useState } from "react";

const initial = {
  title: "",
  description: "",
  status: "open",
  priority: "medium",
};

export default function BugForm({ onSubmit }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState([]);

  function validateLocal({ title, description }) {
    const e = [];
    if (title.trim().length < 3) e.push("Title must be at least 3 characters.");
    if (description.trim().length < 10)
      e.push("Description must be at least 10 characters.");
    return e;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const eList = validateLocal(form);
    if (eList.length) return setErrors(eList);
    setErrors([]);
    await onSubmit(form);
    setForm(initial);
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 16 }}>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        aria-label="title"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        aria-label="description"
      />
      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        aria-label="status"
      >
        <option value="open">open</option>
        <option value="in-progress">in-progress</option>
        <option value="resolved">resolved</option>
      </select>
      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        aria-label="priority"
      >
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>
      <button type="submit">Report Bug</button>

      {errors.length > 0 && (
        <ul role="alert">
          {errors.map((err, i) => (
            <li key={i} style={{ color: "red" }}>
              {err}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
