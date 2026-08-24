// ======================================================================
// MENU
// ======================================================================

const menu = document.getElementById("menu");
const botaoMenu = document.getElementById("botaoMenuFechar");

// ABRIR / FECHAR MENU
botaoMenu.addEventListener("click", function () {
    menu.classList.toggle("aberto");
});

// FECHAR AO CLICAR FORA DO MENU
document.addEventListener("click", function (evento) {
    if (menu.classList.contains("aberto") && !menu.contains(evento.target)) {
        menu.classList.remove("aberto");
    }
});

// ==========================================
// ITENS DO MENU
// ==========================================

const itensMenu = document.querySelectorAll(".item-menu");
const banner = document.querySelector(".banner-portal");
const paginaInicio = document.querySelector(".pagina-inicio");
const paginasInternas = document.querySelectorAll(".pagina-interna");

itensMenu.forEach(function (item) {
    item.addEventListener("click", function () {
        const pagina = item.dataset.pagina;
        abrirPagina(pagina);

        itensMenu.forEach(i => i.classList.remove("ativo"));
        item.classList.add("ativo");
    });
});

// ==========================================
// TROCAR PÁGINA
// ==========================================

function abrirPagina(pagina) {

    if (pagina === "inicio") {

        banner.style.display = "flex";
        paginaInicio.style.display = "block";

        paginasInternas.forEach(function (paginaInterna) {
            paginaInterna.style.display = "none";
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
    }

    banner.style.display = "none";
    paginaInicio.style.display = "none";

    paginasInternas.forEach(function (paginaInterna) {
        paginaInterna.style.display = "none";
    });

    const paginaSelecionada = document.querySelector(
        `.pagina-interna[data-conteudo="${pagina}"]`
    );

    if (paginaSelecionada) {
        paginaSelecionada.style.display = "block";
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Função auxiliar para trocar de página via JS
function navegarParaPagina(nomePagina) {
    const botaoMenu = document.querySelector(`.item-menu[data-pagina="${nomePagina}"]`);
    if (botaoMenu) {
        botaoMenu.click();
    }
}

// ABRIR INÍCIO AO ENTRAR/RECARREGAR
abrirPagina("inicio");
document.querySelector('.item-menu[data-pagina="inicio"]')?.classList.add("ativo");

// Botão "Ver Agenda" no card da próxima aula
document.getElementById('btnVerAgenda')?.addEventListener('click', () => {
    navegarParaPagina('agenda');
});

// Botão "Ver mais" das avaliações
document.getElementById('btnVerTodasAvaliações')?.addEventListener('click', () => {
    navegarParaPagina('calendario');
});

// Clique na logo direciona para o Início
document.getElementById('btnLogoInicio')?.addEventListener('click', () => {
    abrirPagina('inicio');
    itensMenu.forEach(i => i.classList.remove("ativo"));
    document.querySelector('.item-menu[data-pagina="inicio"]')?.classList.add("ativo");
});

// ===============================================
// Caixa de pesquisa do cabeçalho
// ===============================================

const caixaPesquisa = document.getElementById("caixaPesquisa");
const overlay = document.getElementById("overlayPesquisa");
const fecharPesquisa = document.getElementById("fecharPesquisa");

const inputHeader = document.getElementById("pesquisa-header");
const listaHeader = document.querySelectorAll("#lista-header li");

const mensagemHeader = document.getElementById("mensagem-header");
const resultadoPesquisa = document.querySelector(".resultado-pesquisa");

caixaPesquisa.addEventListener("click", () => {
    overlay.classList.add("ativo");
    document.body.style.overflow = "hidden";

    inputHeader.value = "";
    resultadoPesquisa.style.display = "none";

    listaHeader.forEach(item => { item.style.display = "none"; });
    mensagemHeader.style.display = "none";

    setTimeout(() => { inputHeader.focus(); }, 50);
});

fecharPesquisa.addEventListener("click", () => {
    overlay.classList.remove("ativo");
    document.body.style.overflow = "auto";
});

overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
        overlay.classList.remove("ativo");
        document.body.style.overflow = "auto";
    }
});

inputHeader.addEventListener("input", () => {

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
        const pagina = item.getAttribute("data-pagina");
        navegarParaPagina(pagina);
        overlay.classList.remove("ativo");
        document.body.style.overflow = "auto";
    });
});

