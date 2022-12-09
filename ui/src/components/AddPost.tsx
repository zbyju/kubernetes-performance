import { useState } from "react";
import { savePost } from "../services/api";
import { generateUserId } from "../services/user";
import { posts } from "../stores/posts";

export default function AddPost() {
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
          const post = await savePost(body, id);
          posts.set([post].concat(...posts.get()));
          setBody("");
        }}
      />
    </div>
  );
}
