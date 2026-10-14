// ==========================================================
// PORTAL DO ALUNO - CALENDÁRIO
// Menu lateral + pesquisa expansível + calendário (somente leitura)
// ==========================================================

// MENU LATERAL
const menu = document.getElementById("menu");
const botaoMenu = document.getElementById("botaoMenuFechar");

botaoMenu?.addEventListener("click", () => {
    menu.classList.toggle("aberto");
});

document.addEventListener("click", (e) => {
    if (menu?.classList.contains("aberto") && !menu.contains(e.target)) {
        menu.classList.remove("aberto");
    }
});

// PESQUISA EXPANSÍVEL
const caixaPesquisa = document.getElementById("caixaPesquisa");
const overlay = document.getElementById("overlayPesquisa");
const fecharPesquisa = document.getElementById("fecharPesquisa");

const inputHeader = document.getElementById("pesquisa-header");
const listaHeader = document.querySelectorAll("#lista-header li");
const mensagemHeader = document.getElementById("mensagem-header");
const resultadoPesquisa = document.querySelector(".resultado-pesquisa");

caixaPesquisa?.addEventListener("click", () => {

    overlay.classList.add("ativo");
    document.body.classList.add("no-scroll");
    document.documentElement.classList.add("no-scroll");

    inputHeader.value = "";
    resultadoPesquisa.style.display = "none";

    listaHeader.forEach(item => item.style.display = "none");
    mensagemHeader.style.display = "none";
    setTimeout(() => inputHeader.focus(), 50);
});

// ===============================================
// Fechar pesquisa
// ===============================================

fecharPesquisa?.addEventListener("click", () => {
    overlay.classList.remove("ativo");
    document.body.classList.remove("no-scroll");
    document.documentElement.classList.remove("no-scroll");
});

// ===============================================
// Fechar clicando fora
// ===============================================

overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) {
        overlay.classList.remove("ativo");
        document.body.classList.remove("no-scroll");
        document.documentElement.classList.remove("no-scroll");
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
        listaHeader.forEach(item => item.style.display = "none");
        mensagemHeader.style.display = "none";
        return;
    }

    resultadoPesquisa.style.display = "block";
    let encontrados = 0;

    listaHeader.forEach(item => {
        // normaliza o texto do item também, para "Calendario" achar "Calendário"
        const nome = item.textContent
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

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
// CALENDÁRIO DE PROVAS
// ==========================================================

// NOVO: eventos do mês exibido. Agora vêm do banco (os que os professores cadastraram
// no calendário); antes era uma lista escrita à mão aqui no arquivo.
let eventosAcademicos = [];

// NOVO: o calendário abre no mês real de hoje (antes estava fixo em novembro de 2026).
// O dia fica sempre 1 para o setMonth() do modal anual não "pular" de mês.
const hoje = new Date();
let dataAtual = new Date(hoje.getFullYear(), hoje.getMonth(), 1);

const mesesNomes = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
];

// ELEMENTOS
const modalAnual = document.getElementById("modal-visao-anual");
const tituloMesAno = document.getElementById("mes-ano-titulo");
const fecharModalBtn = document.getElementById("fechar-modal-anual");
const gradeDias = document.getElementById("grade-dias");
const listaEventos = document.getElementById("lista-eventos");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

// NOVO: busca no servidor os eventos do mês/ano informados (calendario_listar_aluno.php)
async function carregarEventosDoMes(ano, mes) {
    try {
        // mes + 1 porque no JS os meses são 0-11, mas na URL/banco usamos 1-12
        const resposta = await fetch(`calendario_crud/calendario_listar_aluno.php?ano=${ano}&mes=${mes + 1}`);

        // Sem sessão: volta para o login
        if (resposta.status === 401) {
            window.location.href = "login.html";
            return;
        }

        const dados = await resposta.json();
        eventosAcademicos = Array.isArray(dados) ? dados : [];
    } catch (erro) {
        console.error("Erro ao carregar eventos do calendário:", erro);
        eventosAcademicos = [];
    }
}

// CALENDÁRIO
async function renderizarCalendario() {

    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();

    // O título aparece na hora; os eventos chegam logo depois
    tituloMesAno.textContent = `${mesesNomes[mes]} de ${ano}`;

    await carregarEventosDoMes(ano, mes);

    const primeiroDia = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    const ultimoAnterior = new Date(ano, mes, 0).getDate();

    gradeDias.innerHTML = "";

    // Mês anterior
    for (let i = primeiroDia; i > 0; i--) {
        const div = document.createElement("div");
        div.className = "dia-num outro-mes";
        div.textContent = ultimoAnterior - i + 1;
        gradeDias.appendChild(div);
    }

    // Mês atual
    for (let dia = 1; dia <= ultimoDia; dia++) {

        const div = document.createElement("div");
        div.className = "dia-num";

        const data = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

        if (new Date(ano, mes, dia).getDay() === 0)
            div.classList.add("domingo");

        if (eventosAcademicos.some(e => e.data === data))
            div.classList.add("com-evento");

        // NOVO: destaca o dia de hoje
        if (dia === hoje.getDate() && mes === hoje.getMonth() && ano === hoje.getFullYear())
            div.classList.add("hoje");

        div.textContent = dia;
        gradeDias.appendChild(div);
    }

    // Completar grade
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

// MODAL ANUAL
async function renderizarModalAnual() {

    const ano = dataAtual.getFullYear();

    document.getElementById("titulo-ano-modal").textContent = `Ano de ${ano}`;

    // NOVO: busca as datas com evento no ano inteiro (calendario_ano_aluno.php);
    // o JS conta quantas caem em cada mês
    let datasDoAno = [];
    try {
        const resposta = await fetch(`calendario_crud/calendario_ano_aluno.php?ano=${ano}`);
        const dados = await resposta.json();
        datasDoAno = Array.isArray(dados) ? dados : [];
    } catch (erro) {
        console.error("Erro ao carregar resumo do ano:", erro);
    }

    const grid = document.getElementById("grid-meses-ano");
    grid.innerHTML = "";

    mesesNomes.forEach((nome, index) => {

        const prefixo = `${ano}-${String(index + 1).padStart(2, "0")}`;
        const qtd = datasDoAno.filter(data => data.startsWith(prefixo)).length;

        const card = document.createElement("div");
        card.className = "card-mes-opcao";

        if (index === dataAtual.getMonth())
            card.classList.add("mes-atual-selecionado");

        if (qtd > 0)
            card.classList.add("com-atividades");

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

// EVENTOS DO MÊS
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

        // SEGURANÇA: título e horário foram digitados por outra pessoa (o professor).
        // Por isso usamos textContent (nunca innerHTML): se vier algo com tags HTML,
        // aparece como texto e não é executado na tela do aluno.
        const badge = document.createElement("div");
        badge.className = "badge-dia-evento";
        badge.textContent = dia;

        const info = document.createElement("div");
        info.className = "info-evento-cal";

        const titulo = document.createElement("h4");
        titulo.textContent = evento.titulo;

        const horario = document.createElement("p");
        horario.textContent = evento.horario;

        info.append(titulo, horario);
        card.append(badge, info);

        listaEventos.appendChild(card);
    });
}

// INICIALIZAÇÃO
renderizarCalendario();

// Abrir modal
tituloMesAno?.addEventListener("click", async () => {
    await renderizarModalAnual();
    modalAnual.classList.add("ativo");
});

// Fechar pelo X
fecharModalBtn?.addEventListener("click", () => {
    modalAnual.classList.remove("ativo");
});

// Fechar clicando no fundo
modalAnual?.addEventListener("click", (e) => {
    if (e.target === modalAnual)
        modalAnual.classList.remove("ativo");
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

// Abrir a visão anual também pelo teclado
tituloMesAno?.addEventListener("keydown", async (e) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        await renderizarModalAnual();
        modalAnual.classList.add("ativo");
    }
});