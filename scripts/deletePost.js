import { fakeDb } from "../service/fakeDb.js";

export const deletePost = (id) => {
  const newDb = fakeDb.posts.filter((post) => post.id !== id);

  fakeDb.posts = newDb;
}; 