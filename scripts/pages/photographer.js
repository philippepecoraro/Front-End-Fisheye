import mediaFactory from "../factories/media.js";
import photographerDataFactory from "../factories/photographerData.js";
import { openLightbox } from "../utils/lightbox.js";

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
                const staticDataIcone = document.querySelector(".static-data-price");
                staticDataIcone.innerHTML = `<p>${photographer.price}€/jour</p>`;
            }
        })
        let tab = [];

        let totalLikes = 0;
        data.media.forEach((media) => {
            if (media.photographerId == urlProduit) {
                const photographHeader = document.querySelector(".photograph-body");
                const mediaModel = mediaFactory(media);
                const userCardMediaDOM = mediaModel.getUserCardMediaDOM();
                photographHeader.appendChild(userCardMediaDOM);
                tab.push(media);
            }
        });

        for (let i = 0; i < tab.length; i++) {
            totalLikes += tab[i].likes;
        }
        document.querySelector(".static-data-totallikes").innerHTML = `<p>${totalLikes}</p>`;
        document.querySelector(".static-data-icone").innerHTML = `<img src="assets/icons/total_heart.svg" />`;

        const icone = document.querySelectorAll(".icone");
        icone.forEach((item) => item.addEventListener("click", (e) => {
            e.preventDefault();
            const iconeTarget = e.target;
            likesIncrement(iconeTarget);
        }))
        const photographBodyImg = document.querySelectorAll(".photograph-body-img");
        photographBodyImg.forEach((item) => item.addEventListener("click", (e) => {
            e.preventDefault();
            const imgTarget = e.target.getAttribute("src");
            openLightbox(imgTarget);
        }))
    })
    .catch((error) => {
        console.error(error);
    });

function likesIncrement(target) {
    console.log('target:', target)

}


