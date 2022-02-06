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

        const span = document.createElement('span');
        span.setAttribute('tabindex', '2');
        span.appendChild(h1);

        document.querySelector(".photographerName").innerHTML = `${name}`;

        const div = document.createElement('div');
        div.setAttribute('tabindex', '3');

        const div1 = document.createElement('div');
        div1.className = "photograph-header-data-location";
        div1.innerHTML = `<p>${city}, ${country}</p>`;

        const div2 = document.createElement('div');
        div2.className = "photograph-header-data-tagline";
        div2.innerHTML = `<p>${tagline}</p>`;

        const photographPortrait = document.createElement('div');
        photographPortrait.className = "photograph-header-image";
        photographPortrait.setAttribute('tabindex', '5');

        const img = document.createElement('img');

        const picture1 = picture.slice(0, -4);
        img.setAttribute("src", `${picture1}.png`);
        img.setAttribute("alt", `${name}`);

        photographHeader.insertBefore(photographData, btn);
        photographData.appendChild(article);
        article.appendChild(span);

        article.appendChild(div);
        div.appendChild(div1);
        div.appendChild(div2);
        photographPortrait.appendChild(img);

        return (photographPortrait);
    }
    return { getUserCardPhotographerDOM };


}