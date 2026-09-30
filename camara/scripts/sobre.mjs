import { locaisInteresse } from '../scripts/locais.mjs';

document.addEventListener("DOMContentLoaded", () => {
    configurarMenuNavegacao();
    exibirMensagemVisita();
    renderizarCartoesLocais();
    configurarModal();
    atualizarRodape();
});

/* Menu Responsivo */
function configurarMenuNavegacao() {
    const botaoMenu = document.getElementById("botao-menu");
    const navegacao = document.getElementById("navegacao-principal");

    if (botaoMenu && navegacao) {
        botaoMenu.addEventListener("click", () => {
            botaoMenu.classList.toggle("aberto");
            navegacao.classList.toggle("aberto");
        });
    }
}

/* Lógica do localStorage para Mensagem de Visitas */
function exibirMensagemVisita() {
    const elementoMensagem = document.getElementById("mensagem-visita");
    if (!elementoMensagem) return;

    const CHAVE_VISITA = "camara_ultima_visita";
    const agora = Date.now();
    const ultimaVisitaStr = localStorage.getItem(CHAVE_VISITA);

    let textoMensagem = "";

    if (!ultimaVisitaStr) {
        textoMensagem = "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
    } else {
        const ultimaVisita = parseInt(ultimaVisitaStr, 10);
        const diferencaMS = agora - ultimaVisita;
        const UM_DIA_MS = 1000 * 60 * 60 * 24;
        const diasDecorridos = Math.floor(diferencaMS / UM_DIA_MS);

        if (diferencaMS < UM_DIA_MS) {
            textoMensagem = "Já voltou? Que legal!";
        } else if (diasDecorridos === 1) {
            textoMensagem = "Seu último acesso foi há 1 dia.";
        } else {
            textoMensagem = `Seu último acesso foi há ${diasDecorridos} dias.`;
        }
    }

    elementoMensagem.innerHTML = `<p>${textoMensagem}</p>`;
    localStorage.setItem(CHAVE_VISITA, agora.toString());
}

/* Renderização dos 8 Cartões */
function renderizarCartoesLocais() {
    const container = document.getElementById("galeria-locais");
    if (!container) return;

    container.innerHTML = "";

    locaisInteresse.forEach((local, index) => {
        const card = document.createElement("article");
        card.classList.add("cartao-local", `item-${index + 1}`);

        card.innerHTML = `
            <h2>${local.nome}</h2>
            <figure class="figura-local">
                <img src="${local.imagem}" alt="${local.alt}" loading="lazy" width="300" height="200">
            </figure>
            <address class="endereco-local">${local.endereco}</address>
            <p class="descricao-local">${local.descricao}</p>
            <button class="botao-saiba-mais" data-id="${local.id}">Saiba mais</button>
        `;

        container.appendChild(card);
    });
}

/* Controle do Modal "Saiba mais" */
function configurarModal() {
    const modal = document.getElementById("modal-detalhes");
    const fecharModal = document.getElementById("fechar-modal");
    const modalTitulo = document.getElementById("modal-titulo");
    const modalDescricao = document.getElementById("modal-descricao");
    const container = document.getElementById("galeria-locais");

    if (!modal || !container) return;

    container.addEventListener("click", (e) => {
        if (e.target.classList.contains("botao-saiba-mais")) {
            const idLocal = parseInt(e.target.getAttribute("data-id"), 10);
            const localEncontrado = locaisInteresse.find(item => item.id === idLocal);

            if (localEncontrado) {
                modalTitulo.textContent = localEncontrado.nome;
                modalDescricao.textContent = `Localizado em: ${localEncontrado.endereco}. ${localEncontrado.descricao}`;
                modal.showModal();
            }
        }
    });

    if (fecharModal) {
        fecharModal.addEventListener("click", () => {
            modal.close();
        });
    }

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.close();
        }
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

    carregarMembros();