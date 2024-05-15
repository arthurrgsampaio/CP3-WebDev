import { fakeDb } from "../service/fakeDb.js"

export const editPost = (id, body) => { 
  let target = fakeDb.posts.findIndex((post) => {
    return post.id === id;
  });

  fakeDb.posts[target] = body;
}