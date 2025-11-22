export default function BugItem({ bug, onUpdate, onDelete }) {
  const { _id, title, description, status, priority } = bug;
  return (
    <li style={{ border: "1px solid #ccc", marginBottom: 8, padding: 8 }}>
      <strong>{title}</strong> [{priority}] — <em>{status}</em>
      <p>{description}</p>
      <button onClick={() => onUpdate(_id, { status: "in-progress" })}>
        Start
      </button>
      <button onClick={() => onUpdate(_id, { status: "resolved" })}>
        Resolve
      </button>
      <button onClick={() => onDelete(_id)}>Delete</button>
    </li>
  );
}
