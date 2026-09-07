document.addEventListener("DOMContentLoaded", () => {
    const btnMenu = document.querySelector("#btn-menu");
    const navMenu = document.querySelector("#menu-nav");

    if (btnMenu && navMenu) {
        btnMenu.addEventListener("click", () => {
            navMenu.classList.toggle("aberto");

            if (navMenu.classList.contains("aberto")) {
                btnMenu.innerHTML = "&times;";
            } else {
                btnMenu.innerHTML = "&#9776;";
            }
        });
    }
});