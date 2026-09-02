// ==========================================================
// PORTAL DO PROFESSOR - CALENDÁRIO
// Menu lateral + pesquisa (comuns) + lógica do calendário (própria)
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
// CALENDÁRIO
// ==========================================================

// Provas, entregas e datas acadêmicas cadastradas
const eventosAcademicos = [
    { data: "2026-11-11", titulo: "Prova - Banco de dados",      horario: "19:00 - 20:00" },
    { data: "2026-11-20", titulo: "Prova - PHP com MySQL",       horario: "20:00 - 21:30" },
    { data: "2026-11-25", titulo: "Prova - Arquitetura Web",     horario: "20:30 - 22:00" },
    { data: "2026-11-26", titulo: "Prova - MongoDB",             horario: "19:00 - 20:00" },
    { data: "2026-12-10", titulo: "Trabalho Final - Engenharia", horario: "19:00 - 22:00" }
];

let dataAtual = new Date(2026, 10, 1);

const mesesNomes = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
];

const modalAnual = document.getElementById("modal-visao-anual");
const tituloMesAno = document.getElementById("mes-ano-titulo");
const fecharModalBtn = document.getElementById("fechar-modal-anual");
const gradeDias = document.getElementById("grade-dias");
const listaEventos = document.getElementById("lista-eventos");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

// Monta a grade de dias do mês exibido, junto com os eventos do mês
function renderizarCalendario() {

    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();

    tituloMesAno.textContent = `${mesesNomes[mes]} de ${ano}`;

    const primeiroDia = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    const ultimoAnterior = new Date(ano, mes, 0).getDate();

    gradeDias.innerHTML = "";

    // Dias do mês anterior (preenchimento)
    for (let i = primeiroDia; i > 0; i--) {
        const div = document.createElement("div");
        div.className = "dia-num outro-mes";
        div.textContent = ultimoAnterior - i + 1;
        gradeDias.appendChild(div);
    }

    // Dias do mês atual
    for (let dia = 1; dia <= ultimoDia; dia++) {

        const div = document.createElement("div");
        div.className = "dia-num";

        const data = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

        if (new Date(ano, mes, dia).getDay() === 0) div.classList.add("domingo");
        if (eventosAcademicos.some(e => e.data === data)) div.classList.add("com-evento");

        div.textContent = dia;
        gradeDias.appendChild(div);

    }

    // Completa a grade com os dias do próximo mês
    const usados = primeiroDia + ultimoDia;
    const faltam = usados > 35 ? 42 - usados : 35 - usados;

    for (let i = 1; i <= faltam; i++) {
        const div = document.createElement("div");
        div.className = "dia-num outro-mes";
        div.textContent = i;
        gradeDias.appendChild(div);
    }

    renderizarEventos(ano, mes);

}

// Monta os 12 meses do modal de visão anual, com a contagem de provas de cada um
function renderizarModalAnual() {

    const ano = dataAtual.getFullYear();

    document.getElementById("titulo-ano-modal").textContent = `Ano de ${ano}`;

    const grid = document.getElementById("grid-meses-ano");
    grid.innerHTML = "";

    mesesNomes.forEach((nome, index) => {

        const prefixo = `${ano}-${String(index + 1).padStart(2, "0")}`;
        const qtd = eventosAcademicos.filter(e => e.data.startsWith(prefixo)).length;

        const card = document.createElement("div");
        card.className = "card-mes-opcao";

        if (index === dataAtual.getMonth()) card.classList.add("mes-atual-selecionado");
        if (qtd > 0) card.classList.add("com-atividades");

        card.innerHTML = `
            <h4>${nome}</h4>
            ${qtd ? `<span class="badge-qtd-atividades">${qtd} ${qtd === 1 ? "prova" : "provas"}</span>` : ""}
        `;

        card.addEventListener("click", () => {
            dataAtual.setMonth(index);
            renderizarCalendario();
            modalAnual.classList.remove("ativo");
        });

        grid.appendChild(card);

    });

}

// Lista, ao lado do calendário, os eventos do mês em exibição
function renderizarEventos(ano, mes) {

    listaEventos.innerHTML = "";

    const prefixo = `${ano}-${String(mes + 1).padStart(2, "0")}`;
    const eventos = eventosAcademicos.filter(e => e.data.startsWith(prefixo));

    if (!eventos.length) {
        listaEventos.innerHTML = `
            <div class="sem-eventos-msg">
                Nenhuma prova ou anotação para este mês.
            </div>
        `;
        return;
    }

    eventos.forEach(evento => {

        const dia = evento.data.split("-")[2];

        const card = document.createElement("div");
        card.className = "card-evento-cal";

        card.innerHTML = `
            <div class="badge-dia-evento">${dia}</div>

            <div class="info-evento-cal">
                <h4>${evento.titulo}</h4>
                <p>${evento.horario}</p>
            </div>
        `;

        listaEventos.appendChild(card);

    });

}

// Abrir modal de visão anual
tituloMesAno?.addEventListener("click", () => {
    renderizarModalAnual();
    modalAnual.classList.add("ativo");
});

// Fechar pelo X
fecharModalBtn?.addEventListener("click", () => {
    modalAnual.classList.remove("ativo");
});

// Fechar clicando no fundo
modalAnual?.addEventListener("click", (e) => {
    if (e.target === modalAnual) modalAnual.classList.remove("ativo");
});

// Navegação entre meses
btnPrev?.addEventListener("click", () => {
    dataAtual.setMonth(dataAtual.getMonth() - 1);
    renderizarCalendario();
});

btnNext?.addEventListener("click", () => {
    dataAtual.setMonth(dataAtual.getMonth() + 1);
    renderizarCalendario();
});

// ==========================================================
// INICIALIZAÇÃO
// ==========================================================

renderizarCalendario();
