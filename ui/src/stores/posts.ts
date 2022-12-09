import { atom } from "nanostores";
import type { Post } from "../types/post.types";

export const posts = atom<Post[]>([]);
