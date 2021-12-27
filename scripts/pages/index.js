import photographerFactory from "../factories/photographer.js";
async function getPhotographers() {
    try {
        const response = await fetch('/data/photographers.json');
        if (!response.ok) {
            throw new Error(response.status);
        } else {
            const photographers = await response.json();
            console.log('photographers:', photographers);
            return photographers;
        }
    } catch (error) {
        console.error(error);
    }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        console.log('photographer:', photographer)
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
