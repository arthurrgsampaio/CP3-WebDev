import { postsDb } from "../service/fakeDb.js"

export const editPost = (id, body) => {
  let target = postsDb.posts.findIndex((post) => {
    return post.id === id;
  });

  postsDb.posts[target] = body;
}