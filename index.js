import { filterPosts } from "./scripts/filterPosts.js";
import { loadPosts } from "./scripts/loadPosts.js";
import { post } from "./scripts/post.js";

document.getElementById("publicarBtn").addEventListener("click", (e) => {
  e.preventDefault(); 
  post();
  loadPosts();
});   

document.getElementById("filtro").addEventListener("change", (e) => {
  const filterList = filterPosts(e.target.value);
  
});