import { filterDb, postsDb } from "../service/fakeDb.js";

export const deletePost = (id) => {
  const newDb = postsDb.posts.filter((post) => post.id !== id);

  postsDb.posts = newDb

  if (newDb.length == 0) {
    filterDb.filter = ["Todos"];
    const filtroOptions = document.getElementById("filtro");
    while(filtroOptions.firstChild) {
      filtroOptions.removeChild(filtroOptions.firstChild);
    }
  
    const defaultOption = document.createElement("option");
    defaultOption.value = "Todos";
    defaultOption.text = "Todos";

    filtroOptions.appendChild(defaultOption);
  }
}; 