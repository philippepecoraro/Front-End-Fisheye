const modal = document.getElementById("contact_modal");
document.getElementById("contact_bt").addEventListener("click", displayModal);
document.getElementById("contact_img").addEventListener("click", closeModal);

function displayModal() {
    modal.style.display = "block";
}

function closeModal() {
    modal.style.display = "none";
}
document.querySelector(".contact_form").addEventListener("click", displayData);
function displayData(event) {
    event.stopPropagation()
    console.log("Prénom:", document.getElementById("first").value);
    console.log("Prénom:", document.getElementById("last").value);
    console.log("Prénom:", document.getElementById("email").value);
    console.log("Prénom:", document.getElementById("msg").value);
}