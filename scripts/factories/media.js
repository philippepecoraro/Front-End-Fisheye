export default function mediaFactory(data) {
        const { title, image, video, likes, date } = data;

        const picture = `assets/medias/${image}`;
        const mediaVideo = `assets/medias/${video}`;

        function getUserCardMediaDOM() {

                const select = document.querySelector(".media-selection");
                select.style.display = "block";
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
                icone.innerHTML = `<i class="fas fa-heart" style = "color: #901C1C"></i>`;

                article.appendChild(a);
                article.appendChild(div1);
                div1.appendChild(div);
                div1.appendChild(nbLikes);
                nbLikes.appendChild(totalLike);
                nbLikes.appendChild(icone);

                return (article);
        }

        return { getUserCardMediaDOM }
}