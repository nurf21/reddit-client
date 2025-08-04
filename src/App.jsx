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
