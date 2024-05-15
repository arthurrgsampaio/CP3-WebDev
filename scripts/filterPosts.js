import { postsDb } from "../service/fakeDb.js";
import { editPost } from "./editPost.js";
import { loadPosts } from "./loadPosts.js";

export const filterPosts = (filter) => {
  const postList = document.getElementById("posts");
  while (postList.firstChild) {
    postList.removeChild(postList.firstChild);
  }

  if (filter == "Todos") {
    postsDb.posts.forEach((post) => {
      editPost(post.id, { ...post, carregado: false });
    });
  }else{
    postsDb.posts.forEach((post) => {
      if (post.categoria == filter) {
        editPost(post.id, { ...post, carregado: false });
      } else {
        editPost(post.id, { ...post, carregado: true });
      }
    });
  }

  loadPosts();
};
