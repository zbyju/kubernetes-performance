import { useState } from "react";
import { saveComment, savePost } from "../services/api";
import { generateUserId } from "../services/user";
import { posts } from "../stores/posts";
import type { Comment } from "../types/post.types";

interface Props {
  postId: number;
  onAdd?: (_: Comment) => any;
}

export default function AddComment({ postId, onAdd }: Props) {
  const [body, setBody] = useState("");
  return (
    <div className="add-post">
      <input
        type="text"
        className="add-post-input"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <input
        type="submit"
        className="add-post-submit"
        value="Post"
        onClick={async () => {
          let id = window.localStorage.getItem("userId");
          if (!id) {
            id = generateUserId();
            window.localStorage.setItem("userId", id);
          }
          const comment = await saveComment(postId, body, id);
          onAdd && onAdd(comment);
          setBody("");
        }}
      />
    </div>
  );
}
