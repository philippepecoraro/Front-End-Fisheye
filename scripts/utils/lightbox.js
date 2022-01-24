const box = document.querySelector("#photograph-lightbox");
const staticData = document.querySelector(".total-data");
const slide = document.querySelector(".slide");

document.getElementById("close").addEventListener("click", closeLightbox);
function closeLightbox() {
    box.style.display = "none";
    slide.style.display = "none";
    staticData.style.display = "flex";
}

function lightbox(mediaTab, photographBodyMedia, index) {
    let link = photographBodyMedia[index];
    let bodyMediaLength = 0;
    for (let i = 0; i < photographBodyMedia.length; i++) {
        bodyMediaLength = photographBodyMedia[i].id = i;
    }

    construct(link);
    document.querySelector(".next").addEventListener('click', function (e) {
        e.preventDefault();
        let y = 0;
        y = link.getAttribute("id");
        if (y >= 0 && y <= bodyMediaLength - 1) {
            let position = parseInt(y);
            let newLink = document.getElementById(++position);
            link = newLink;
            construct(link);
        }
    });

    document.querySelector(".prev").addEventListener('click', function (e) {
        e.preventDefault();
        let x = 0;
        x = link.getAttribute("id");
        if (x >= 1 && x <= bodyMediaLength) {
            let position = parseInt(x);
            let newLink = document.getElementById(--position);
            link = newLink
            construct(link);
        }
    });

    function construct(link) {
        const imageTarget = link.querySelector("img");
        const linkId = link.getAttribute("id");
        const modalContent = document.querySelector(".modal-content");

        if (imageTarget !== null) {
            const imageTarget1 = imageTarget.getAttribute("src");
            slide.src = imageTarget1;
            slide.innerHTML = `<img src="${imageTarget1}" class="image-slide"
            tabindex="11">`;
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
    }
}

export { lightbox };

