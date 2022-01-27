const box = document.querySelector("#photograph-lightbox");
const staticData = document.querySelector(".total-data");
const slide = document.querySelector(".slide");


function lightbox(mediaTab, photographBodyMedia, index) {
    let link = photographBodyMedia[index];
    let bodyMediaLength = 0;
    for (let i = 0; i < photographBodyMedia.length; i++) {
        bodyMediaLength = photographBodyMedia[i].id = i;
    }

    function onKeyUp(e) {
        switch (e.key) {
            case "Escape":
                closeLightbox();
                break;
            case "ArrowLeft":
                prevDirection(e);
                break;
            case "ArrowRight":
                nextDirection(e);
                break;
        }
    }
    document.addEventListener("keyup", onKeyUp);

    function closeLightbox() {
        box.style.display = "none";
        slide.style.display = "none";
        staticData.style.display = "flex";
        document.removeEventListener("keyup", onKeyUp);
        document.querySelector(".next").removeEventListener('click', nextDirection);
        document.querySelector(".prev").removeEventListener('click', prevDirection);
    }
    document.getElementById("close").addEventListener("click", closeLightbox);


    construct(link);

    function construct(link) {
        const imageTarget = link.querySelector("img");
        const linkId = link.getAttribute("id");
        const modalContent = document.querySelector(".modal-content");

        if (imageTarget !== null) {
            const imageTarget1 = imageTarget.getAttribute("src");
            slide.src = imageTarget1;
            slide.innerHTML = `<img src="${imageTarget1}" class="image-slide"
            tabindex="11" alt="${mediaTab[linkId].title}">`;
            slide.setAttribute("id", `${link.id}`);
            const div5 = document.createElement('div');
            div5.className = "lightbox-title";
            div5.setAttribute("tabindex", "12");
            div5.innerHTML = `<p>${mediaTab[linkId].title}</p>`;
            slide.appendChild(div5);
            box.style.display = "block";
            slide.style.display = "block";
            staticData.style.display = "none";
            modalContent.focus();
        }

        else {
            const videoTarget = link.querySelector("video");
            const imageTarget2 = videoTarget.getAttribute("src");
            slide.src = imageTarget2;
            slide.innerHTML = `<video src="${imageTarget2}" class="image-slide"
            controls="true" tabindex="11">`;
            slide.setAttribute("id", `${link.id}`);
            const div5 = document.createElement('div');
            div5.className = "lightbox-title";
            div5.setAttribute("tabindex", "12");
            div5.innerHTML = `<p>${mediaTab[linkId].title}</p>`;
            slide.appendChild(div5);
            box.style.display = "block";
            slide.style.display = "block";
            staticData.style.display = "none";
            modalContent.focus();
            console.log("id fin construct:", link.id);
        }
    }

    function nextDirection(e) {
        console.log("slide:", slide.getAttribute("id"));
        let slideId = slide.getAttribute("id");
        if (slideId >= 0 && slideId <= bodyMediaLength - 1) {
            e.preventDefault();
            let y = 0;
            let positionY = 0;
            y = slideId;
            positionY = parseInt(y);
            let newLink = document.getElementById(positionY + 1);
            link = newLink;
            console.log('link:', link)
            construct(link);
        }
    }
    document.querySelector(".next").addEventListener('click', nextDirection);

    function prevDirection(e) {
        console.log(slide.getAttribute("id"));
        let slideId = slide.getAttribute("id");
        if (slideId >= 1 && slideId <= bodyMediaLength) {
            e.preventDefault();
            let x = 0;
            let positionX = 0;
            x = slideId;
            positionX = parseInt(x);
            let newLink = document.getElementById(positionX - 1);
            link = newLink
            console.log('link:', link)
            construct(link);
        }
    }
    document.querySelector(".prev").addEventListener('click', prevDirection);
}

export { lightbox };