// ======================================================================
// DADOS DAS TURMAS DO PROFESSOR
// ======================================================================

const turmasProfessor = {
    bd: {
        nome: "Banco de Dados",
        semestre: "3º Semestre",
        sala: "Sala 25",
        alunosQtd: 28,
        media: "8.4",
        frequencia: "94%",
        descricao: "Turma de Banco de Dados do 3º semestre de Ciências da Computação. Encontros às segundas, terças, quartas e sextas, sempre na Sala 25. Conteúdo focado em modelagem relacional, SQL e MongoDB.",
        alunos: [
            { nome: "Ana Beatriz Souza", p1: 8.5, p2: 9.0, freq: 98 },
            { nome: "Bruno Carvalho Lima", p1: 7.0, p2: 7.8, freq: 92 },
            { nome: "Carlos Eduardo Melo", p1: 9.2, p2: 8.8, freq: 100 },
            { nome: "Débora Ferreira Alves", p1: 6.0, p2: 6.5, freq: 70 },
            { nome: "Eduardo Nogueira Reis", p1: 8.0, p2: 7.5, freq: 88 },
            { nome: "Fernanda Rocha Pires", p1: 9.5, p2: 9.7, freq: 96 },
            { nome: "Gabriel Andrade Costa", p1: 5.5, p2: 6.0, freq: 65 },
            { nome: "Helena Martins Dias", p1: 7.8, p2: 8.2, freq: 94 }
        ]
    },
    prog: {
        nome: "Programação",
        semestre: "2º Semestre",
        sala: "Sala 25",
        alunosQtd: 32,
        media: "7.9",
        frequencia: "91%",
        descricao: "Turma de Programação do 2º semestre de Ciências da Computação. Encontros às segundas, quartas, quintas e sextas, na Sala 25. Conteúdo focado em lógica de programação e desenvolvimento web com PHP e MySQL.",
        alunos: [
            { nome: "Igor Salles Farias", p1: 7.0, p2: 7.5, freq: 90 },
            { nome: "Juliana Prado Ramos", p1: 8.8, p2: 9.0, freq: 97 },
            { nome: "Kaique Barbosa Nunes", p1: 6.5, p2: 7.0, freq: 82 },
            { nome: "Larissa Gomes Teixeira", p1: 9.0, p2: 8.5, freq: 95 },
            { nome: "Marcelo Vieira Castro", p1: 5.8, p2: 6.2, freq: 68 },
            { nome: "Natália Correia Duarte", p1: 8.2, p2: 8.0, freq: 92 },
            { nome: "Otávio Lemos Batista", p1: 7.4, p2: 7.9, freq: 89 }
        ]
    },
    es: {
        nome: "Engenharia de Software",
        semestre: "5º Semestre",
        sala: "Sala 25",
        alunosQtd: 24,
        media: "7.2",
        frequencia: "85%",
        descricao: "Turma de Engenharia de Software do 5º semestre de Ciências da Computação. Encontros às quintas e sextas, na Sala 25. Conteúdo focado em arquitetura de sistemas e metodologias ágeis.",
        alunos: [
            { nome: "Patrícia Neves Cunha", p1: 7.5, p2: 7.0, freq: 88 },
            { nome: "Rafael Tavares Moura", p1: 6.0, p2: 5.5, freq: 60 },
            { nome: "Sabrina Lopes Freitas", p1: 8.5, p2: 8.9, freq: 96 },
            { nome: "Thiago Peixoto Ribas", p1: 5.0, p2: 5.8, freq: 55 },
            { nome: "Vanessa Coelho Brito", p1: 7.9, p2: 8.1, freq: 90 },
            { nome: "William Santana Rocha", p1: 8.0, p2: 7.6, freq: 84 }
        ]
    }
};

// ======================================================================
// MINHAS TURMAS
// ======================================================================

const listaTurmasEl = document.getElementById("listaTurmas");
const detalheTurmaEl = document.getElementById("detalheTurma");
const btnVoltarTurmas = document.getElementById("btnVoltarTurmas");

