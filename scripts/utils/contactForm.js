const modal = document.getElementById("contact_modal");
const modalDisplay = document.querySelector(".modal");

function onKeyEsc(e) {
    if (e.key === 'Escape') {
        closeModal();
        console.log("onKeyUp");
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
    document.getElementById("contact_bt").focus();
    document.removeEventListener("keyup", onKeyEsc);
}
document.getElementById("contact_img").addEventListener("click", closeModal);

document.querySelector(".contact_form").addEventListener("click", displayData);
function displayData(event) {
    event.preventDefault();
    console.log("Prénom:", document.getElementById("firstname").value);
    console.log("Nom:", document.getElementById("lastname").value);
    console.log("Email:", document.getElementById("email").value);
    console.log("Message:", document.getElementById("msg").value);
}
