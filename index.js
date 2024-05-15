document.getElementById("publicarBtn").addEventListener("click", (e) => {
  e.preventDefault();

  const post = document.getElementById("post").value;
  const categoria = document.getElementById("categoria").value;
  const img1 = document.getElementById("img1").value;
  const img2 = document.getElementById("img2").value;
  const img3 = document.getElementById("img3").value;
  const imgsList = [];

  if (img1 != "") {
    imgsList.push(img1);
  }
  if (img2 != "") {
    imgsList.push(img2);
  }
  if (img3 != "") {
    imgsList.push(img3);
  }

  const div = document.createElement("div");
  div.className = "postContainer";

  const postText = document.createElement("p");
  postText.innerText = post;

  let id = Math.random().toString(16).slice(2)

  const imagesCarrouselDiv = document.createElement("div");
  imagesCarrouselDiv.className = "carousel slide carouselContainer";
  imagesCarrouselDiv.id = `carouselDiv-${id}`;

  const carouselInner = document.createElement("div");
  carouselInner.className = "carousel-inner";

  const carouselItemActive = document.createElement("div");
  carouselItemActive.className = "carousel-item active";
  carouselItemActive.style.width = "100%";

  const imageActive = document.createElement("img");
  imageActive.src = imgsList[0];
  imageActive.className = "postImage";

  carouselItemActive.appendChild(imageActive);
  carouselInner.appendChild(carouselItemActive);

  if (imgsList.length > 1) {
    for (let i = 1; i < imgsList.length; i++) {
      const carouselItemIf = document.createElement("div");
      carouselItemIf.className = "carousel-item";

      const imageIf = document.createElement("img");
      imageIf.src = imgsList[i];
      imageIf.className = "postImage";

      carouselItemIf.appendChild(imageIf);
      carouselInner.appendChild(carouselItemIf);
    }
    const buttonLeftDiv = document.createElement("button");
    buttonLeftDiv.className = "carousel-control-prev";
    buttonLeftDiv.type = "button";
    buttonLeftDiv.setAttribute("data-bs-target", `#carouselDiv-${id}`);
    buttonLeftDiv.setAttribute("data-bs-slide", "prev");

    const buttonLeft = document.createElement("span");
    buttonLeft.className = "carousel-control-prev-icon";
    buttonLeft.setAttribute("aria-hidden", "true");

    buttonLeftDiv.appendChild(buttonLeft);

    const buttonRightDiv = document.createElement("button");
    buttonRightDiv.className = "carousel-control-next";
    buttonRightDiv.type = "button";
    buttonRightDiv.setAttribute("data-bs-target", `#carouselDiv-${id}`);
    buttonRightDiv.setAttribute("data-bs-slide", "next");

    const buttonRight = document.createElement("span");
    buttonRight.className = "carousel-control-next-icon";
    buttonRight.setAttribute("aria-hidden", "true");

    buttonRightDiv.appendChild(buttonRight);

    imagesCarrouselDiv.append(carouselInner, buttonLeftDiv, buttonRightDiv);
  }else{
    imagesCarrouselDiv.append(carouselInner);
  }

  const categoryText = document.createElement("p");
  categoryText.innerText = `Categoria: ${categoria}`

  const data = new Date();
  const time = document.createElement("p");
  time.innerText = `Data e Hora: ${data.toLocaleString("pt-BR")}`; 

  div.append(postText, imagesCarrouselDiv, categoryText, time);

  const posts = document.getElementById("posts");
  posts.appendChild(div);
});
