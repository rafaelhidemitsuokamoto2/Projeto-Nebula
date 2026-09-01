// ==========================================================
// PORTAL DO PROFESSOR - NOTAS E FREQUÊNCIA
// Menu lateral + pesquisa (comuns) + lógica de notas (própria)
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
// NOTAS E FREQUÊNCIA
// ==========================================================

// Frequência mínima exigida (%) para não entrar na aba "abaixo do mínimo"
const FREQUENCIA_MINIMA = 75;

// Dados das turmas do professor: total de matriculados (mesmo número
// exibido em Minhas Turmas) + uma amostra de alunos para lançamento de notas
const turmasNotas = {
    bd: {
        alunosMatriculados: 28,
        alunos: [
            { nome: "Ana Beatriz Souza",       p1: 9.0, p2: 9.0, frequencia: 98 },
            { nome: "Bruno Carvalho Lima",     p1: 8.5, p2: 8.0, frequencia: 95 },
            { nome: "Camila Rocha Dias",       p1: 9.5, p2: 9.0, frequencia: 99 },
            { nome: "Diego Fernandes Costa",   p1: 6.0, p2: 6.5, frequencia: 68 },
            { nome: "Eduarda Ramos Lima",      p1: 8.0, p2: 8.5, frequencia: 92 },
            { nome: "Felipe Martins Souza",    p1: 7.5, p2: 7.0, frequencia: 70 },
            { nome: "Gabriela Nunes Prado",    p1: 9.0, p2: 9.5, frequencia: 100 },
            { nome: "Henrique Alves Teixeira", p1: 8.5, p2: 9.0, frequencia: 94 }
        ]
    },
    prog: {
        alunosMatriculados: 32,
        alunos: [
            { nome: "Isabela Martins Rocha",   p1: 8.0, p2: 7.5, frequencia: 92 },
            { nome: "João Pedro Alves",        p1: 7.0, p2: 7.5, frequencia: 88 },
            { nome: "Karina Souza Lima",       p1: 8.5, p2: 8.0, frequencia: 95 },
            { nome: "Lucas Fernandes Prado",   p1: 6.5, p2: 6.0, frequencia: 70 },
            { nome: "Mariana Costa Dias",      p1: 7.5, p2: 8.0, frequencia: 90 },
            { nome: "Nicolas Teixeira Souza",  p1: 8.0, p2: 7.0, frequencia: 93 },
            { nome: "Otávio Ramos Lima",       p1: 7.0, p2: 7.5, frequencia: 89 },
            { nome: "Patrícia Nunes Alves",    p1: 9.0, p2: 8.5, frequencia: 96 }
        ]
    },
    es: {
        alunosMatriculados: 24,
        alunos: [
            { nome: "Rafael Costa Martins",       p1: 7.5, p2: 7.0, frequencia: 88 },
            { nome: "Sabrina Lima Souza",         p1: 8.0, p2: 7.5, frequencia: 90 },
            { nome: "Thiago Alves Rocha",         p1: 6.0, p2: 6.5, frequencia: 68 },
            { nome: "Vitória Prado Dias",         p1: 7.0, p2: 6.5, frequencia: 84 },
            { nome: "William Souza Teixeira",     p1: 6.5, p2: 7.0, frequencia: 70 },
            { nome: "Yasmin Ramos Costa",         p1: 7.5, p2: 8.0, frequencia: 92 },
            { nome: "Bernardo Nunes Lima",        p1: 6.0, p2: 6.0, frequencia: 65 },
            { nome: "Camille Fernandes Alves",    p1: 8.0, p2: 8.5, frequencia: 94 }
        ]
    }
};

let turmaAtual = "bd";

const corpoTabelaNotas = document.getElementById("corpoTabelaNotas");
const mediaTurmaGeral = document.getElementById("mediaTurmaGeral");
const freqTurmaGeral = document.getElementById("freqTurmaGeral");
const totalAlunosGeral = document.getElementById("totalAlunosGeral");
const abaixoMinimoGeral = document.getElementById("abaixoMinimoGeral");
const btnSalvarNotas = document.getElementById("btnSalvarNotas");

function calcularMedia(p1, p2) {
    return (p1 + p2) / 2;
}

function situacaoPorMedia(media) {
    if (media >= 7) return { texto: "Aprovado", classe: "aprovado" };
    if (media >= 5) return { texto: "Recuperação", classe: "recuperacao" };
    return { texto: "Reprovado", classe: "reprovado" };
}

// Monta as linhas da tabela para a turma informada
function renderizarTabela(idTurma) {

    const turma = turmasNotas[idTurma];
    if (!turma) return;

    corpoTabelaNotas.innerHTML = "";

    turma.alunos.forEach((aluno, indice) => {

        const media = calcularMedia(aluno.p1, aluno.p2);
        const situacao = situacaoPorMedia(media);
        const freqAbaixo = aluno.frequencia < FREQUENCIA_MINIMA;

        const linha = document.createElement("tr");
        linha.dataset.indiceAluno = indice;

        linha.innerHTML = `
            <td>${aluno.nome}</td>
            <td><input type="number" class="input-nota" data-campo="p1" min="0" max="10" step="0.5" value="${aluno.p1}"></td>
            <td><input type="number" class="input-nota" data-campo="p2" min="0" max="10" step="0.5" value="${aluno.p2}"></td>
            <td class="media-calculada">${media.toFixed(1)}</td>
            <td><input type="number" class="input-frequencia" data-campo="frequencia" min="0" max="100" step="1" value="${aluno.frequencia}"></td>
            <td>
                <span class="badge-situacao ${situacao.classe}">${situacao.texto}</span>
                <span class="badge-frequencia ${freqAbaixo ? "abaixo" : "ok"}" style="margin-left:6px;">${aluno.frequencia}%</span>
            </td>
        `;

        corpoTabelaNotas.appendChild(linha);

    });

}

