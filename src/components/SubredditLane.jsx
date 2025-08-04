import { useState, useRef, useEffect } from "react";
import { useSubredditPosts } from "../hooks/useSubredditPosts";

export default function SubredditLane({ subreddit, onDelete }) {
  const { posts, loading, error, refresh } = useSubredditPosts(subreddit);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white rounded shadow p-4 relative">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">/r/{subreddit}</h2>
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-gray-500 dark:text-gray-300 cursor-pointer hover:text-black dark:hover:text-white 
             text-2xl leading-none px-2 py-1 rounded-full transition-colors 
             hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Toggle menu"
          >
            ⋮
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-lg border border-gray-200 
               bg-white dark:bg-gray-800 shadow-md animate-dropdownIn"
            >
              <button
                onClick={() => {
                  refresh();
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 cursor-pointer hover:bg-gray-100 hover:rounded-lg dark:hover:bg-gray-700"
              >
                Refresh
              </button>
              <button
                onClick={() => {
                  onDelete(subreddit);
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 cursor-pointer hover:bg-red-50 hover:rounded-lg dark:hover:bg-red-900"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {error && error.includes("mock") && (
        <div className="text-xs text-yellow-500 italic mb-2">
          Showing mock data
        </div>
      )}

      <ul className="space-y-2 mt-2">
        {posts.map((post) => (
          <li key={post.id}>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:underline flex flex-col gap-1"
            >
              <span className="text-sm">{post.title}</span>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold text-purple-600">
                  ↑ {post.score}
                </span>
                <span className="text-gray-500">💬 {post.num_comments}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
