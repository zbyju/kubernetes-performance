import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { fetchPosts } from "../services/api";
import { latestPosts, posts } from "../stores/posts";
import Card from "./Card";

export default function ListPosts() {
  const $posts = useStore(latestPosts);

  async function initPosts() {
    posts.set(await fetchPosts());
  }

  useEffect(() => {
    initPosts();
  }, []);

  return (
    <div className="list-posts">
      {$posts && $posts.length > 1 ? (
        $posts.map((p) => <Card post={p} openable key={p.id} />)
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
}
