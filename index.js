document.getElementById("publicarBtn").addEventListener("click", (e) => {
    e.preventDefault();

    const post = document.getElementById("post").value;
    const categoria = document.getElementById("categoria").value;
    const img1 = document.getElementById("img1").value;
    const img2 = document.getElementById("img2").value;
    const img3 = document.getElementById("img3").value;
    const imgsList = [];

    if(img1 != ""){
        imgsList.push(img1);
    }
    if(img2 != ""){
        imgsList.push(img2);
    }
    if(img3 != ""){
        imgsList.push(img3);
    }

    const div = document.createElement("div");
    div.className = "postContainer";

    const postText = document.createElement("p");
    postText.innerText = post;

    const imagesCarrouselDiv = document.createElement("div");
    imagesCarrouselDiv.className = "carousel slide carouselContainer";
    imagesCarrouselDiv.id = "carouselDiv"

    const carouselInner = document.createElement("div");
    carouselInner.className = "carousel-inner";

    const carouselItemActive = document.createElement("div");
    carouselItemActive.className = "carousel-item active";

    const imageActive = document.createElement("img");
    imageActive.src = imgsList[0];

    carouselItemActive.appendChild(imageActive);
    carouselInner.appendChild(carouselItemActive);

    if(imgsList.length > 1){
        for(let i = 1; i < imgsList.length; i++){  
            const carouselItemIf = document.createElement("div");
            carouselItemIf.className = "carousel-item";

            const imageIf = document.createElement("img");
            imageIf.src = imgsList[i];

            carouselItemIf.appendChild(imageIf);
            carouselInner.appendChild(carouselItemIf);
        }
    }
    
    imagesCarrouselDiv.appendChild(carouselInner);

    const buttonLeft = document.createElement("button");
    buttonLeft.className = "carousel-control-prev";
    buttonLeft.type = "button";
    buttonLeft.setAttribute("data-bs-target", "#carouselDiv");
    buttonLeft.setAttribute("data-bs-slide", "prev");

    const buttonRight = document.createElement("button");
    buttonRight.className = "carousel-control-next";
    buttonRight.type = "button";
    buttonRight.setAttribute("data-bs-target", "#carouselDiv");
    buttonRight.setAttribute("data-bs-slide", "next");


    div.append(postText)
});