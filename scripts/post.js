import { postsDb } from "../service/fakeDb.js";

export const post = () => {
  let text = document.getElementById("post").value;
  let categoria = document.getElementById("categoria").value;
  let img1 = document.getElementById("img1").value;
  let img2 = document.getElementById("img2").value;
  let img3 = document.getElementById("img3").value;
  let imgsList = [];
  let id = Math.random().toString(16).slice(2);
  let data = new Date().toLocaleString("pt-BR");

  if (img1 != "") {
    imgsList.push(img1);
  }
  if (img2 != "") {
    imgsList.push(img2);
  }
  if (img3 != "") {
    imgsList.push(img3);
  }

  const formattedPost = {
    text: text != "" ? text : "*Post sem texto*",
    categoria: categoria != "" ? categoria : "Não definida",
    imgsList,
    data,
    carregado: false,
    id
  }

  postsDb.posts.push(formattedPost);

  const postClear = document.getElementById("post");
  const categoriaClear = document.getElementById("categoria");
  const img1Clear = document.getElementById("img1");
  const img2Clear = document.getElementById("img2");
  const img3Clear = document.getElementById("img3");

  postClear.value = "";
  categoriaClear.value = "";
  img1Clear.value = ""
  img2Clear.value = "";
  img3Clear.value = "";
};
