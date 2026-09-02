// ==========================================================
// PORTAL DO PROFESSOR - AGENDA
// Menu lateral + pesquisa (comuns) + lógica da agenda (própria)
// ==========================================================

// ==========================================
// ABRIR / FECHAR MENU LATERAL
// ==========================================

const menu = document.getElementById("menu");
const botaoMenu = document.getElementById("botaoMenuFechar");

botaoMenu?.addEventListener("click", function () {
    menu.classList.toggle("aberto");
});

document.addEventListener("click", function (evento) {
    if (
        menu.classList.contains("aberto") &&
        !menu.contains(evento.target)
    ) {
        menu.classList.remove("aberto");
    }
});

// ===============================================
// CAIXA DE PESQUISA DO CABEÇALHO
// ===============================================

const caixaPesquisa = document.getElementById("caixaPesquisa");
const overlay = document.getElementById("overlayPesquisa");
const fecharPesquisa = document.getElementById("fecharPesquisa");

const inputHeader = document.getElementById("pesquisa-header");
const listaHeader = document.querySelectorAll("#lista-header li");

const mensagemHeader = document.getElementById("mensagem-header");
const resultadoPesquisa = document.querySelector(".resultado-pesquisa");

caixaPesquisa?.addEventListener("click", () => {
    overlay.classList.add("ativo");
    document.body.style.overflow = "hidden";
    inputHeader.value = "";
    resultadoPesquisa.style.display = "none";
    listaHeader.forEach(item => { item.style.display = "none"; });
    mensagemHeader.style.display = "none";
    setTimeout(() => { inputHeader.focus(); }, 50);
});

fecharPesquisa?.addEventListener("click", () => {
    overlay.classList.remove("ativo");
    document.body.style.overflow = "auto";
});

overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) {
        overlay.classList.remove("ativo");
        document.body.style.overflow = "auto";
    }
});

inputHeader?.addEventListener("input", () => {

    const texto = inputHeader.value
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    if (texto === "") {
        resultadoPesquisa.style.display = "none";
        listaHeader.forEach(item => { item.style.display = "none"; });
        mensagemHeader.style.display = "none";
        return;
    }

    resultadoPesquisa.style.display = "block";

    let encontrados = 0;

    listaHeader.forEach(item => {
        const nome = item.textContent.toLowerCase();
        if (nome.includes(texto)) {
            item.style.display = "block";
            encontrados++;
        } else {
            item.style.display = "none";
        }
    });

    mensagemHeader.style.display = encontrados === 0 ? "block" : "none";

});

listaHeader.forEach(item => {
    item.addEventListener("click", () => {
        const url = item.getAttribute("data-url");
        if (url) window.location.href = url;
    });
});

// ==========================================================
// AGENDA SEMANAL
// ==========================================================

const dias = [
    { chave: "seg", label: "Seg.", numero: 23 },
    { chave: "ter", label: "Ter.", numero: 24 },
    { chave: "qua", label: "Quar.", numero: 25 },
    { chave: "qui", label: "Quin.", numero: 26 },
    { chave: "sex", label: "Sex.", numero: 27 }
];

const horas = [19, 20, 21, 22];

// Compromissos já cadastrados (chave = "dia-hora")
// Começa vazio: o professor adiciona clicando nos espaços vazios da grade
let eventosAgenda = {};

const agendaSemanal = document.getElementById("agendaSemanal");

