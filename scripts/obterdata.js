const anoatual = new Date().getFullYear();
document.getElementById("anoatual").textContent = anoatual;

const ultimaModificacao = new Date(document.lastModified);
document.getElementById("ultimaModificacao").textContent = ultimaModificacao;