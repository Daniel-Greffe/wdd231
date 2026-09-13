document.addEventListener("DOMContentLoaded", () => {

  const btnMenuToggle = document.getElementById("botao-menu");
  const navMenu = document.getElementById("navegacao-principal");

  btnMenuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("aberto");
    btnMenuToggle.classList.toggle("aberto");
  });

  const gridMembros = document.getElementById("container-membros");

  async function carregarMembros() {
    try {
      const res = await fetch("scripts/membros.json");
      if (!res.ok) {
        throw new Error(`Erro ao carregar JSON: ${res.status}`);
      }
      const listaMembros = await res.json();
      renderizarMembros(listaMembros);
    } catch (falha) {
      console.error("Erro ao buscar dados dos membros:", falha);
      gridMembros.innerHTML = "<p>Não foi possível carregar o diretório de empresas no momento.</p>";
    }
  }

  function renderizarMembros(listaMembros) {
    gridMembros.innerHTML = "";

    listaMembros.forEach((item) => {
      const itemCard = document.createElement("section");
      itemCard.className = "cartao-membro";

      itemCard.innerHTML = `
        <img src="imagens/${item.imagem}" alt="Logotipo da empresa ${item.nome}" loading="lazy" width="110" height="110">
        <div>
          <h2>${item.nome}</h2>
          <p class="descricao-empresa">${item.descricao}</p>
          <p>${item.endereco}</p>
          <p>${item.telefone}</p>
          <a href="${item.site}" target="_blank" rel="noopener noreferrer">${item.site}</a>
        </div>
      `;

      gridMembros.appendChild(itemCard);
    });
  }

  const btnModoGrade = document.getElementById("botao-grade");
  const btnModoLista = document.getElementById("botao-lista");

  btnModoGrade.addEventListener("click", () => {
    gridMembros.classList.add("exibicao-grade");
    gridMembros.classList.remove("exibicao-lista");
    btnModoGrade.classList.add("ativo");
    btnModoLista.classList.remove("ativo");
  });

  btnModoLista.addEventListener("click", () => {
    gridMembros.classList.add("exibicao-lista");
    gridMembros.classList.remove("exibicao-grade");
    btnModoLista.classList.add("ativo");
    btnModoGrade.classList.remove("ativo");
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