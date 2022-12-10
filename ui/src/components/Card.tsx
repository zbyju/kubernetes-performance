import moment from "moment";
import { useState } from "react";
import { downvotePost, upvotePost } from "../services/api";
import type { Post } from "../types/post.types";
import AddComment from "./AddComment";
import Comments from "./Comments";

export interface Props {
  post: Post;
  openable?: boolean;
}

export default function Card({ post, openable }: Props) {
  const time = moment(post.createdAt).format("DD.MM.YYYY HH:mm:ss");
  const [isOpened, setIsOpened] = useState(false);
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [downvotes, setDownvotes] = useState(post.downvotes);

  const body = (
    <div className="card-body">
      <span>
        Posted by: <i>{post.author}</i> at <i>{time}</i>
      </span>
      <p className="link-card">{post.body}</p>
    </div>
  );

  function handleOpen() {
    if (openable !== true) return;
    setIsOpened(!isOpened);
  }

  return (
    <div className="card">
      <div className="card-inner">
        {openable === true ? <a onClick={() => handleOpen()}>{body}</a> : body}
        <div className="card-voting">
          <button
            className={`up up-${post.id}`}
            onClick={() => {
              upvotePost(post.id);
              setUpvotes(upvotes + 1);
            }}
          >
            ˄
          </button>
          <span className={`votes votes-${post.id}`}>
            {upvotes - downvotes}
          </span>
          <button
            className={`down down-${post.id}`}
            onClick={() => {
              console.log("test");
              downvotePost(post.id);
              setDownvotes(downvotes + 1);
            }}
          >
            ˅
          </button>
        </div>
      </div>
      {isOpened && (
        <div className="card-comments">
          <Comments postId={post.id} />
        </div>
      )}
    </div>
  );
}