function abrirDetalheTurma(idTurma) {

    const turma = turmasProfessor[idTurma];
    if (!turma) return;

    document.getElementById("tituloTurmaDetalhe").textContent = turma.nome;
    document.getElementById("subtituloTurmaDetalhe").textContent = `${turma.semestre} · ${turma.sala}`;
    document.getElementById("statAlunosTurma").textContent = turma.alunosQtd;
    document.getElementById("statMediaTurma").textContent = turma.media;
    document.getElementById("statFreqTurma").textContent = turma.frequencia;
    document.getElementById("visaoTurmaNome").textContent = `Sobre a turma de ${turma.nome}`;
    document.getElementById("visaoTurmaDescricao").textContent = turma.descricao;

    detalheTurmaEl.dataset.turmaAtual = idTurma;

    listaTurmasEl.classList.add("escondido");
    detalheTurmaEl.classList.add("ativo");

    // Reseta para a primeira aba
    document.querySelectorAll(".container-botoes-turma .btn-opcao").forEach(b => b.classList.remove("ativo"));
    document.querySelector('.container-botoes-turma .btn-opcao[data-aba-turma="visao"]')?.classList.add("ativo");
    document.querySelectorAll(".conteudo-aba-turma").forEach(a => a.classList.remove("ativo"));
    document.querySelector('.conteudo-aba-turma[data-conteudo-aba="visao"]')?.classList.add("ativo");

    window.scrollTo({ top: 0, behavior: "smooth" });
}

function fecharDetalheTurma() {
    listaTurmasEl.classList.remove("escondido");
    detalheTurmaEl.classList.remove("ativo");
}

// Clique nos cards de "Minhas Turmas"
document.querySelectorAll(".card-turma").forEach(card => {
    card.addEventListener("click", () => {
        abrirDetalheTurma(card.dataset.turma);
    });
});

// Clique nos cards de resumo do Início
document.querySelectorAll("[data-abrir-turma]").forEach(card => {
    card.addEventListener("click", () => {
        navegarParaPagina("turmas");
        abrirDetalheTurma(card.dataset.abrirTurma);
    });
});

btnVoltarTurmas?.addEventListener("click", fecharDetalheTurma);

// Abas dentro do detalhe da turma
document.querySelectorAll(".container-botoes-turma .btn-opcao").forEach(botao => {
    botao.addEventListener("click", () => {
        const aba = botao.dataset.abaTurma;

        document.querySelectorAll(".container-botoes-turma .btn-opcao").forEach(b => b.classList.remove("ativo"));
        botao.classList.add("ativo");

        document.querySelectorAll(".conteudo-aba-turma").forEach(a => a.classList.remove("ativo"));
        document.querySelector(`.conteudo-aba-turma[data-conteudo-aba="${aba}"]`)?.classList.add("ativo");
    });
});

// Atalhos dentro do detalhe da turma para outras seções
document.getElementById("btnIrArquivosTurma")?.addEventListener("click", () => {
    const idTurma = detalheTurmaEl.dataset.turmaAtual;
    navegarParaPagina("arquivos");
    document.querySelector(`.btn-turma-notas[data-filtro-turma="${idTurma}"]`)?.click();
});

document.getElementById("btnIrNotasTurma")?.addEventListener("click", () => {
    const idTurma = detalheTurmaEl.dataset.turmaAtual;
    navegarParaPagina("notas");
    document.querySelector(`.btn-turma-notas[data-turma-notas="${idTurma}"]`)?.click();
});

document.getElementById("btnIrAgendaTurma")?.addEventListener("click", () => {
    navegarParaPagina("agenda");
});

// ======================================================================
// ARQUIVOS
// ======================================================================

let arquivosProfessor = [
    { tipo: "pasta", nome: "Unidade 1 - Modelagem", data: "2026-08-12", turma: "bd" },
    { tipo: "pdf", nome: "Slides - Álgebra Relacional.pdf", data: "2026-08-10", turma: "bd" },
    { tipo: "pdf", nome: "Atividade - Normalização.pdf", data: "2026-08-09", turma: "bd" },
    { tipo: "pasta", nome: "Frontend", data: "2026-08-10", turma: "prog" },
    { tipo: "pdf", nome: "Slides - Flexbox.pdf", data: "2026-08-10", turma: "prog" },
    { tipo: "pdf", nome: "Lista de Exercícios - PHP.pdf", data: "2026-08-06", turma: "prog" },
    { tipo: "pasta", nome: "Arquitetura de Sistemas", data: "2026-08-03", turma: "es" },
    { tipo: "pdf", nome: "Estudo de Caso - Microsserviços.pdf", data: "2026-08-01", turma: "es" }
];

