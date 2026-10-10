let listaPlantas = [];

async function carregarDadosPlantas() {
  try {
    const resposta = await fetch('dados/plantas.json');
    if (!resposta.ok) {
      throw new Error(`Erro na requisição: ${resposta.status}`);
    }
    listaPlantas = await resposta.json();
    
const ehPaginaInicial = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/final/');

if (ehPaginaInicial) {
  const plantasComuns = listaPlantas.filter(p => p.raridade === 1);
  
  const plantasEmbaralhadas = plantasComuns.sort(() => Math.random() - 0.5);
  
  const destaquesAleatorios = plantasEmbaralhadas.slice(0, 3);
  
  renderizarGrid(destaquesAleatorios);
} else {
  renderizarGrid(listaPlantas);
  configurarFiltros();
}
  } catch (erro) {
    console.error('Falha ao carregar o acervo de plantas:', erro);
  }
}

function renderizarGrid(plantas) {
  const containerGrid = document.getElementById('grid-plantas');
  if (!containerGrid) return;

  if (plantas.length === 0) {
    containerGrid.innerHTML = '';
    const msgVazio = document.getElementById('mensagem-vazio');
    if (msgVazio) msgVazio.classList.remove('mensagem-oculta');
    return;
  }

  const msgVazio = document.getElementById('mensagem-vazio');
  if (msgVazio) msgVazio.classList.add('mensagem-oculta');

  containerGrid.innerHTML = plantas.map((p, index) => {
    const ePrimeiro = index < 3;
    const loadingAttr = ePrimeiro ? 'loading="eager"' : 'loading="lazy"';
    const fetchPriorityAttr = ePrimeiro ? 'fetchpriority="high"' : '';

    return `
      <article class="card-planta">
        <img src="imagens/${p.imagem}" alt="Foto da planta ${p.nome}" width="300" height="200" ${loadingAttr} ${fetchPriorityAttr}>
        <h3>${p.nome}</h3>
        <p class="nome-cientifico">${p.nomeCientifico}</p>
        <div class="raridade">${p.estrelas}</div>
        <button class="btn-detalhes" data-id="${p.id}">Ver Cuidados</button>
      </article>
    `;
  }).join('');

  document.querySelectorAll('.btn-detalhes').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      abrirModalPlanta(id);
    });
  });
}

function abrirModalPlanta(id) {
  const planta = listaPlantas.find(p => p.id === id);
  if (!planta) return;

  const modal = document.getElementById('modal-planta');
  const modalBody = document.getElementById('modal-body');

  modalBody.innerHTML = `
    <h2>${planta.nome}</h2>
    <p class="nome-cientifico">${planta.nomeCientifico}</p>
    <hr style="margin: 10px 0; border: 0; border-top: 1px solid #ccc;">
    <p><strong>Rega:</strong> ${planta.agua}</p>
    <p><strong>Luz Ideal:</strong> ${planta.sol}</p>
    <p><strong>Adubação:</strong> ${planta.adubo}</p>
    <p><strong>Clima:</strong> ${planta.clima}</p>
  `;

  modal.showModal();

  const btnFechar = modal.querySelector('.fechar-modal');
  btnFechar.onclick = () => modal.close();
}

function configurarFiltros() {
  const campoBusca = document.getElementById('campo-busca');
  const botoesFiltro = document.querySelectorAll('.btn-filtro');
  let raridadeAtiva = 'todas';

  function aplicarFiltro() {
    const termo = campoBusca ? campoBusca.value.toLowerCase().trim() : '';
    const filtradas = listaPlantas.filter(p => {
      const combinaNome = p.nome.toLowerCase().includes(termo) || p.nomeCientifico.toLowerCase().includes(termo);
      const combinaRaridade = (raridadeAtiva === 'todas') || (p.raridade.toString() === raridadeAtiva);
      return combinaNome && combinaRaridade;
    });
    renderizarGrid(filtradas);
  }

  if (campoBusca) {
    campoBusca.addEventListener('input', aplicarFiltro);
  }

  botoesFiltro.forEach(btn => {
    btn.addEventListener('click', () => {
      botoesFiltro.forEach(b => b.classList.remove('ativo'));
      btn.classList.add('ativo');
      raridadeAtiva = btn.getAttribute('data-raridade');
      aplicarFiltro();
    });
  });
}

document.addEventListener('DOMContentLoaded', carregarDadosPlantas);