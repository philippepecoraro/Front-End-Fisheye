export default function photographerDataFactory(data) {
    const { name, city, country, tagline, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardPhotographerDOM() {
        const photographHeader = document.querySelector(".photograph-header");

        const btn = document.querySelector(".contact_button");

        const photographData = document.createElement('div');
        photographData.className = "photograph-header-data";

        const article = document.createElement('article');

        const h1 = document.createElement('h1');
        h1.textContent = name;

        const div = document.createElement('div');
        div.className = "photograph-header-data-location";
        div.innerHTML = `<p>${city}, ${country}</p>`;

        const div1 = document.createElement('div');
        div1.className = "photograph-header-data-tagline";
        div1.innerHTML = `<p>${tagline}</p>`;

        const photographPortrait = document.createElement('div');
        photographPortrait.className = "photograph-header-image";

        const img = document.createElement('img');

        const picture1 = picture.slice(0, -4);
        img.setAttribute("src", `${picture1}.png`);

        photographHeader.insertBefore(photographData, btn);
        photographData.appendChild(article);
        article.appendChild(h1);
        article.appendChild(div);
        article.appendChild(div1);
        photographPortrait.appendChild(img);

        return (photographPortrait);
    }
    return { getUserCardPhotographerDOM };


}