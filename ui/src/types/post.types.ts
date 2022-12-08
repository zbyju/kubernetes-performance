export interface Post {
  id: number;
  createdAt: Date;
  body: string;
  author: string;
  upvotes: number;
  downvotes: number;
}

export interface PostWithComments extends Post {
  comments: Comment[];
}

export interface Comment {
  id: number;
  postId: number;
  createdAt: Date;
  body: string;
  author: string;
}
