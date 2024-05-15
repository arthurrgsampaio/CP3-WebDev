import { postsDb, filterDb } from "../service/fakeDb.js";
import { editPost } from "./editPost.js";
import { deletePost } from "./deletePost.js";

export const loadPosts = () => {
  // Exibe a div de posts
  const posts = document.getElementById("posts");
  posts.style.display = "flex";

  // Coloca na tela os posts que ainda não foram carregados
  postsDb.posts.forEach((post) => {
    if (!post.carregado) {
      const filtroDiv = document.getElementById("filtroDiv");

      const filtro = document.getElementById("filtro");

      if (!filterDb.includes(post.categoria)) {
        const option = document.createElement("option");
        option.value = post.categoria;
        option.text = post.categoria;

        filterDb.push(post.categoria);

        filtro.appendChild(option);
      }

      filtroDiv.appendChild(filtro);

      // Cria o post
      const div = document.createElement("div");
      div.className = "postContainer";

      const postText = document.createElement("p");
      postText.innerText = post.text;
      postText.id = `postText-${post.id}`;

      const categoryText = document.createElement("p");
      categoryText.innerText = `Categoria: ${post.categoria}`;

      const time = document.createElement("p");
      time.innerText = `Data e Hora: ${post.data}`;

      // Cria os botões dos modais de edição e deleção
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
      excluirButton.setAttribute("data-bs-toggle", "modal");
      excluirButton.setAttribute("data-bs-target", `#excludeModal-${post.id}`);

      buttonsDiv.append(editButton, excluirButton);

      //Modal de edição do post
      const editModalDiv = document.createElement("div");
      editModalDiv.className = "modal";
      editModalDiv.id = `editModal-${post.id}`;
      editModalDiv.setAttribute("tabindex", "-1");
      editModalDiv.setAttribute("aria-labelledby", "editModalLabel");
      editModalDiv.setAttribute("aria-hidden", "true");

      const editModalDialog = document.createElement("div");
      editModalDialog.className = "modal-dialog";

      const editModalContent = document.createElement("div");
      editModalContent.className = "modal-content";

      const editModalHeader = document.createElement("div");
      editModalHeader.className = "modal-header";

      const editModalTitle = document.createElement("h5");
      editModalTitle.className = "modal-title";
      editModalTitle.innerText = "Editar Post";

      const editModalCloseButton = document.createElement("button");
      editModalCloseButton.type = "button";
      editModalCloseButton.className = "btn-close";
      editModalCloseButton.setAttribute("data-bs-dismiss", "modal");
      editModalCloseButton.setAttribute("aria-label", "Close");

      editModalHeader.append(editModalTitle, editModalCloseButton);

      const editModalBody = document.createElement("div");
      editModalBody.className = "modal-body";

      const editModalBodyDiv = document.createElement("div");
      editModalBodyDiv.className = "editInputDiv";

      const editModalBodyLabel = document.createElement("label");
      editModalBodyLabel.className = "form-label";
      editModalBodyLabel.innerText = "Texto do Post";

      const editModalBodyInput = document.createElement("input");
      editModalBodyInput.type = "text";
      editModalBodyInput.className = "form-control";

      editModalBodyDiv.append(editModalBodyLabel, editModalBodyInput);

      editModalBody.append(editModalBodyDiv);

      const editModalFooter = document.createElement("div");
      editModalFooter.className = "modal-footer";

      const editModalFooterButton = document.createElement("button");
      editModalFooterButton.type = "button";
      editModalFooterButton.className = "btn btn-primary";
      editModalFooterButton.setAttribute("data-bs-dismiss", "modal");
      editModalFooterButton.innerText = "Salvar";
      // Realiza a edição do texto do post
      editModalFooterButton.addEventListener("click", () => {
        if (editModalBodyInput.value != "") {
          editPost(post.id, {
            ...post,
            text: editModalBodyInput.value,
            carregado: true,
          });
          document.getElementById(`postText-${post.id}`).innerText =
            editModalBodyInput.value;
          editModalBodyInput.value = "";
        }
      });

      editModalFooter.append(editModalFooterButton);
      editModalContent.append(editModalHeader, editModalBody, editModalFooter);
      editModalDialog.append(editModalContent);
      editModalDiv.append(editModalDialog);

      //Modal de exclusão do post
      const excludeModalDiv = document.createElement("div");
      excludeModalDiv.className = "modal";
      excludeModalDiv.id = `excludeModal-${post.id}`;
      excludeModalDiv.setAttribute("tabindex", "-1");
      excludeModalDiv.setAttribute("aria-labelledby", "excludeModalLabel");
      excludeModalDiv.setAttribute("aria-hidden", "true");

      const excludeModalDialog = document.createElement("div");
      excludeModalDialog.className = "modal-dialog";

      const excludeModalContent = document.createElement("div");
      excludeModalContent.className = "modal-content";

      const excludeModalHeader = document.createElement("div");
      excludeModalHeader.className = "modal-header";

      const excludeModalTitle = document.createElement("h5");
      excludeModalTitle.className = "modal-title";
      excludeModalTitle.innerText = "Excluir Post";

      const excludeModalCloseButton = document.createElement("button");
      excludeModalCloseButton.type = "button";
      excludeModalCloseButton.className = "btn-close";
      excludeModalCloseButton.setAttribute("data-bs-dismiss", "modal");
      excludeModalCloseButton.setAttribute("aria-label", "Close");

      excludeModalHeader.append(excludeModalTitle, excludeModalCloseButton);

      const excludeModalBody = document.createElement("div");
      excludeModalBody.className = "modal-body";
      excludeModalBody.innerText = "Deseja realmente excluir este post?";

      const excludeModalFooter = document.createElement("div");
      excludeModalFooter.className = "modal-footer";

      const excludeModalFooterButton = document.createElement("button");
      excludeModalFooterButton.type = "button";
      excludeModalFooterButton.className = "btn btn-danger";
      excludeModalFooterButton.setAttribute("data-bs-dismiss", "modal");
      excludeModalFooterButton.innerText = "Sim, excluir";
      // Realiza a exclusão do post
      excludeModalFooterButton.addEventListener("click", () => {
        div.remove();
        deletePost(post.id);
        if (postsDb.posts.length == 0) {
          posts.style.display = "none";
        }
      });

      const excludeModalFooterButtonCancel = document.createElement("button");
      excludeModalFooterButtonCancel.type = "button";
      excludeModalFooterButtonCancel.className = "btn btn-secondary";
      excludeModalFooterButtonCancel.setAttribute("data-bs-dismiss", "modal");
      excludeModalFooterButtonCancel.innerText = "Cancelar";

      excludeModalFooter.append(
        excludeModalFooterButtonCancel,
        excludeModalFooterButton
      );
      excludeModalContent.append(
        excludeModalHeader,
        excludeModalBody,
        excludeModalFooter
      );
      excludeModalDialog.append(excludeModalContent);
      excludeModalDiv.append(excludeModalDialog);

      // Verifica se o post possui imagens
      if (post.imgsList.length == 0) {
        div.append(
          postText,
          categoryText,
          time,
          buttonsDiv,
          editModalDiv,
          excludeModalDiv
        );
      } else {
        // Cria o carrossel de imagens
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

        // Garante a criação de carrouseis condizenteds com a quantidade de imagens
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
          buttonLeftDiv.setAttribute(
            "data-bs-target",
            `#carouselDiv-${post.id}`
          );
          buttonLeftDiv.setAttribute("data-bs-slide", "prev");

          const buttonLeft = document.createElement("span");
          buttonLeft.className = "carousel-control-prev-icon";
          buttonLeft.setAttribute("aria-hidden", "true");

          buttonLeftDiv.appendChild(buttonLeft);

          const buttonRightDiv = document.createElement("button");
          buttonRightDiv.className = "carousel-control-next";
          buttonRightDiv.type = "button";
          buttonRightDiv.setAttribute(
            "data-bs-target",
            `#carouselDiv-${post.id}`
          );
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

        // Adiciona os elementos à div
        div.append(
          postText,
          imagesCarrouselDiv,
          categoryText,
          time,
          buttonsDiv,
          editModalDiv,
          excludeModalDiv
        );
      }

      // Adiciona a div ao container de posts
      posts.appendChild(div);

      // Marca o post como carregado
      editPost(post.id, { ...post, carregado: true });
    }
  });
};