const nomesTurmas = { bd: "Banco de Dados", prog: "Programação", es: "Engenharia de Software" };

let crescenteArquivos = true;
let filtroTurmaAtual = "todas";

const listaArquivosEl = document.getElementById("lista-arquivos");
const btnOrdenar = document.getElementById("ordenar-btn");
const textoOrdem = document.getElementById("texto-ordem");

function renderArquivosProfessor() {

    listaArquivosEl.innerHTML = "";

    let filtrados = filtroTurmaAtual === "todas"
        ? arquivosProfessor
        : arquivosProfessor.filter(a => a.turma === filtroTurmaAtual);

    const ordenados = [...filtrados].sort((a, b) => {
        return crescenteArquivos
            ? new Date(b.data) - new Date(a.data)
            : new Date(a.data) - new Date(b.data);
    });

    if (ordenados.length === 0) {
        listaArquivosEl.innerHTML = `
            <div style="padding: 30px 14px; color: #a0a0a0; text-align: center;">
                Nenhum arquivo encontrado para esta turma.
            </div>
        `;
        return;
    }

    ordenados.forEach((arq, indice) => {

        const item = document.createElement("div");
        item.className = "arquivo-item professor";

        const icone = arq.tipo === "pasta" ? "fa-folder" : "fa-file-pdf";

        item.innerHTML = `
            <div class="info-arquivo">
                <i class="fa-solid ${icone}"></i>
                <span>${arq.nome}</span>
            </div>

            <div class="data-arquivo">
                ${arq.data.split("-").reverse().join("/")}
            </div>

            <div class="professor-tag">
                ${nomesTurmas[arq.turma] || "-"}
            </div>

            <div class="acoes-arquivo">
                <button type="button" class="btn-icone-acao editar" title="Editar" data-indice="${arquivosProfessor.indexOf(arq)}">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button type="button" class="btn-icone-acao excluir" title="Excluir" data-indice="${arquivosProfessor.indexOf(arq)}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        listaArquivosEl.appendChild(item);
    });

    // Ações de editar e excluir
    listaArquivosEl.querySelectorAll(".btn-icone-acao.editar").forEach(botao => {
        botao.addEventListener("click", () => {
            const indice = Number(botao.dataset.indice);
            const arq = arquivosProfessor[indice];
            const novoNome = prompt("Renomear arquivo:", arq.nome);

            if (novoNome && novoNome.trim() !== "") {
                arq.nome = novoNome.trim();
                renderArquivosProfessor();
            }
        });
    });

    listaArquivosEl.querySelectorAll(".btn-icone-acao.excluir").forEach(botao => {
        botao.addEventListener("click", () => {
            const indice = Number(botao.dataset.indice);
            const arq = arquivosProfessor[indice];

            if (confirm(`Excluir "${arq.nome}"? Essa ação não pode ser desfeita.`)) {
                arquivosProfessor.splice(indice, 1);
                renderArquivosProfessor();
            }
        });
    });
}

btnOrdenar?.addEventListener("click", () => {
    crescenteArquivos = !crescenteArquivos;
    textoOrdem.textContent = crescenteArquivos ? "Ascendente" : "Descendente";
    btnOrdenar.classList.toggle("desc");
    renderArquivosProfessor();
});

// Filtro por turma na página de Arquivos
document.querySelectorAll("#filtroTurmaArquivos .btn-turma-notas").forEach(botao => {
    botao.addEventListener("click", () => {
        document.querySelectorAll("#filtroTurmaArquivos .btn-turma-notas").forEach(b => b.classList.remove("ativo"));
        botao.classList.add("ativo");
        filtroTurmaAtual = botao.dataset.filtroTurma;
        renderArquivosProfessor();
    });
});

renderArquivosProfessor();

// Modais: Nova pasta / Adicionar arquivo
const modalNovaPasta = document.getElementById("modalNovaPasta");
const modalAdicionarArquivo = document.getElementById("modalAdicionarArquivo");

document.getElementById("btnNovaPasta")?.addEventListener("click", () => {
    modalNovaPasta.classList.add("ativo");
});

document.getElementById("fecharModalPasta")?.addEventListener("click", () => {
    modalNovaPasta.classList.remove("ativo");
});

modalNovaPasta?.addEventListener("click", (e) => {
    if (e.target === modalNovaPasta) modalNovaPasta.classList.remove("ativo");
});

document.getElementById("formNovaPasta")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nomeNovaPasta").value.trim();
    const turma = document.getElementById("turmaNovaPasta").value;

    if (!nome) return;

    arquivosProfessor.unshift({
        tipo: "pasta",
        nome: nome,
        data: new Date().toISOString().split("T")[0],
        turma: turma
    });

    renderArquivosProfessor();
    e.target.reset();
    modalNovaPasta.classList.remove("ativo");
});

document.getElementById("btnAdicionarArquivo")?.addEventListener("click", () => {
    modalAdicionarArquivo.classList.add("ativo");
});

document.getElementById("fecharModalArquivo")?.addEventListener("click", () => {
    modalAdicionarArquivo.classList.remove("ativo");
});

modalAdicionarArquivo?.addEventListener("click", (e) => {
    if (e.target === modalAdicionarArquivo) modalAdicionarArquivo.classList.remove("ativo");
});

document.getElementById("formAdicionarArquivo")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nomeArquivo").value.trim();
    const turma = document.getElementById("turmaArquivo").value;

    if (!nome) return;

    arquivosProfessor.unshift({
        tipo: "pdf",
        nome: nome,
        data: new Date().toISOString().split("T")[0],
        turma: turma
    });

    renderArquivosProfessor();
    e.target.reset();
    modalAdicionarArquivo.classList.remove("ativo");
});

// ======================================================================
// NOTAS E FREQUÊNCIA
// ======================================================================

const corpoTabelaNotas = document.getElementById("corpoTabelaNotas");
let turmaNotasAtual = "bd";

function calcularMedia(p1, p2) {
    return ((Number(p1) + Number(p2)) / 2);
}

function renderTabelaNotas() {

    const turma = turmasProfessor[turmaNotasAtual];
    corpoTabelaNotas.innerHTML = "";

    let somaMedias = 0;
    let somaFreq = 0;
    let abaixoMinimo = 0;

    turma.alunos.forEach((aluno, indice) => {

        const media = calcularMedia(aluno.p1, aluno.p2);
        somaMedias += media;
        somaFreq += Number(aluno.freq);

        const abaixo = Number(aluno.freq) < 75;
        if (abaixo) abaixoMinimo++;

        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${aluno.nome}</td>
            <td><input type="number" class="input-nota" min="0" max="10" step="0.1" value="${aluno.p1}" data-indice="${indice}" data-campo="p1"></td>
            <td><input type="number" class="input-nota" min="0" max="10" step="0.1" value="${aluno.p2}" data-indice="${indice}" data-campo="p2"></td>
            <td class="media-calculada">${media.toFixed(1)}</td>
            <td><input type="number" class="input-frequencia" min="0" max="100" step="1" value="${aluno.freq}" data-indice="${indice}" data-campo="freq"></td>
            <td>
                <span class="badge-frequencia ${abaixo ? "abaixo" : "ok"}">
                    ${abaixo ? "Abaixo do mínimo" : "Regular"}
                </span>
            </td>
        `;
        corpoTabelaNotas.appendChild(linha);
    });

    document.getElementById("mediaTurmaGeral").textContent = (somaMedias / turma.alunos.length).toFixed(1);
    document.getElementById("freqTurmaGeral").textContent = Math.round(somaFreq / turma.alunos.length) + "%";
    document.getElementById("totalAlunosGeral").textContent = turma.alunosQtd;
    document.getElementById("abaixoMinimoGeral").textContent = abaixoMinimo;

    // Recalcular ao editar os campos
    corpoTabelaNotas.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", () => {
            const indice = Number(input.dataset.indice);
            const campo = input.dataset.campo;
            turma.alunos[indice][campo] = input.value === "" ? 0 : Number(input.value);
            renderTabelaNotas();
        });
    });
}

