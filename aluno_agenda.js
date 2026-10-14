// ==========================================================
// PORTAL DO ALUNO - AGENDA
// Menu lateral + pesquisa expansível + agenda semanal (somente leitura)
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
    document.body.style.overflow = "hidden";
    inputHeader.value = "";
    resultadoPesquisa.style.display = "none";
    listaHeader.forEach(item => item.style.display = "none");
    mensagemHeader.style.display = "none";
    setTimeout(() => inputHeader.focus(), 50);
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
// NOVO: AGENDA SEMANAL (somente leitura)
// Mostra os compromissos que o professor cadastrou. O aluno só visualiza:
// não existe botão de adicionar nem de excluir aqui.
// ==========================================================

const horas = [19, 20, 21, 22];
const coresPermitidas = ["vermelho", "verde", "azul", "branco"];
const labelsDias = ["Seg.", "Ter.", "Quar.", "Quin.", "Sex."];
const nomesMeses = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
];

// Descobre a segunda-feira da semana de "referencia" (hoje, por padrão)
function obterSegundaFeira(referencia) {
    const data = new Date(referencia);
    const diaSemana = data.getDay(); // 0 = domingo ... 6 = sábado
    const diferenca = diaSemana === 0 ? -6 : 1 - diaSemana;
    data.setDate(data.getDate() + diferenca);
    data.setHours(0, 0, 0, 0);
    return data;
}

// Date -> "YYYY-MM-DD" (formato da coluna `data` no banco)
function formatarDataISO(data) {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");
    return `${ano}-${mes}-${dia}`;
}

const segundaFeira = obterSegundaFeira(new Date());

// Os 5 dias (Seg a Sex) da semana atual, com a data real de cada um
const dias = labelsDias.map((label, indice) => {
    const dataDia = new Date(segundaFeira);
    dataDia.setDate(segundaFeira.getDate() + indice);
    return { label, numero: dataDia.getDate(), data: formatarDataISO(dataDia), objeto: dataDia };
});

// Compromissos carregados do banco (chave = "data-hora", ex: "2026-11-24-19")
let eventosAgenda = {};

const agendaSemanal = document.getElementById("agendaSemanal");
const semanaAgendaEl = document.querySelector(".semana-agenda");

// Atualiza o texto "23 - 27 de novembro de 2026" com a semana real
function atualizarLabelSemana() {
    if (!semanaAgendaEl) return;
    const primeiro = dias[0];
    const ultimo = dias[dias.length - 1];
    semanaAgendaEl.textContent =
        `${primeiro.numero} - ${ultimo.numero} de ${nomesMeses[ultimo.objeto.getMonth()]} de ${ultimo.objeto.getFullYear()}`;
}

// Busca no banco os compromissos da semana
async function carregarAgenda() {

    try {

        const resposta = await fetch(
            `agenda_crud/agenda-listar-aluno.php?inicio=${dias[0].data}&fim=${dias[dias.length - 1].data}`
        );

        // Sem sessão: volta para o login
        if (resposta.status === 401) {
            window.location.href = "login.html";
            return;
        }

        const lista = await resposta.json();

        eventosAgenda = {};

        if (Array.isArray(lista)) {
            lista.forEach(evento => {
                eventosAgenda[`${evento.data}-${evento.hora}`] = evento;
            });
        }

    } catch (erro) {
        console.error("Erro ao carregar a agenda:", erro);
    }

    renderizarAgenda();

}

function renderizarAgenda() {

    if (!agendaSemanal) return;

    // Remove as colunas de dias já existentes (a coluna de horas é fixa no HTML)
    agendaSemanal.querySelectorAll(".dia-agenda").forEach(el => el.remove());

    dias.forEach(dia => {

        const colunaDia = document.createElement("div");
        colunaDia.className = "dia-agenda";

        // Cabeçalho do dia (texto gerado aqui mesmo, não vem do banco)
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

            const evento = eventosAgenda[`${dia.data}-${hora}`];
            if (!evento) return;

            // SEGURANÇA: título, horário e local foram digitados por outra pessoa (o professor).
            // Por isso usamos textContent (nunca innerHTML), para que um texto com tags HTML
            // seja mostrado como texto e não executado na tela do aluno.
            const card = document.createElement("div");
            card.className = `aula linha${hora}`;

            const titulo = document.createElement("h4");
            titulo.textContent = evento.titulo;

            const horario = document.createElement("p");
            horario.textContent = evento.horario;

            const local = document.createElement("span");
            local.className = "local-aula";
            local.textContent = evento.local;

            // A cor só vira classe CSS se for uma das 4 permitidas
            const cor = document.createElement("div");
            cor.className = "cor-aula " + (coresPermitidas.includes(evento.cor) ? evento.cor : "branco");

            card.append(titulo, horario, local, cor);
            colunaDia.appendChild(card);

        });

        agendaSemanal.appendChild(colunaDia);

    });

}

atualizarLabelSemana();
carregarAgenda();