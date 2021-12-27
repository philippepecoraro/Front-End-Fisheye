import mediaFactory from "../factories/media.js";
const parsedUrl = new URL(window.location.href);
const urlProduit = parsedUrl.searchParams.get("id");
console.log('urlProduit:', urlProduit);

fetch('/data/photographers.json')
  // .then(response => response.json())
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then(data => {
    console.log("data.media:", data.media)
    data.media.forEach((media) => {
      if (media.photographerId == urlProduit) {
        console.log("media.photographerId:", media.photographerId);
        console.log("media:", media);

        const photographHeader = document.querySelector(".photograph-header")
        const mediaModel = mediaFactory(media);
        const userCardMediaDOM = mediaModel.getUserCardMediaDOM();
        photographHeader.appendChild(userCardMediaDOM);
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });