const loginButton = document.querySelector(".login-button");
const loginModal = document.querySelector(".login-modal");
const loginOverlay =document.querySelector( ".login-modal__overlay");
const closeButton =document.querySelector(".login-modal__close");

loginButton.addEventListener("click", () => {
    loginModal.setAttribute("aria-hidden", "false");
});

const closeModal = () => {
    loginModal.setAttribute("aria-hidden", "true");
}

loginOverlay.addEventListener("click", closeModal);
closeButton.addEventListener("click", closeModal);