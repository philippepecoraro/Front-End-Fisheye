const modal = document.getElementById("contact_modal");
document.getElementById("contact_bt").addEventListener("click", displayModal);
document.getElementById("contact_img").addEventListener("click", closeModal);

function displayModal() {
    modal.style.display = "block";   
}

function closeModal() {
    modal.style.display = "none";
}
