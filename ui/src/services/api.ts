import axios from "axios";
import type { Post, Comment } from "../types/post.types";

function mapPost(p: any): Post {
  return {
    id: p.Id,
    createdAt: p.Created_at,
    body: p.Body,
    author: p.Author,
    upvotes: p.Upvotes,
    downvotes: p.Downvotes,
  };
}

function mapComment(c: any): Comment {
  return {
    id: c.Id,
    postId: c.PostId,
    createdAt: c.Created_at,
    body: c.Body,
    author: c.Author,
  };
}

const baseApiUrl = "http://host.docker.internal:4000";

export async function fetchPosts(): Promise<Post[]> {
  return axios
    .get(baseApiUrl + "/api/posts")
    .then((res) => res.data.map((p: any) => mapPost(p)));
}

export async function fetchPost(id: number): Promise<Post> {
  return axios
    .get(baseApiUrl + "/api/posts/" + id)
    .then((res) => mapPost(res.data));
}

export async function fetchComments(postId: number): Promise<Comment[]> {
  return axios
    .get(baseApiUrl + "/api/posts/" + postId + "/comments")
    .then((res) => res.data.map((c: any) => mapComment(c)));
}

export async function upvotePost(postId: number): Promise<Post> {
  return axios.put(baseApiUrl + "/api/posts/" + postId + "/upvote");
}

export async function downvotePost(postId: number): Promise<Post> {
  return axios.put(baseApiUrl + "/api/posts/" + postId + "/downvote");
}

export async function savePost(body: string, userId: string): Promise<Post> {
  return axios
    .post(baseApiUrl + "/api/posts", {
      body,
      author: userId,
    })
    .then((res) => mapPost(res.data));
}
