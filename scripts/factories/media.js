function mediaFactory(data) {
        const { photographerId, title, image, like, date, price } = data;
        console.log('image:', image)

        const picture = `assets/medias/${image}`;

        function getUserCardMediaDOM() {
                const article = document.createElement('article');

                const img = document.createElement('img');
                img.setAttribute("src", picture)

                const p2 = document.createElement('p');
                p2.textContent = title;

                article.appendChild(img);
                article.appendChild(p2);

                return (article);
        }

        return { getUserCardMediaDOM }
}