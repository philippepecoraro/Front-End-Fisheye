export default function mediaFactory(data) {
    const { id, title, image, video, likes, date } = data;
    const picture = `assets/medias/${image}`;
    const mediaVideo = `assets/medias/${video}`;

    function getUserCardMediaDOM() {
        const select = document.querySelector(".media-selection");
        select.style.display = "block";
        const article = document.createElement('article');
        const slide = document.querySelector('.slide');

        if (image) {
            const div3 = document.createElement('div');
            div3.className = "photograph-body-img";
            div3.innerHTML = `<img src="${picture}">`;
            article.appendChild(div3);
            slide.innerHTML = `<img src="${picture}" class="image-slide">`;
        }
        if (video) {
            const miniature = document.createElement('video');
            miniature.setAttribute("src", mediaVideo);
            miniature.setAttribute("preload", "auto");
            article.appendChild(miniature);
        }

        const div1 = document.createElement('div');
        div1.className = "media-info";

        const div = document.createElement('div');
        div.className = "media-title";
        div.innerHTML = `<p>${title}</p>`;

        const nbLikes = document.createElement('div');
        nbLikes.className = "media-nb-likes";

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