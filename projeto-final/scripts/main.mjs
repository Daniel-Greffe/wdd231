export function inicializarGeral() {
  const btnMenu = document.querySelector('#btn-menu');
  const menuNav = document.querySelector('#menu-nav');

  if (btnMenu && menuNav) {
    btnMenu.addEventListener('click', () => {
      menuNav.classList.toggle('aberto');
    });
  }

  const elAno = document.getElementById('ano-atual');
  const elModif = document.getElementById('ultima-modificacao');

  if (elAno) {
    elAno.textContent = new Date().getFullYear();
  }

  if (elModif) {
    elModif.textContent = `Última modificação: ${document.lastModified}`;
  }
}

document.addEventListener('DOMContentLoaded', inicializarGeral);