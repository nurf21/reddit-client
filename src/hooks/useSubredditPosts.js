import { useState, useCallback, useEffect } from "react";

export function useSubredditPosts(subreddit) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://www.reddit.com/r/${subreddit}.json`
      );
      if (!response.ok) throw new Error(`Subreddit "${subreddit}" not found`);
      const data = await response.json();
      const postItems = data.data.children.map((p) => ({
        id: p.data.id,
        title: p.data.title,
        score: p.data.ups,
        url: `https://reddit.com${p.data.permalink}`,
      }));
      setPosts(postItems);
    } catch (err) {
      setError(err.message || "Failed to fetch posts.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [subreddit]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, error, fetchPosts };
}
