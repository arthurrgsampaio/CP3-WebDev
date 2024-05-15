import { postsDb } from "../service/fakeDb.js";

export const deletePost = (id) => {
  const newDb = postsDb.posts.filter((post) => post.id !== id);

  postsDb.posts = newDb;
}; 