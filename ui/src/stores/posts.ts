import { atom, computed } from "nanostores";
import type { Post } from "../types/post.types";

export const posts = atom<Post[]>([]);

export const latestPosts = computed(posts, (list) => list.slice(0, 19));
