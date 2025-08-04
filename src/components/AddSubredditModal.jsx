import { useCallback, useEffect, useRef, useState } from "react";

export default function AddSubredditModal({ onAdd, onClose, existingSubs }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleAdd = useCallback(async () => {
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
    } catch {
      setError("Subreddit not found.");
    }
  }, [input, existingSubs, onAdd]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter") handleAdd();
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [handleAdd, onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/40 dark:bg-black/70 flex justify-center items-center z-10"
      role="dialog"
      aria-modal="true"
      aria-label="Add Subreddit Modal"
    >
      <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded shadow-md w-80 animate-fadeIn">
        <h2 className="text-lg font-semibold mb-2">Enter subreddit name</h2>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-3 py-2 mb-3"
          placeholder="e.g. javascript"
          aria-label="Subreddit name"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-500 dark:text-gray-300 cursor-pointer hover:text-black dark:hover:text-white"
          >
            Cancel <span className="sr-only">(Escape)</span>
          </button>
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm cursor-pointer hover:bg-blue-600"
          >
            Add <span className="sr-only">(Enter)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
