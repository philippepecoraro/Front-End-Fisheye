const modal = document.getElementById("contact_modal");
const modalDisplay = document.querySelector(".modal");

// Close Modal with escape key
function onKeyEsc(e) {
    if (e.key === 'Escape') {
        closeModal();
        document.getElementById("contact_bt").focus();
    }
}

function displayModal() {
    modal.style.display = "block";
    modal.setAttribute("aria-modal", "true");
    document.addEventListener("keyup", onKeyEsc);
    modalDisplay.focus();
}
document.getElementById("contact_bt").addEventListener("click", displayModal);

function closeModal() {
    modal.style.display = "none";
    document.removeEventListener("keyup", onKeyEsc);
}
// Listener on form cross
const contactImg = document.querySelector(".contact_close");
contactImg.addEventListener("click", closeModal);
contactImg.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        closeModal();
    }
});

document.querySelector(".contact_form").addEventListener("click", displayData);
// display form data on console
function displayData(event) {
    event.preventDefault();
    console.log("Prénom:", document.getElementById("firstname").value);
    console.log("Nom:", document.getElementById("lastname").value);
    console.log("Email:", document.getElementById("email").value);
    console.log("Message:", document.getElementById("msg").value);
}