// Recalcula os cards de estatística com base nos valores atuais da tabela
// (considera edições ainda não salvas, para o professor ver o impacto na hora)
function atualizarEstatisticas(idTurma) {

    const turma = turmasNotas[idTurma];
    if (!turma) return;

    const linhas = corpoTabelaNotas.querySelectorAll("tr");

    let somaMedias = 0;
    let somaFrequencias = 0;
    let abaixoMinimo = 0;

    linhas.forEach(linha => {

        const p1 = parseFloat(linha.querySelector('[data-campo="p1"]').value) || 0;
        const p2 = parseFloat(linha.querySelector('[data-campo="p2"]').value) || 0;
        const freq = parseFloat(linha.querySelector('[data-campo="frequencia"]').value) || 0;

        somaMedias += calcularMedia(p1, p2);
        somaFrequencias += freq;

        if (freq < FREQUENCIA_MINIMA) abaixoMinimo++;

    });

    const totalAmostra = linhas.length || 1;

    mediaTurmaGeral.textContent = (somaMedias / totalAmostra).toFixed(1);
    freqTurmaGeral.textContent = Math.round(somaFrequencias / totalAmostra) + "%";
    totalAlunosGeral.textContent = turma.alunosMatriculados;
    abaixoMinimoGeral.textContent = abaixoMinimo;

}

// Recalcula apenas a linha editada (média + badges), sem redesenhar a tabela toda
function atualizarLinha(linha) {

    const p1 = parseFloat(linha.querySelector('[data-campo="p1"]').value) || 0;
    const p2 = parseFloat(linha.querySelector('[data-campo="p2"]').value) || 0;
    const freq = parseFloat(linha.querySelector('[data-campo="frequencia"]').value) || 0;

    const media = calcularMedia(p1, p2);
    const situacao = situacaoPorMedia(media);
    const freqAbaixo = freq < FREQUENCIA_MINIMA;

    linha.querySelector(".media-calculada").textContent = media.toFixed(1);

    const badgeSituacao = linha.querySelector(".badge-situacao");
    badgeSituacao.textContent = situacao.texto;
    badgeSituacao.className = `badge-situacao ${situacao.classe}`;

    const badgeFrequencia = linha.querySelector(".badge-frequencia");
    badgeFrequencia.textContent = `${freq}%`;
    badgeFrequencia.className = `badge-frequencia ${freqAbaixo ? "abaixo" : "ok"}`;

}

// Troca a turma exibida na tela
function abrirTurmaNotas(idTurma) {

    if (!turmasNotas[idTurma]) return;

    turmaAtual = idTurma;

    document.querySelectorAll(".btn-turma-notas[data-turma-notas]").forEach(botao => {
        botao.classList.toggle("ativo", botao.dataset.turmaNotas === idTurma);
    });

    renderizarTabela(idTurma);
    atualizarEstatisticas(idTurma);

}

// Clique nos botões de seleção de turma
document.querySelectorAll(".btn-turma-notas[data-turma-notas]").forEach(botao => {
    botao.addEventListener("click", () => {
        abrirTurmaNotas(botao.dataset.turmaNotas);
    });
});

// Digitação em qualquer campo de nota/frequência recalcula a linha e os cards
corpoTabelaNotas?.addEventListener("input", (evento) => {

    const linha = evento.target.closest("tr");
    if (!linha) return;

    atualizarLinha(linha);
    atualizarEstatisticas(turmaAtual);

});

// Botão "Salvar alterações": grava os valores atuais na "base" em memória
btnSalvarNotas?.addEventListener("click", () => {

    const turma = turmasNotas[turmaAtual];
    const linhas = corpoTabelaNotas.querySelectorAll("tr");

    linhas.forEach(linha => {

        const indice = Number(linha.dataset.indiceAluno);
        const aluno = turma.alunos[indice];

        aluno.p1 = parseFloat(linha.querySelector('[data-campo="p1"]').value) || 0;
        aluno.p2 = parseFloat(linha.querySelector('[data-campo="p2"]').value) || 0;
        aluno.frequencia = parseFloat(linha.querySelector('[data-campo="frequencia"]').value) || 0;

    });

    const textoOriginal = btnSalvarNotas.innerHTML;
    btnSalvarNotas.innerHTML = `<i class="fa-solid fa-check"></i> Salvo!`;

    setTimeout(() => {
        btnSalvarNotas.innerHTML = textoOriginal;
    }, 1800);

});

// Se a página foi aberta com ?turma=bd (vindo de Minhas Turmas, por exemplo),
// já abre direto na turma certa
const parametros = new URLSearchParams(window.location.search);
const turmaNaUrl = parametros.get("turma");

abrirTurmaNotas(turmasNotas[turmaNaUrl] ? turmaNaUrl : "bd");
