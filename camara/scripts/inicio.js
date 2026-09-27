document.addEventListener("DOMContentLoaded", () => {

  const btnMenuToggle = document.getElementById("botao-menu");
  const navMenu = document.getElementById("navegacao-principal");

  if (btnMenuToggle && navMenu) {
    btnMenuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("aberto");
      btnMenuToggle.classList.toggle("aberto");
    });
  }

  const rotuloAno = document.getElementById("ano-atual");
  const rotuloModificacao = document.getElementById("ultima-modificacao");

  if (rotuloAno) {
    rotuloAno.textContent = new Date().getFullYear();
  }

  if (rotuloModificacao) {
    rotuloModificacao.textContent = `Última modificação: ${document.lastModified}`;
  }

  const apiKey = "66c08e7626811205bf5d7f699b67ac9b";
  const lat = "-20.4697"; 
  const lon = "-54.6201";

  const urlClimaAtual = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`;
  const urlPrevisao = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`;

  async function buscarDadosClima() {
    const containerAtual = document.getElementById("dados-clima-atual") || document.getElementById("clima-atual");
    const containerPrevisao = document.getElementById("dados-previsao-clima") || document.getElementById("previsao-clima");

    try {
      const respAtual = await fetch(urlClimaAtual);
      
      if (!respAtual.ok) {
        throw new Error(`Erro na API do Clima: ${respAtual.status}`);
      }

      const dadosAtual = await respAtual.json();
      if (containerAtual) exibirClimaAtual(dadosAtual, containerAtual);

      const respPrevisao = await fetch(urlPrevisao);
      
      if (respPrevisao.ok) {
        const dadosPrevisao = await respPrevisao.json();
        if (containerPrevisao) exibirPrevisaoClima(dadosAtual, dadosPrevisao, containerPrevisao);
      } else {
        if (containerPrevisao) containerPrevisao.innerHTML = "<p>Não foi possível carregar a previsão.</p>";
      }

    } catch (erro) {
      console.error("Falha ao buscar clima:", erro);
      if (containerAtual) containerAtual.innerHTML = "<p>Erro ao carregar dados do tempo.</p>";
      if (containerPrevisao) containerPrevisao.innerHTML = "<p>Erro ao carregar previsão.</p>";
    }
  }

  function exibirClimaAtual(dados, container) {
    const temp = Math.round(dados.main.temp);
    const tempMax = Math.round(dados.main.temp_max);
    const tempMin = Math.round(dados.main.temp_min);
    const umidade = dados.main.humidity;
    const descricao = dados.weather[0].description;
    const icone = dados.weather[0].icon;

    const nascerSol = new Date(dados.sys.sunrise * 1000).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });
    const porSol = new Date(dados.sys.sunset * 1000).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' });

    container.innerHTML = `
      <div class="container-clima-detalhes">
        <img class="icone-clima" src="https://openweathermap.org/img/wn/${icone}@2x.png" alt="${descricao}" width="60" height="60">
        <div>
          <p class="temp-destaque">${temp}°C</p>
          <p class="descricao-clima">${descricao}</p>
        </div>
      </div>
      <p><strong>Máxima:</strong> ${tempMax}°C</p>
      <p><strong>Mínima:</strong> ${tempMin}°C</p>
      <p><strong>Umidade:</strong> ${umidade}%</p>
      <p><strong>Nascer do Sol:</strong> ${nascerSol}</p>
      <p><strong>Pôr do Sol:</strong> ${porSol}</p>
    `;
  }

  function exibirPrevisaoClima(dadosAtual, dadosPrevisao, container) {
    container.innerHTML = "";

    const pHoje = document.createElement("p");
    pHoje.innerHTML = `<strong>Hoje:</strong> ${Math.round(dadosAtual.main.temp)}°C`;
    container.appendChild(pHoje);

    const dataHojeString = new Date().toISOString().split("T")[0];
    
    const previsoesFuturas = dadosPrevisao.list.filter(item => {
      const dataItem = item.dt_txt.split(" ")[0];
      return dataItem !== dataHojeString && item.dt_txt.includes("12:00:00");
    }).slice(0, 3);

    previsoesFuturas.forEach(item => {
      const dataObj = new Date(item.dt * 1000);
      let nomeDia = dataObj.toLocaleDateString("pt-BR", { weekday: "long" });
      nomeDia = nomeDia.charAt(0).toUpperCase() + nomeDia.slice(1);

      const p = document.createElement("p");
      p.innerHTML = `<strong>${nomeDia}:</strong> ${Math.round(item.main.temp)}°C`;
      container.appendChild(p);
    });
  }

  async function carregarDestaques() {
    const container = document.getElementById("container-destaques");
    if (!container) return;

    const caminhosJSON = ["membros.json", "scripts/membros.json", "data/membros.json", "../membros.json"];
    let todosMembros = null;

    for (const caminho of caminhosJSON) {
      try {
        const res = await fetch(caminho);
        if (res.ok) {
          todosMembros = await res.json();
          break;
        }
      } catch (e) {
      }
    }

    if (!todosMembros) {
      console.error("Não foi possível encontrar o arquivo membros.json");
      container.innerHTML = "<p>Não foi possível carregar as empresas em destaque.</p>";
      return;
    }

    const qualificados = todosMembros.filter(m => m.nivelAssociacao === 2 || m.nivelAssociacao === 3);
    const embaralhados = qualificados.sort(() => 0.5 - Math.random());
    const selecionados = embaralhados.slice(0, 3);

    renderizarDestaques(selecionados, container);
  }

  function renderizarDestaques(membros, container) {
    container.innerHTML = "";

    membros.forEach(membro => {
      const cartao = document.createElement("section");
      cartao.className = "cartao-destaque";

      const nivelTexto = membro.nivelAssociacao === 3 ? "Membro Ouro 🥇" : "Membro Prata 🥈";

      cartao.innerHTML = `
        <div class="cabecalho-destaque">
          <h3>${membro.nome}</h3>
          <p class="slogan-empresa">${nivelTexto}</p>
        </div>
        <div class="conteudo-destaque">
          <img src="imagens/${membro.imagem}" alt="Logotipo da empresa ${membro.nome}" class="logo-destaque" width="100" height="100" loading="lazy">
          <div class="info-destaque">
            <p><strong>E-MAIL:</strong> ${membro.email || "contato@empresa.com"}</p>
            <p><strong>TELEFONE:</strong> ${membro.telefone}</p>
            <p><strong>SITE:</strong> <a href="${membro.site}" target="_blank" rel="noopener noreferrer">${membro.site.replace('https://', '')}</a></p>
          </div>
        </div>
      `;

      container.appendChild(cartao);
    });
  }

  buscarDadosClima();
  carregarDestaques();
});