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
        let mediaTab = [];
        let likesTab = [];
        let totalLikes = 0;
        data.media.forEach((media) => {
            if (media.photographerId == urlProduit) {
                const photographHeader = document.querySelector(".photograph-body");
                const mediaModel = mediaFactory(media);
                const userCardMediaDOM = mediaModel.getUserCardMediaDOM();
                photographHeader.appendChild(userCardMediaDOM);
                mediaTab.push(media);
                likesTab.push(media.likes);
            }
        });

        // Add all likes
        for (let i = 0; i < mediaTab.length; i++) {
            totalLikes += mediaTab[i].likes;
        }

        // Set attribute data-id to icone class
        let dataIdIcone = -1;
        const icones = document.querySelectorAll(".icone");
        icones.forEach((item) => {
            dataIdIcone++;
            item.setAttribute("data-id", `${dataIdIcone}`);
        })

        // Set attribute data-id to like class
        let dataIdNb = -1;
        const likes = document.querySelectorAll(".like");
        likes.forEach((item) => {
            dataIdNb++;
            item.setAttribute("data-id", `${dataIdNb}`);
        })
        icones.forEach((item) => {
            item.setAttribute("data-number", "0");
        })

        // Listener on likes icones
        icones.forEach((item) => item.addEventListener("click", (e) => {
            e.preventDefault();
            let dataId = e.currentTarget.getAttribute("data-id");
            dataId = parseInt(dataId, 10);
            let dataNumber = e.currentTarget.getAttribute("data-number");
            let dataIdVal = likesTab[dataId];

            // + or - likes calcul
            if (dataNumber == 1) {
                dataIdVal--;
                totalLikes--;
                e.currentTarget.setAttribute("data-number", "0");

            } else if (dataNumber == 0) {
                dataIdVal++;
                totalLikes++;
                e.currentTarget.setAttribute("data-number", "1");
            }

            likesIncrement(dataId, totalLikes, likesTab, dataIdVal);
        }))

        // Insert all of likes in HTML
        document.querySelector(".static-data-totallikes").innerHTML = `<p>${totalLikes}</p>`;
        document.querySelector(".static-data-icone").innerHTML = `<img src="assets/icons/total_heart.svg" />`;


        // Select ligthbox image
        document.querySelectorAll(".photograph-body-img").forEach((item) => item.addEventListener("click", (e) => {
            e.preventDefault();
            const imgTarget = e.target.getAttribute("src");
            openLightbox(imgTarget);
        }))
    })
    .catch((error) => {
        console.error(error);
    });

// Increment likes to HTML
function likesIncrement(dataId, totalLikes, likesTab, dataIdVal) {
    likesTab.splice(dataId, 1, dataIdVal);
    const nbLikesValue = document.querySelector(`.like[data-id='${dataId}'] p`);
    const dataTabSplice = `<p>${dataIdVal}</p>`;
    nbLikesValue.innerHTML = dataTabSplice;
    totalLikesIncrement(likesTab);
}
// Increment all of likes to HTML
function totalLikesIncrement(likesTab) {
    let totalLikesTab1 = 0;
    for (let i = 0; i < likesTab.length; i++) {
        totalLikesTab1 += likesTab[i];
    }
    document.querySelector(".static-data-totallikes").innerHTML = `<p>${totalLikesTab1}</p>`;
}


