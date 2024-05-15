import { loadPosts } from "./scripts/loadPosts.js";
import { post } from "./scripts/post.js";

document.getElementById("publicarBtn").addEventListener("click", (e) => {
  e.preventDefault(); 
  post();
  loadPosts();
});   
