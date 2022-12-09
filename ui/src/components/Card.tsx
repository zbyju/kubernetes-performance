import moment from "moment";
import { useState } from "react";
import { downvotePost, upvotePost } from "../services/api";
import type { Post } from "../types/post.types";

export interface Props {
  post: Post;
  href?: string;
}

export default function Card({ post, href }: Props) {
  const time = moment(post.createdAt).format("DD.MM.YYYY hh:mm:ss");
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const [downvotes, setDownvotes] = useState(post.downvotes);

  return (
    <div className="card">
      <div className="card-body">
        <span>
          Posted by: <i>{post.author}</i> at <i>{time}</i>
        </span>
        {href === undefined ? (
          <p className="link-card">{post.body}</p>
        ) : (
          <a href={href} className="link-card">
            <p>{post.body}</p>
          </a>
        )}
      </div>
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
