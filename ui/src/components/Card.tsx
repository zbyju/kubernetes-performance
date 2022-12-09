import moment from "moment";
import { useState } from "react";
import { downvotePost, upvotePost } from "../services/api";
import type { Post } from "../types/post.types";

export interface Props {
  post: Post;
  href?: string;
}

export default function Card({ post, href }: Props) {
  const time = moment(post.createdAt).format("DD.MM.YYYY HH:mm:ss");
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

  return (
    <div className="card">
      {href !== undefined ? <a href={href}>{body}</a> : body}
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
        <span className={`votes votes-${post.id}`}>{upvotes - downvotes}</span>
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
  );
}
