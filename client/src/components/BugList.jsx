import BugItem from "./BugItem.jsx";

export default function BugList({ bugs, onUpdate, onDelete }) {
  if (!bugs.length) return <p>No bugs reported yet.</p>;
  return (
    <ul>
      {bugs.map((b) => (
        <BugItem key={b._id} bug={b} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
}
