import mediaFactory from "../factories/media.js";
import photographerDataFactory from "../factories/photographerData.js";
const parsedUrl = new URL(window.location.href);
const urlProduit = parsedUrl.searchParams.get("id");

fetch('/data/photographers.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then(data => {
    data.photographers.forEach((photographer) => {
      if (photographer.id == urlProduit) {
        const photographHeader = document.querySelector(".photograph-header");
        const mediaModel1 = photographerDataFactory(photographer);
        const userCardMediaPhotographerDOM = mediaModel1.getUserCardPhotographerDOM();
        photographHeader.appendChild(userCardMediaPhotographerDOM);
      }
    })

    data.media.forEach((media) => {
      if (media.photographerId == urlProduit) {
        const photographHeader = document.querySelector(".photograph-body");
        const mediaModel = mediaFactory(media);
        const userCardMediaDOM = mediaModel.getUserCardMediaDOM();
        photographHeader.appendChild(userCardMediaDOM);
      }
    });
  })
  .catch((error) => {
    console.error(error);
  });