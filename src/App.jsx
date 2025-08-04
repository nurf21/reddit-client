import { useEffect, useState } from "react";
import AddSubredditModal from "./components/AddSubredditModal";
import SubredditLane from "./components/SubredditLane";

function App() {
  const [subreddits, setSubreddits] = useState([]);
  const [showModal, setShowModal] = useState(false);

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

  const handleDeleteSubreddit = (sub) => {
    setSubreddits(subreddits.filter((s) => s !== sub));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black text-black dark:text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Reddit Lanes</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-2xl shadow cursor-pointer hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add Subreddit
        </button>
      </div>

      {showModal && (
        <AddSubredditModal
          existingSubs={subreddits}
          onAdd={(sub) => setSubreddits([...subreddits, sub])}
          onClose={() => setShowModal(false)}
        />
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
