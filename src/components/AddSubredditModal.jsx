import { useEffect, useRef, useState } from "react";

export default function AddSubredditModal({ onAdd, onClose, existingSubs }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter") handleAdd();
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [input]);

  const handleAdd = async () => {
    const sub = input.trim().toLowerCase();
    if (!sub) return;

    if (existingSubs.includes(sub)) {
      setError("Subreddit already added.");
      return;
    }

    try {
      const res = await fetch(`https://api.reddit.com/r/${sub}.json`);
      if (!res.ok) throw new Error();
      onAdd(sub);
      setInput("");
      setError("");
      onClose();
    } catch {
      setError("Subreddit not found.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-10"
      role="dialog"
      aria-modal="true"
      aria-label="Add Subreddit Modal"
    >
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg font-semibold mb-2">Enter subreddit name</h2>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
          placeholder="e.g. javascript"
          aria-label="Subreddit name"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-500 hover:text-black"
          >
            Cancel <span className="sr-only">(Escape)</span>
          </button>
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add <span className="sr-only">(Enter)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
