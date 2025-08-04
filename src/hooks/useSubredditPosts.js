import { useState, useCallback, useEffect, useRef } from "react";

export function useSubredditPosts(subreddit) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cacheRef = useRef(new Map());

  const fetchPosts = useCallback(
    async (forceRefresh = false) => {
      setLoading(true);
      setError("");

      if (!forceRefresh && cacheRef.current.has(subreddit)) {
        setPosts(cacheRef.current.get(subreddit));
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `https://api.reddit.com/r/${subreddit}.json`
        );
        if (!response.ok) throw new Error(`Subreddit "${subreddit}" not found`);

        const data = await response.json();
        const children = data.data.children || [];

        const postItems = children.map((p) => ({
          id: p.data.id,
          title: p.data.title,
          score: p.data.ups,
          num_comments: p.data.num_comments,
          url: `https://reddit.com${p.data.permalink}`,
        }));

        cacheRef.current.set(subreddit, postItems);
        setPosts(postItems);
      } catch (err) {
        setError(err.message || "Failed to fetch posts.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    },
    [subreddit]
  );

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    refresh: () => fetchPosts(true),
  };
}