document.querySelectorAll("#selecaoTurmaNotas .btn-turma-notas").forEach(botao => {
    botao.addEventListener("click", () => {
        document.querySelectorAll("#selecaoTurmaNotas .btn-turma-notas").forEach(b => b.classList.remove("ativo"));
        botao.classList.add("ativo");
        turmaNotasAtual = botao.dataset.turmaNotas;
        renderTabelaNotas();
    });
});

document.getElementById("btnSalvarNotas")?.addEventListener("click", () => {
    alert("Notas e frequência salvas com sucesso!");
});

renderTabelaNotas();

// ======================================================================
// CALENDÁRIO
// ======================================================================

const eventosAcademicos = [
    { data: "2026-11-11", titulo: "Prova - Banco de Dados", horario: "19:00 - 20:00" },
    { data: "2026-11-18", titulo: "Reunião pedagógica", horario: "18:00 - 19:00" },
    { data: "2026-11-20", titulo: "Entrega - Trabalho de Programação", horario: "Envio online" },
    { data: "2026-11-25", titulo: "Prova - Programação", horario: "20:30 - 22:00" },
    { data: "2026-11-26", titulo: "Prova - Engenharia de Software", horario: "19:00 - 20:00" },
    { data: "2026-12-03", titulo: "Apresentação de Projetos - Engenharia", horario: "19:00 - 22:00" },
    { data: "2026-12-10", titulo: "Conselho de classe", horario: "17:00 - 18:30" }
];

