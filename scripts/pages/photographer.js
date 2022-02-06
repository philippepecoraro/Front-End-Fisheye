import mediaFactory from "../factories/media.js";
import photographerDataFactory from "../factories/photographerData.js";
import { lightbox } from "../utils/lightbox.js";

const parsedUrl = new URL(window.location.href);
const urlProduit = parsedUrl.searchParams.get("id");
let photographBody = document.querySelector(".photograph-body");
let mediaTab = [];
let likesTab = [];
let totalLikes = 0;

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
            }
        });
        // Add all likes
        for (let i = 0; i < mediaTab.length; i++) {
            totalLikes += mediaTab[i].likes;
        }

        // insert total likes into HTML
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
        // Enter Key for lightbox
        photographBodyMedia.forEach((item, index) => {
            item.addEventListener("keyup", function (e) {
                if (e.key === 'Enter') {
                    ligthboxImage(e, index, photographBodyMedia);
                }
            });
        });
    })

    .catch((error) => {
        console.error(error);
    });

// Display photograph data after filter
let mediaLikesFilterTab = [];
let videosImagesFilterTab = [];
function mediaTabFactory(mediaTab) {
    const articlePhotographBody = document.querySelectorAll(".photograph-body article");
    articlePhotographBody.forEach((item) => {
        item.remove();
    })
    mediaLikesFilterTab = [];
    totalLikes = 0;
    videosImagesFilterTab = [];
    mediaTab.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const userCardMediaDOM2 = mediaModel.getUserCardMediaDOM();
        photographBody.appendChild(userCardMediaDOM2);
        mediaLikesFilterTab.push(media.likes);
        videosImagesFilterTab.push(media.image, media.video);
    })
    // Add all likes
    for (let i = 0; i < mediaLikesFilterTab.length; i++) {
        totalLikes += mediaLikesFilterTab[i];
    }
    // remove undefined
    videosImagesFilterTab.filter(function (e1) {
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
    // Enter Key for lightbox
    photographBodyMediaFilter.forEach((item, index) => {
        item.addEventListener("keyup", function (e) {
            if (e.key === 'Enter') {
                ligthboxImage(e, index, photographBodyMediaFilter);
            }
        });
    });
}

// Listener on likes icones callback
let dataIdVal = 0;
let popular = false;
let date = false;
let title = false;
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

// sent paramaters to lightbox function
function ligthboxImage(e, index, photographBodyMedia) {
    e.preventDefault();
    lightbox(mediaTab, photographBodyMedia, index);
}

// Likes sort
function likesFilter() {
    mediaTab.sort(function (a, b) {
        return (b.likes > a.likes) ? 1 : -1;
    })
}
// Dates sort
function dateFilter() {
    mediaTab.sort(function (a, b) {
        return (b.date > a.date) ? 1 : -1;
    })
}
// Titles sort
function titleFilter() {
    mediaTab.sort(function (a, b) {
        return (a.title > b.title) ? 1 : -1;
    })
}

const mediaSelect = document.querySelector(".media-select");
const mediaMenu = document.querySelector(".media-menu");
const dropdownClose = document.querySelector("#dropdown-close");
const dropdownOpen = document.querySelector("#dropdown-open");
const listbox1 = document.querySelector("#listbox1-1");
const listbox2 = document.querySelector("#listbox1-2");
const listbox3 = document.querySelector("#listbox1-3");
const ul = document.querySelector("ul");
const listboxBtn = document.querySelector("#listbox1");

// command Keys
function escapeKey(e) {
    if (e.key === "Escape") {
        mediaMenu.blur();
        dropdownMenuClose(e)
    }
}
function enterKeyListbox1(e) {
    if (e.key === "Enter") {
        popularMenu(e);
        mediaSelect.focus();
    }
}
function enterKeyListbox2(e) {
    if (e.key === "Enter") {
        dateMenu(e);
        mediaSelect.focus();
    }
}
function enterKeyListbox3(e) {
    if (e.key === "Enter") {
        titleMenu(e);
        mediaSelect.focus();
    }
}
function enterKeyDropdown(e) {
    if (e.key === "Enter") {
        dropdownMenu(e);
        mediaMenu.focus();
    }
}
function enterKeyDropdownClose(e) {
    if (e.key === "Enter") {
        dropdownMenuClose(e);
    }
}

// Open dropdown
mediaMenu.addEventListener("click", dropdownMenuClose);
const mediaDropdown = document.querySelector(".media-dropdown");
function dropdownMenu(e) {
    e.preventDefault();
    mediaDropdown.style.display = "block";
    mediaMenu.style.display = "block";
    dropdownClose.style.display = "block";
    mediaSelect.style.display = "none";
    dropdownOpen.style.display = "none";
    document.addEventListener("keyup", escapeKey);
    mediaMenu.focus();
}
dropdownOpen.addEventListener("click", dropdownMenu);
listboxBtn.addEventListener("click", dropdownMenu);

// Close dropdown
function dropdownMenuClose(e) {
    e.preventDefault();
    mediaDropdown.style.display = "none";
    mediaMenu.style.display = "none";
    mediaSelect.style.display = "block";
    dropdownClose.style.display = "none";
    dropdownOpen.style.display = "block";
    document.removeEventListener("keyup", escapeKey);
}
dropdownClose.addEventListener("click", dropdownMenuClose);

// Like selected on listbox
function popularMenu(e) {
    e.preventDefault();
    likesFilter();
    mediaTabFactory(mediaTab);
    popular = true;
    ul.removeAttribute("aria-activedescendant");
    ul.setAttribute("aria-activedescendant", "listbox1-1")
    listbox1.setAttribute("aria-selected", "true");
    listbox2.removeAttribute("aria-selected");
    listbox3.removeAttribute("aria-selected");
    mediaSelect.innerHTML = "Popularité";
    dropdownMenuClose(e);
}
// Date selected on listbox
function dateMenu(e) {
    e.preventDefault();
    dateFilter();
    mediaTabFactory(mediaTab);
    date = true;
    ul.removeAttribute("aria-activedescendant");
    ul.setAttribute("aria-activedescendant", "listbox1-2");
    listbox2.setAttribute("aria-selected", "true");
    listbox1.removeAttribute("aria-selected");
    listbox3.removeAttribute("aria-selected");
    mediaSelect.innerHTML = "Date";
    dropdownMenuClose(e);
}
// Title selected on listbox
function titleMenu(e) {
    e.preventDefault();
    titleFilter();
    mediaTabFactory(mediaTab);
    title = true;
    ul.removeAttribute("aria-activedescendant");
    ul.setAttribute("aria-activedescendant", "listbox1-3");
    listbox3.setAttribute("aria-selected", "true");
    listbox1.removeAttribute("aria-selected");
    listbox2.removeAttribute("aria-selected");
    mediaSelect.innerHTML = "Titre";
    dropdownMenuClose(e);
}
// Listener on listbox
listbox1.addEventListener("click", popularMenu);
listbox2.addEventListener("click", dateMenu);
listbox3.addEventListener("click", titleMenu);

// Listener for keyboard
listbox1.addEventListener("keyup", enterKeyListbox1);
listbox2.addEventListener("keyup", enterKeyListbox2);
listbox3.addEventListener("keyup", enterKeyListbox3);
dropdownOpen.addEventListener("keyup", enterKeyDropdown);
dropdownClose.addEventListener("keyup", enterKeyDropdownClose);


