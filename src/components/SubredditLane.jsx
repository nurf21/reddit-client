import { useSubredditPosts } from "../hooks/useSubredditPosts";

export default function SubredditLane({ subreddit, onDelete }) {
  const {
    posts,
    loading,
    error,
    fetchPosts,
    nextPage,
    prevPage,
    hasNext,
    hasPrev,
  } = useSubredditPosts(subreddit);

  return (
    <div className="bg-white rounded shadow p-4 relative">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg">/r/{subreddit}</h2>
        <div className="relative group">
          <button className="text-gray-500 hover:text-black">⋮</button>
          <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg hidden group-hover:block">
            <button
              onClick={fetchPosts}
              className="block w-full px-4 py-2 text-sm hover:bg-gray-100"
            >
              Refresh
            </button>
            <button
              onClick={() => onDelete(subreddit)}
              className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {loading && <p className="text-sm text-gray-500">Loading...</p>}
      {error && <p className="text-sm text-red-500">{error}</p>}

      <ul className="space-y-2 mt-2">
        {posts.map((post) => (
          <li key={post.id}>
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex flex-col gap-1"
            >
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold text-purple-600">
                  ↑ {post.score}
                </span>
                <span className="text-gray-500">💬 {post.num_comments}</span>
              </div>
              <span className="text-sm">{post.title}</span>
            </a>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-4">
        <button
          onClick={prevPage}
          disabled={!hasPrev}
          className={`px-3 py-1 rounded ${
            hasPrev
              ? "bg-gray-200 hover:bg-gray-300"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          ← Prev
        </button>
        <button
          onClick={nextPage}
          disabled={!hasNext}
          className={`px-3 py-1 rounded ${
            hasNext
              ? "bg-gray-200 hover:bg-gray-300"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
