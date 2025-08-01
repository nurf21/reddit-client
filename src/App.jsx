import { useEffect, useState } from "react";
import SubredditLane from "./components/SubredditLane";

function App() {
  const [subreddits, setSubreddits] = useState([]);
  const [newSubreddit, setNewSubreddit] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  // Load saved subreddits from localStorage
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("subreddits"));
      if (Array.isArray(saved) && saved.length > 0) {
        setSubreddits(saved);
      } else {
        setSubreddits(["learnprogramming"]);
      }
    } catch (e) {
      console.error("Failed to load from localStorage:", e);
      setSubreddits(["learnprogramming"]);
    }
  }, []);

  // Save subreddits to localStorage
  useEffect(() => {
    localStorage.setItem("subreddits", JSON.stringify(subreddits));
  }, [subreddits]);

  const handleAddSubreddit = () => {
    const sub = newSubreddit.trim().toLowerCase();
    if (!sub) return;
    if (subreddits.includes(sub)) {
      setError("Subreddit already added.");
      return;
    }

    // Validate subreddit by trying to fetch
    fetch(`https://www.reddit.com/r/${sub}.json`)
      .then((res) => {
        if (!res.ok) throw new Error("Subreddit not found");
        return res.json();
      })
      .then(() => {
        setSubreddits([...subreddits, sub]);
        setNewSubreddit("");
        setError("");
        setShowModal(false);
      })
      .catch(() => {
        setError("Subreddit not found.");
      });
  };

  const handleDeleteSubreddit = (sub) => {
    setSubreddits(subreddits.filter((s) => s !== sub));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Reddit Lanes</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Add Subreddit
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-lg font-semibold mb-2">
              Enter the name of subreddit
            </h2>
            <input
              type="text"
              value={newSubreddit}
              onChange={(e) => setNewSubreddit(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
              placeholder="e.g. javascript"
            />
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-500 hover:text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleAddSubreddit}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Subreddit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {subreddits.map((sub) => (
          <SubredditLane
            key={sub}
            subreddit={sub}
            onDelete={handleDeleteSubreddit}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
