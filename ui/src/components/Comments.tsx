import { useEffect, useState } from "react";
import { fetchComments } from "../services/api";
import type { Comment } from "../types/post.types";
import AddComment from "./AddComment";

interface Props {
  postId: number;
}

export default function Comments({ postId }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);

  async function initComments() {
    setComments(await fetchComments(postId));
  }

  useEffect(() => {
    initComments();
  }, []);

  return (
    <div>
      <h2>New comment</h2>
      <AddComment
        postId={postId}
        onAdd={(comment: Comment) => {
          setComments([comment].concat(...comments));
        }}
      />
      <h2>Comments:</h2>
      <div className="post-comments">
        {comments.map((comment) => (
          <div className="post-comment" key={comment.id}>
            <p>{comment.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
