import { useSubredditPosts } from "../hooks/useSubredditPosts";

export default function SubredditLane({ subreddit, onDelete }) {
  const { posts, loading, error, fetchPosts } = useSubredditPosts(subreddit);

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
              className="hover:underline flex items-start gap-2"
            >
              <span className="font-bold text-sm text-purple-600">
                ↑ {post.score}
              </span>
              <span className="text-sm">{post.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
