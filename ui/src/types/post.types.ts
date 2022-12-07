export interface Post {
  id: number;
  body: string;
}

export interface PostWithComments extends Post {
  comments: Comment[];
}

export interface Comment {
  body: string;
}
