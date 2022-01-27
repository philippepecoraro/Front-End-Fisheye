import mediaFactory from "../factories/media.js";
import photographerDataFactory from "../factories/photographerData.js";
import { lightbox } from "../utils/lightbox.js";

const parsedUrl = new URL(window.location.href);
const urlProduit = parsedUrl.searchParams.get("id");
let photographBody = document.querySelector(".photograph-body");
let mediaTab = [];
let likesTab = [];
let totalLikes = 0;
let videosImagesTab = [];
fetch('data/photographers.json')
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
                const staticDataIcone = document.querySelector(".total-data-price");
                staticDataIcone.innerHTML = `<p>${photographer.price}€/jour</p>`;
            }
        })
        data.media.forEach((media) => {
            if (media.photographerId == urlProduit) {
                photographBody = document.querySelector(".photograph-body");
                const mediaModel = mediaFactory(media);
                const userCardMediaDOM = mediaModel.getUserCardMediaDOM();
                photographBody.appendChild(userCardMediaDOM);
                mediaTab.push(media);
                likesTab.push(media.likes);
                videosImagesTab.push(media.image, media.video);
            }
        });
        // Add all likes
        for (let i = 0; i < mediaTab.length; i++) {
            totalLikes += mediaTab[i].likes;
        }

        document.querySelector(".total-data-totallikes").innerHTML = `<p>${totalLikes}</p>`;
        document.querySelector(".total-data-icone").innerHTML = `<img src="assets/icons/total_heart.svg" alt="like" />`;

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

        // Set attribute data-number to icone class
        icones.forEach((item) => {
            item.setAttribute("data-number", "0");
        })

        // Listener on likes icones
        icones.forEach((item) => item.addEventListener("click", likeToggle));
        //   console.log('icones:', icones)

        // Select ligthbox image       
        const photographBodyMedia = document.querySelectorAll(".photograph-body-media");
        photographBodyMedia.forEach((item, index) => {
            item.addEventListener("click", function (e) {
                ligthboxImage(e, index, photographBodyMedia);
            });
        });
        photographBodyMedia.forEach((item, index) => {
            item.addEventListener("keyup", function (e) {
                if (e.key === 'Enter') {
                    ligthboxImage(e, index, photographBodyMedia);
                    console.log("onKeyUp");
                }
            });
        });
    })

    .catch((error) => {
        console.error(error);
    });

let mediaFilterTab = [];
let mediaLikesFilterTab = [];
let videosImagesTab2 = [];
let videosImagesFilterTab = [];
function mediaTabFactory(mediaTab) {
    console.log('mediaTab:', mediaTab)
    const articlePhotographBody = document.querySelectorAll(".photograph-body article");
    console.log('articlePhotograph:', articlePhotographBody)
    articlePhotographBody.forEach((item) => {
        item.remove();
    })
    mediaFilterTab = [];
    mediaLikesFilterTab = [];
    totalLikes = 0;
    videosImagesFilterTab = [];
    videosImagesTab2 = [];
    mediaTab.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const userCardMediaDOM2 = mediaModel.getUserCardMediaDOM();
        photographBody.appendChild(userCardMediaDOM2);
        mediaFilterTab.push(media);
        mediaLikesFilterTab.push(media.likes);
        videosImagesFilterTab.push(media.image, media.video);
    })

    for (let i = 0; i < mediaLikesFilterTab.length; i++) {
        totalLikes += mediaLikesFilterTab[i];
    }
    // remove undefined
    videosImagesTab2 = videosImagesFilterTab.filter(function (e1) {
        return e1 != undefined;
    })

    document.querySelector(".total-data-totallikes").innerHTML = `<p>${totalLikes}</p>`;

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
    icones.forEach((item) => item.addEventListener("click", likeToggle));

    // Select ligthbox image   
    const photographBodyMediaFilter = document.querySelectorAll(".photograph-body-media");
    photographBodyMediaFilter.forEach((item, index) => {
        item.addEventListener("click", function (e) {
            ligthboxImage(e, index, photographBodyMediaFilter);
        });
    });
    photographBodyMediaFilter.forEach((item, index) => {
        item.addEventListener("keyup", function (e) {
            if (e.key === 'Enter') {
                ligthboxImage(e, index, photographBodyMediaFilter);
                console.log("onKeyUp");
            }
        });
    });
}

// Listener on likes icones callback
let dataIdVal = 0;
function likeToggle(e) {
    e.preventDefault();
    let dataId = e.currentTarget.getAttribute("data-id");
    dataId = parseInt(dataId, 10);
    let dataNumber = e.currentTarget.getAttribute("data-number");
    dataIdVal = mediaLikesFilterTab[dataId];

    if (popular || date || title) {
        likesTab = mediaLikesFilterTab;

    } else if (!popular && !date && !title) {
        dataIdVal = likesTab[dataId];
    }
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
    likesIncrement(dataId, likesTab, dataIdVal);
}

// Increment likes to HTML
function likesIncrement(dataId, likesTab, dataIdVal) {
    likesTab.splice(dataId, 1, dataIdVal);
    const nbLikesValue = document.querySelector(`.like[data-id='${dataId}'] p`);
    const dataTabSplice = `<p>${dataIdVal}</p>`;
    nbLikesValue.innerHTML = dataTabSplice;
    totalLikesIncrement(likesTab);
}

// Increment all likes to HTML
function totalLikesIncrement(likesTab) {
    let totalLikesTab1 = 0;
    for (let i = 0; i < likesTab.length; i++) {
        totalLikesTab1 += likesTab[i];
    }
    document.querySelector(".total-data-totallikes").innerHTML = `<p>${totalLikesTab1}</p>`;
}

function ligthboxImage(e, index, photographBodyMedia) {
    e.preventDefault();
    lightbox(mediaTab, photographBodyMedia, index);
}

let popular = false;
let date = false;
let title = false;
const elt = document.querySelector('#media-selection');
elt.addEventListener('change', function () {
    switch (this.selectedIndex) {
        case 0:
            likesFilter();
            mediaTabFactory(mediaTab);
            popular = true;
            break;
        case 1:
            dateFilter();
            mediaTabFactory(mediaTab);
            date = true;
            break;
        case 2:
            titleFilter();
            mediaTabFactory(mediaTab);
            title = true;
            break;
        default:
            console.log("default");
    }
})

function likesFilter() {
    const mediaTabSort2 = mediaTab.sort(function (a, b) {
        return (b.likes > a.likes) ? 1 : -1;
    })
    console.log('mediaTabSort2:', mediaTabSort2)
}

function dateFilter() {
    const dateFilter2 = mediaTab.sort(function (a, b) {
        return (b.date > a.date) ? 1 : -1;
    })
    console.log('dateFilter2:', dateFilter2)
}

function titleFilter() {
    const mediaTabSort3 = mediaTab.sort(function (a, b) {
        return (a.title > b.title) ? 1 : -1;
    })
    console.log('mediaTabSort3:', mediaTabSort3);
}
