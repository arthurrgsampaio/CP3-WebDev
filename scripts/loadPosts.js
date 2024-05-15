import { fakeDb } from "../service/fakeDb.js";
import { editPost } from "./editPost.js";
import { deletePost } from "./deletePost.js";

export const loadPosts = () => {
  const posts = document.getElementById("posts");
  posts.style.display = "flex";

  fakeDb.posts.forEach((post) => {
    if (!post.carregado) {
      const div = document.createElement("div");
      div.className = "postContainer";

      const postText = document.createElement("p");
      postText.innerText = post.text;
      postText.id = `postText-${post.id}`;

      const categoryText = document.createElement("p");
      categoryText.innerText = `Categoria: ${post.categoria}`;

      const data = new Date();
      const time = document.createElement("p");
      time.innerText = `Data e Hora: ${data.toLocaleString("pt-BR")}`;

      const buttonsDiv = document.createElement("div");
      buttonsDiv.className = "buttonsDiv";

      const editButton = document.createElement("button");
      editButton.innerText = "Editar";
      editButton.className = "btn btn-primary";
      editButton.setAttribute("data-bs-toggle", "modal");
      editButton.setAttribute("data-bs-target", `#editModal-${post.id}`);

      const excluirButton = document.createElement("button");
      excluirButton.innerText = "Excluir";
      excluirButton.className = "btn btn-danger";  
      excluirButton.addEventListener("click", () => {
        div.remove();
        deletePost(post.id);
        if(fakeDb.posts.length == 0) {
          posts.style.display = "none";
        } 
      });

      buttonsDiv.append(editButton, excluirButton);

      const modalDiv = document.createElement("div");
      modalDiv.className = "modal";
      modalDiv.id = `editModal-${post.id}`;
      modalDiv.setAttribute("tabindex", "-1");
      modalDiv.setAttribute("aria-labelledby", "editModalLabel");
      modalDiv.setAttribute("aria-hidden", "true");

      const modalDialog = document.createElement("div");
      modalDialog.className = "modal-dialog";

      const modalContent = document.createElement("div");
      modalContent.className = "modal-content";

      const modalHeader = document.createElement("div");
      modalHeader.className = "modal-header";

      const modalTitle = document.createElement("h5");
      modalTitle.className = "modal-title";
      modalTitle.innerText = "Editar Post";

      const modalCloseButton = document.createElement("button");
      modalCloseButton.type = "button";
      modalCloseButton.className = "btn-close";
      modalCloseButton.setAttribute("data-bs-dismiss", "modal");
      modalCloseButton.setAttribute("aria-label", "Close");

      modalHeader.append(modalTitle, modalCloseButton);

      const modalBody = document.createElement("div");
      modalBody.className = "modal-body";

      const modalBodyDiv = document.createElement("div");
      modalBodyDiv.className = "editInputDiv";

      const modalBodyLabel = document.createElement("label");
      modalBodyLabel.className = "form-label";
      modalBodyLabel.innerText = "Texto do Post";

      const modalBodyInput = document.createElement("input");
      modalBodyInput.type = "text";
      modalBodyInput.className = "form-control";

      modalBodyDiv.append(modalBodyLabel, modalBodyInput);

      modalBody.append(modalBodyDiv);

      const modalFooter = document.createElement("div");
      modalFooter.className = "modal-footer";

      const modalFooterButton = document.createElement("button");
      modalFooterButton.type = "button";
      modalFooterButton.className = "btn btn-primary";
      modalFooterButton.setAttribute("data-bs-dismiss", "modal");
      modalFooterButton.innerText = "Salvar";
      modalFooterButton.addEventListener("click", () => {
        if (modalBodyInput.value != "") {
          editPost(post.id, {...post, text: modalBodyInput.value, carregado: true});
          document.getElementById(`postText-${post.id}`).innerText = modalBodyInput.value;
          modalBodyInput.value = "";
        }
      });

      modalFooter.append(modalFooterButton);

      modalContent.append(modalHeader, modalBody, modalFooter);

      modalDialog.append(modalContent);

      modalDiv.append(modalDialog);

      if (post.imgsList.length == 0) {
        div.append(postText, categoryText, time, buttonsDiv, modalDiv);
      } else {
        const imagesCarrouselDiv = document.createElement("div");
        imagesCarrouselDiv.className = "carousel slide carouselContainer";
        imagesCarrouselDiv.id = `carouselDiv-${post.id}`;

        const carouselInner = document.createElement("div");
        carouselInner.className = "carousel-inner";

        const carouselItemActive = document.createElement("div");
        carouselItemActive.className = "carousel-item active";
        carouselItemActive.style.width = "100%";

        const imageActive = document.createElement("img");
        imageActive.src = post.imgsList[0];
        imageActive.className = "postImage";

        carouselItemActive.appendChild(imageActive);
        carouselInner.appendChild(carouselItemActive);

        if (post.imgsList.length > 1) {
          for (let i = 1; i < post.imgsList.length; i++) {
            const carouselItemIf = document.createElement("div");
            carouselItemIf.className = "carousel-item";

            const imageIf = document.createElement("img");
            imageIf.src = post.imgsList[i];
            imageIf.className = "postImage";

            carouselItemIf.appendChild(imageIf);
            carouselInner.appendChild(carouselItemIf);
          }
          const buttonLeftDiv = document.createElement("button");
          buttonLeftDiv.className = "carousel-control-prev";
          buttonLeftDiv.type = "button";
          buttonLeftDiv.setAttribute("data-bs-target", `#carouselDiv-${post.id}`);
          buttonLeftDiv.setAttribute("data-bs-slide", "prev");

          const buttonLeft = document.createElement("span");
          buttonLeft.className = "carousel-control-prev-icon";
          buttonLeft.setAttribute("aria-hidden", "true");

          buttonLeftDiv.appendChild(buttonLeft);

          const buttonRightDiv = document.createElement("button");
          buttonRightDiv.className = "carousel-control-next";
          buttonRightDiv.type = "button";
          buttonRightDiv.setAttribute("data-bs-target", `#carouselDiv-${post.id}`);
          buttonRightDiv.setAttribute("data-bs-slide", "next");

          const buttonRight = document.createElement("span");
          buttonRight.className = "carousel-control-next-icon";
          buttonRight.setAttribute("aria-hidden", "true");

          buttonRightDiv.appendChild(buttonRight);

          imagesCarrouselDiv.append(
            carouselInner,
            buttonLeftDiv,
            buttonRightDiv
          );
        } else {
          imagesCarrouselDiv.append(carouselInner);
        }

        div.append(postText, imagesCarrouselDiv, categoryText, time, buttonsDiv, modalDiv);
      }

      
      posts.appendChild(div);
    
      editPost(post.id, {...post, carregado: true})
    }
  });
};