function renderizarAgenda() {

    // Remove as colunas de dias já existentes (mantém a coluna de horas fixa no HTML)
    agendaSemanal.querySelectorAll(".dia-agenda").forEach(el => el.remove());

    dias.forEach(dia => {

        const colunaDia = document.createElement("div");
        colunaDia.className = "dia-agenda";

        const cabecalho = document.createElement("div");
        cabecalho.className = "cabecalho-dia";
        cabecalho.innerHTML = `
            <div class="badge-dia">
                <span>${dia.label}</span>
                <strong>${dia.numero}</strong>
            </div>
        `;
        colunaDia.appendChild(cabecalho);

        horas.forEach(hora => {

            const chave = `${dia.chave}-${hora}`;
            const evento = eventosAgenda[chave];

            if (evento) {

                const cardAula = document.createElement("div");
                cardAula.className = `aula linha${hora}`;
                cardAula.innerHTML = `
                    <button type="button" class="btn-excluir-aula" title="Remover este compromisso">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <h4>${evento.titulo}</h4>
                    <p>${evento.horario}</p>
                    <span class="local-aula">${evento.local}</span>
                    <div class="cor-aula ${evento.cor}"></div>
                `;

                cardAula.querySelector(".btn-excluir-aula").addEventListener("click", (e) => {
                    e.stopPropagation();
                    delete eventosAgenda[chave];
                    renderizarAgenda();
                    mostrarToast(`"${evento.titulo}" foi removido da agenda`);
                });

                colunaDia.appendChild(cardAula);

            } else {

                const slot = document.createElement("div");
                slot.className = `slot-vazio slot${hora}`;
                slot.title = "Adicionar compromisso";
                slot.addEventListener("click", () => {
                    abrirModalCompromisso(dia, hora);
                });

                colunaDia.appendChild(slot);

            }

        });

        agendaSemanal.appendChild(colunaDia);

    });

}

// ==========================================================
// MODAL: NOVO COMPROMISSO
// ==========================================================

const modalCompromisso = document.getElementById("modalCompromisso");
const fecharModalCompromisso = document.getElementById("fecharModalCompromisso");
const formCompromisso = document.getElementById("formCompromisso");
const infoModalCompromisso = document.getElementById("infoModalCompromisso");
const inputCorCompromisso = document.getElementById("corCompromisso");
const inputHorarioCompromisso = document.getElementById("horarioCompromisso");

let diaSelecionado = null;
let horaSelecionada = null;

function abrirModalCompromisso(dia, hora) {

    diaSelecionado = dia.chave;
    horaSelecionada = hora;

    formCompromisso.reset();

    infoModalCompromisso.textContent = `${dia.label} (${dia.numero}) · a partir das ${hora}h`;
    inputHorarioCompromisso.value = `${hora}:00 - ${hora + 1}:00`;

    document.querySelectorAll(".opcao-cor").forEach(botao => botao.classList.remove("ativo"));
    document.querySelector('.opcao-cor[data-cor="branco"]').classList.add("ativo");
    inputCorCompromisso.value = "branco";

    modalCompromisso.classList.add("ativo");

}

fecharModalCompromisso?.addEventListener("click", () => {
    modalCompromisso.classList.remove("ativo");
});

modalCompromisso?.addEventListener("click", (e) => {
    if (e.target === modalCompromisso) modalCompromisso.classList.remove("ativo");
});

// Seleção da cor do compromisso (mesma paleta da legenda)
document.querySelectorAll(".opcao-cor").forEach(botao => {
    botao.addEventListener("click", () => {
        document.querySelectorAll(".opcao-cor").forEach(b => b.classList.remove("ativo"));
        botao.classList.add("ativo");
        inputCorCompromisso.value = botao.dataset.cor;
    });
});

formCompromisso?.addEventListener("submit", (e) => {

    e.preventDefault();

    if (!diaSelecionado || !horaSelecionada) return;

    const chave = `${diaSelecionado}-${horaSelecionada}`;

    eventosAgenda[chave] = {
        titulo: document.getElementById("tituloCompromisso").value.trim(),
        horario: inputHorarioCompromisso.value.trim(),
        local: document.getElementById("localCompromisso").value.trim(),
        cor: inputCorCompromisso.value
    };

    modalCompromisso.classList.remove("ativo");
    renderizarAgenda();

});

// ==========================================================
// MENSAGEM DE CONFIRMAÇÃO (TOAST)
// ==========================================================

let toastAgendaTimer = null;

function mostrarToast(mensagem) {

    let toast = document.getElementById("toastAgenda");

    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toastAgenda";
        toast.className = "toast-agenda";
        document.body.appendChild(toast);
    }

    toast.textContent = mensagem;
    toast.classList.add("ativo");

    clearTimeout(toastAgendaTimer);
    toastAgendaTimer = setTimeout(() => {
        toast.classList.remove("ativo");
    }, 2200);

}

// ==========================================================
// INICIALIZAÇÃO
// ==========================================================

renderizarAgenda();