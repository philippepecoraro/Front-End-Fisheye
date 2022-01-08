const box = document.querySelector("#photograph-lightbox");
const staticData = document.querySelector(".static-data");
function openLightbox(imgTarget) {
    console.log('imgTarget:', imgTarget);
    const slideImage = document.querySelector(".slide img");
    console.log('slideImage:', slideImage)
    slideImage.src = imgTarget;
    box.style.display = "block";
    slideImage.style.display = "block";
    staticData.style.display = "none";
}

document.getElementById("close").addEventListener("click", closeLightbox);
function closeLightbox() {
    console.log('closeLightbox:');
    box.style.display = "none";
    staticData.style.display = "flex";
}

document.querySelector(".prev").addEventListener('click', changeSlidePrev);
document.querySelector(".next").addEventListener('click', changeSlideNext);
function changeSlidePrev() {
    console.log('changeSlidePrev:');
}

function changeSlideNext() {
    console.log("changeSlideNext:");
}

export { openLightbox };

