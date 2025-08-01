import { useState } from "react";

function App() {
  const [subreddits, setSubreddits] = useState(["learnprogramming"]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Reddit Lanes</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          + Add Subreddit
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subreddits.map((sub, i) => (
          <div key={i} className="bg-white rounded shadow p-4">
            <h2 className="font-semibold mb-2">/r/{sub}</h2>
            <p>Posts will appear here...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
