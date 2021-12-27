export default function mediaFactory(data) {
        const { photographerId, title, image, video, like, date, price } = data;
        console.log('image:', image)

        const picture = `assets/medias/${image}`;
        const mediaVideo = `assets/medias/${video}`;

        function getUserCardMediaDOM() {
                const article = document.createElement('article');
                const a = document.createElement('a');

                if (image) {
                        const img = document.createElement('img');
                        img.setAttribute("src", picture)
                        a.href = picture;
                        a.appendChild(img);
                }
                if (video) {
                        const miniature = document.createElement('video');
                        miniature.setAttribute("src", mediaVideo);
                        miniature.setAttribute("preload", "auto");
                        a.href = mediaVideo;
                        a.appendChild(miniature);
                }

                const div = document.createElement('div');
                div.className = "media-title";
                div.innerHTML = `<p>${title}</p>`;

                article.appendChild(a);
                article.appendChild(div);

                return (article);
        }

        return { getUserCardMediaDOM }
}