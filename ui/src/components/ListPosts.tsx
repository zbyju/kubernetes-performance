import { useStore } from "@nanostores/react";
import { useEffect } from "react";
import { fetchPosts } from "../services/api";
import { posts } from "../stores/posts";
import Card from "./Card";

export default function ListPosts() {
  const $posts = useStore(posts);

  async function initPosts() {
    const tmp = await fetchPosts();
    posts.set(tmp);
  }

  useEffect(() => {
    initPosts();
  }, []);

  return (
    <div className="list-posts">
      {$posts && $posts.length > 1 ? (
        $posts.map((p) => <Card post={p} href={"/posts/" + p.id} key={p.id} />)
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
}
