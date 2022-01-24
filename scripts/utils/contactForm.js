const modal = document.getElementById("contact_modal");
const modalDisplay = document.querySelector(".modal");
document.getElementById("contact_bt").addEventListener("click", displayModal);
document.getElementById("contact_img").addEventListener("click", closeModal);

function displayModal() {
    modal.style.display = "block";
    modalDisplay.focus();
}

function closeModal() {
    modal.style.display = "none";
}
document.querySelector(".contact_form").addEventListener("click", displayData);
function displayData(event) {
    event.preventDefault();
    console.log("Prénom:", document.getElementById("first").value);
    console.log("Nom:", document.getElementById("last").value);
    console.log("Email:", document.getElementById("email").value);
    console.log("Message:", document.getElementById("msg").value);
}