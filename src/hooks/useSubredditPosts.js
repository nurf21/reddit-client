import { useState, useCallback, useEffect } from "react";

export function useSubredditPosts(subreddit) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [after, setAfter] = useState(null);
  const [before, setBefore] = useState(null);

  const fetchPosts = useCallback(
    async (direction = "initial") => {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();
      if (direction === "next" && after) params.set("after", after);
      if (direction === "prev" && before) params.set("before", before);
      params.set("limit", 10);

      try {
        const url = `https://www.reddit.com/r/${subreddit}.json?${params.toString()}`;
        const response = await fetch(url);
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

        setPosts(postItems);
        setAfter(data.data.after);
        setBefore(data.data.before);
      } catch (err) {
        setError(err.message || "Failed to fetch posts.");
        setPosts([]);
      } finally {
        setLoading(false);
      }
    },
    [subreddit, after, before]
  );

  useEffect(() => {
    fetchPosts("initial");
  }, [fetchPosts]);

  return {
    posts,
    loading,
    error,
    fetchPosts,
    nextPage: () => fetchPosts("next"),
    prevPage: () => fetchPosts("prev"),
    hasNext: !!after,
    hasPrev: !!before,
  };
}
