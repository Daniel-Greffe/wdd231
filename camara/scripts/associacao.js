document.addEventListener("DOMContentLoaded", () => {

  const btnMenuToggle = document.getElementById("botao-menu");
  const navMenu = document.getElementById("navegacao-principal");

  if (btnMenuToggle && navMenu) {
    btnMenuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("aberto");
      btnMenuToggle.classList.toggle("aberto");
    });
  }
  
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }

    const modalButtons = document.querySelectorAll(".open-modal");

    modalButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    const closeButtons = document.querySelectorAll(".close-modal");
    closeButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const modal = e.target.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });

    const modals = document.querySelectorAll("dialog");
    modals.forEach((modal) => {
        modal.addEventListener("click", (e) => {
            const rect = modal.getBoundingClientRect();
            if (
                e.clientX < rect.left ||
                e.clientX > rect.right ||
                e.clientY < rect.top ||
                e.clientY > rect.bottom
            ) {
                modal.close();
            }
        });
    });

    const rotuloAno = document.getElementById("ano-atual");
    const rotuloModificacao = document.getElementById("ultima-modificacao");

    if (rotuloAno) {
        rotuloAno.textContent = new Date().getFullYear();
    }

    if (rotuloModificacao) {
        rotuloModificacao.textContent = `Última modificação: ${document.lastModified}`;
    }

    carregarMembros();
});