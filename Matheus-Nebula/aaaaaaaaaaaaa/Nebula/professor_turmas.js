// ==========================================================
// PORTAL DO PROFESSOR - MINHAS TURMAS
// Menu lateral + pesquisa (comuns) + lógica de turmas (própria)
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
// MINHAS TURMAS
// ==========================================================

// Dados das turmas do professor (mesmos números exibidos nos cards)
const turmasProfessor = {
    bd: {
        nome: "Banco de Dados",
        subtitulo: "3º Semestre · Sala 25",
        alunos: 28,
        media: 8.4,
        frequencia: "94%",
        descricao: "Turma de Banco de Dados do 3º semestre de Ciências da Computação. Encontros às segundas, terças, quartas e sextas, sempre na Sala 25. Conteúdo focado em modelagem relacional, SQL e MongoDB."
    },
    prog: {
        nome: "Programação",
        subtitulo: "2º Semestre · Sala 25",
        alunos: 32,
        media: 7.9,
        frequencia: "91%",
        descricao: "Turma de Programação do 2º semestre de Ciências da Computação. Encontros às segundas, quartas, quintas e sextas, sempre na Sala 25. Conteúdo focado em lógica de programação e fundamentos de PHP."
    },
    es: {
        nome: "Engenharia de Software",
        subtitulo: "5º Semestre · Sala 25",
        alunos: 24,
        media: 7.2,
        frequencia: "85%",
        descricao: "Turma de Engenharia de Software do 5º semestre de Ciências da Computação. Encontros às quintas e sextas, sempre na Sala 25. Conteúdo focado em processos de desenvolvimento e boas práticas de projeto."
    }
};

const listaTurmas = document.getElementById("listaTurmas");
const detalheTurma = document.getElementById("detalheTurma");
const btnVoltarTurmas = document.getElementById("btnVoltarTurmas");

const tituloTurmaDetalhe = document.getElementById("tituloTurmaDetalhe");
const subtituloTurmaDetalhe = document.getElementById("subtituloTurmaDetalhe");
const statAlunosTurma = document.getElementById("statAlunosTurma");
const statMediaTurma = document.getElementById("statMediaTurma");
const statFreqTurma = document.getElementById("statFreqTurma");
const visaoTurmaDescricao = document.getElementById("visaoTurmaDescricao");

const btnIrArquivosTurma = document.getElementById("btnIrArquivosTurma");
const btnIrNotasTurma = document.getElementById("btnIrNotasTurma");
const btnIrAgendaTurma = document.getElementById("btnIrAgendaTurma");

function abrirTurma(idTurma) {

    const turma = turmasProfessor[idTurma];
    if (!turma) return;

    tituloTurmaDetalhe.textContent = turma.nome;
    subtituloTurmaDetalhe.textContent = turma.subtitulo;
    statAlunosTurma.textContent = turma.alunos;
    statMediaTurma.textContent = turma.media;
    statFreqTurma.textContent = turma.frequencia;
    visaoTurmaDescricao.textContent = turma.descricao;

    // Atualiza os links de atalho para já chegarem filtrados na turma certa
    btnIrArquivosTurma.href = `professor_arquivos.html?turma=${idTurma}`;
    btnIrNotasTurma.href = `professor_notas.html?turma=${idTurma}`;
    btnIrAgendaTurma.href = `professor_agenda.html?turma=${idTurma}`;

    // Sempre volta para a aba "Visão Geral" ao abrir uma turma
    document.querySelectorAll(".btn-opcao[data-aba-turma]").forEach(b => b.classList.remove("ativo"));
    document.querySelector('.btn-opcao[data-aba-turma="visao"]')?.classList.add("ativo");
    document.querySelectorAll(".conteudo-aba-turma").forEach(c => c.classList.remove("ativo"));
    document.querySelector('.conteudo-aba-turma[data-conteudo-aba="visao"]')?.classList.add("ativo");

    listaTurmas.classList.add("escondido");
    detalheTurma.classList.add("ativo");

    window.scrollTo({ top: 0, behavior: "smooth" });

}

function fecharTurma() {
    detalheTurma.classList.remove("ativo");
    listaTurmas.classList.remove("escondido");
}

// Clique em um card da listagem abre o detalhe da turma
document.querySelectorAll(".card-turma").forEach(card => {
    card.addEventListener("click", () => {
        abrirTurma(card.dataset.turma);
    });
});

// Botão "Voltar para Minhas Turmas"
btnVoltarTurmas?.addEventListener("click", fecharTurma);

// Alternar abas dentro do detalhe da turma (Visão Geral / Arquivos / Notas / Agenda)
document.querySelectorAll(".btn-opcao[data-aba-turma]").forEach(botao => {
    botao.addEventListener("click", () => {

        const alvo = botao.dataset.abaTurma;

        document.querySelectorAll(".btn-opcao[data-aba-turma]").forEach(b => b.classList.remove("ativo"));
        botao.classList.add("ativo");

        document.querySelectorAll(".conteudo-aba-turma").forEach(c => c.classList.remove("ativo"));
        document.querySelector(`.conteudo-aba-turma[data-conteudo-aba="${alvo}"]`)?.classList.add("ativo");

    });
});

// Se a página foi aberta com ?turma=bd (vindo do Início, por exemplo), já abre a turma
const parametros = new URLSearchParams(window.location.search);
const turmaNaUrl = parametros.get("turma");
if (turmaNaUrl && turmasProfessor[turmaNaUrl]) {
    abrirTurma(turmaNaUrl);
}
