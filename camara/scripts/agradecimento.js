document.addEventListener("DOMContentLoaded", () => {

  const btnMenuToggle = document.getElementById("botao-menu");
  const navMenu = document.getElementById("navegacao-principal");

  if (btnMenuToggle && navMenu) {
    btnMenuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("aberto");
      btnMenuToggle.classList.toggle("aberto");
    });
  }
  const params = new URLSearchParams(window.location.search);
  const formDataContainer = document.getElementById("formDataDisplay");

  if (formDataContainer) {
    const nome = params.get("nome") || "Não informado";
    const sobrenome = params.get("sobrenome") || "Não informado";
    const email = params.get("email") || "Não informado";
    const telefone = params.get("telefone") || "Não informado";
    const organizacao = params.get("organizacao") || "Não informado";
    const nivelValor = params.get("nivel") || "";
    const rawTimestamp = params.get("timestamp");

    const niveis = {
      np: "Associação NP (Sem fins lucrativos ",
      bronze: "Associação Bronze 🥉",
      silver: "Associação Prata 🥈",
      gold: "Associação Ouro 🥇"
    };

    const nivelTexto = niveis[nivelValor] || "Não informado";

    let dataFormatada = "Não registrada";
    if (rawTimestamp) {
      const dataObj = new Date(rawTimestamp);
      dataFormatada = dataObj.toLocaleString("pt-BR", {
        dateStyle: "full",
        timeStyle: "medium"
      });
    }

    formDataContainer.innerHTML = `
      <p><strong>Nome Completo:</strong> ${nome} ${sobrenome}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Celular:</strong> ${telefone}</p>
      <p><strong>Organização/Empresa:</strong> ${organizacao}</p>
      <p><strong>Nível de Associação:</strong> ${nivelTexto}</p>
      <p><strong>Data de Envio:</strong> ${dataFormatada}</p>
    `;
  }

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