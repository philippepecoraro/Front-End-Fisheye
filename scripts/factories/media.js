export default function mediaFactory(data) {
    const { title, image, video, likes } = data;
    const picture = `assets/medias/${image}`;
    const mediaVideo = `assets/medias/${video}`;

    function getUserCardMediaDOM() {
        const select = document.querySelector(".media-selection");
        select.style.display = "block";
        const article = document.createElement('article');
        const div3 = document.createElement('div');
        div3.className = "photograph-body-media";
        div3.setAttribute('tabindex', '0');

        if (image) {
            div3.innerHTML = `<img src="${picture}" alt="${title}" />`;
            article.appendChild(div3);
        }
        if (video) {
            div3.innerHTML = `<video src="${mediaVideo}" preload="auto" alt="${title}"
            aria-label="${title}"></video>`
            article.appendChild(div3);
        }

        article.appendChild(div3);
        const div1 = document.createElement('div');
        div1.className = "media-info";

        const div = document.createElement('div');
        div.className = "media-title";
        div.innerHTML = `<p>${title}</p>`;
        div.setAttribute('tabindex', "0");

        const nbLikes = document.createElement('div');
        nbLikes.className = "media-nb-likes";
        nbLikes.setAttribute('tabindex', '0');

        const totalLike = document.createElement('div');
        totalLike.className = "like";
        totalLike.innerHTML = `<p>${likes}</P>`;

        const icone = document.createElement('div');
        icone.className = "icone";
        icone.innerHTML = `<img src="assets/icons/heart.svg" alt="likes" />`

        article.appendChild(div1);
        div1.appendChild(div);
        div1.appendChild(nbLikes);
        nbLikes.appendChild(totalLike);
        nbLikes.appendChild(icone);

        return (article);
    }

    return { getUserCardMediaDOM }
}