let dataAtual = new Date(2026, 10, 1);

const mesesNomes = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const modalAnual = document.getElementById("modal-visao-anual");
const tituloMesAno = document.getElementById("mes-ano-titulo");
const fecharModalBtn = document.getElementById("fechar-modal-anual");
const gradeDias = document.getElementById("grade-dias");
const listaEventos = document.getElementById("lista-eventos");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

function renderizarCalendario() {

    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();

    tituloMesAno.textContent = `${mesesNomes[mes]} de ${ano}`;

    const primeiroDia = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    const ultimoAnterior = new Date(ano, mes, 0).getDate();

    gradeDias.innerHTML = "";

    for (let i = primeiroDia; i > 0; i--) {
        const div = document.createElement("div");
        div.className = "dia-num outro-mes";
        div.textContent = ultimoAnterior - i + 1;
        gradeDias.appendChild(div);
    }

    for (let dia = 1; dia <= ultimoDia; dia++) {
        const div = document.createElement("div");
        div.className = "dia-num";

        const data = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

        if (new Date(ano, mes, dia).getDay() === 0) div.classList.add("domingo");
        if (eventosAcademicos.some(e => e.data === data)) div.classList.add("com-evento");

        div.textContent = dia;
        gradeDias.appendChild(div);
    }

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
            ${qtd ? `<span class="badge-qtd-atividades">${qtd} ${qtd === 1 ? "atividade" : "atividades"}</span>` : ""}
        `;

        card.addEventListener("click", () => {
            dataAtual.setMonth(index);
            renderizarCalendario();
            modalAnual.classList.remove("ativo");
        });

        grid.appendChild(card);
    });
}

function renderizarEventos(ano, mes) {

    listaEventos.innerHTML = "";

    const prefixo = `${ano}-${String(mes + 1).padStart(2, "0")}`;
    const eventos = eventosAcademicos.filter(e => e.data.startsWith(prefixo));

    if (!eventos.length) {
        listaEventos.innerHTML = `
            <div class="sem-eventos-msg">
                Nenhuma prova, entrega ou reunião para este mês.
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

document.addEventListener("DOMContentLoaded", () => {

    renderizarCalendario();

    tituloMesAno?.addEventListener("click", () => {
        renderizarModalAnual();
        modalAnual.classList.add("ativo");
    });

    fecharModalBtn?.addEventListener("click", () => {
        modalAnual.classList.remove("ativo");
    });

    modalAnual?.addEventListener("click", (e) => {
        if (e.target === modalAnual) modalAnual.classList.remove("ativo");
    });

    btnPrev?.addEventListener("click", () => {
        dataAtual.setMonth(dataAtual.getMonth() - 1);
        renderizarCalendario();
    });

    btnNext?.addEventListener("click", () => {
        dataAtual.setMonth(dataAtual.getMonth() + 1);
        renderizarCalendario();
    });
});

// ======================================================================
// PERFIL
// ======================================================================

document.addEventListener('DOMContentLoaded', () => {

    // Upload de foto (preview)
    const inputUploadFoto = document.getElementById('upload-foto');
    const imgPerfil = document.getElementById('foto-perfil-img');
    const avatarPlaceholder = document.getElementById('avatar-placeholder');

    inputUploadFoto?.addEventListener('change', (e) => {

        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (event) {
            imgPerfil.src = event.target.result;
            imgPerfil.style.display = 'block';
            avatarPlaceholder.style.display = 'none';
        };

        reader.readAsDataURL(file);
    });

    // Busca automática de CEP
    const inputCep = document.getElementById('cep');
    const inputLogradouro = document.getElementById('logradouro');
    const inputBairro = document.getElementById('bairro');
    const inputCidade = document.getElementById('cidade');
    const selectUf = document.getElementById('uf');

    inputCep?.addEventListener('blur', async () => {

        const cepLimpo = inputCep.value.replace(/\D/g, '');
        if (cepLimpo.length !== 8) return;

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            const data = await response.json();

            if (!data.erro) {
                inputLogradouro.value = data.logradouro;
                inputBairro.value = data.bairro;
                inputCidade.value = data.localidade;
                selectUf.value = data.uf;
                document.getElementById('numero').focus();
            } else {
                alert('CEP não encontrado.');
            }

        } catch (erro) {
            console.error('Erro ao buscar CEP:', erro);
        }
    });

    // Salvar formulário de contato
    const formContato = document.getElementById('form-contato-endereco');

    formContato?.addEventListener('submit', (e) => {
        e.preventDefault();

        const dadosAtualizados = {
            celular: document.getElementById('celular').value,
            telRecado: document.getElementById('tel-recado').value,
            emailSecundario: document.getElementById('email-secundario').value,
            cep: inputCep.value,
            logradouro: inputLogradouro.value,
            numero: document.getElementById('numero').value,
            complemento: document.getElementById('complemento').value,
            bairro: inputBairro.value,
            cidade: inputCidade.value,
            uf: selectUf.value
        };

        console.log('Dados prontos para salvar:', dadosAtualizados);
        alert('Dados cadastrais atualizados com sucesso!');
    });

    // Alterar senha
    document.getElementById('btn-alterar-senha')?.addEventListener('click', () => {
        alert('Redirecionando para redefinição de senha...');
    });

    // Visualizador de foto (pressionar e segurar)
    const avatarWrapper = document.getElementById('avatar-container');
    const modalFoto = document.getElementById('modal-foto-perfil');
    const imgModalZoom = document.getElementById('img-modal-zoom');

    let pressTimer = null;

    function abrirModalFoto() {
        if (imgPerfil.src && imgPerfil.style.display !== 'none') {
            imgModalZoom.src = imgPerfil.src;
            modalFoto.classList.add('active');
        }
    }

    function fecharModalFoto() {
        clearTimeout(pressTimer);
        modalFoto.classList.remove('active');
    }

    function iniciarPressao(e) {
        if (e.target.closest('.btn-alterar-foto')) return;
        clearTimeout(pressTimer);
        pressTimer = setTimeout(() => { abrirModalFoto(); }, 400);
    }

    if (avatarWrapper) {
        avatarWrapper.addEventListener('mousedown', iniciarPressao);
        avatarWrapper.addEventListener('mouseup', () => { clearTimeout(pressTimer); });
        avatarWrapper.addEventListener('mouseleave', () => { clearTimeout(pressTimer); });
        avatarWrapper.addEventListener('touchstart', iniciarPressao);
        avatarWrapper.addEventListener('touchend', () => { clearTimeout(pressTimer); });
    }

    modalFoto?.addEventListener('click', (e) => {
        if (e.target === modalFoto) fecharModalFoto();
    });
});