// ==========================================================
// PORTAL DO PROFESSOR - ARQUIVOS
// Menu lateral + pesquisa (comuns) + lógica de arquivos (própria)
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
// ARQUIVOS
// ==========================================================

const nomesTurmas = {
    bd: "Banco de Dados",
    prog: "Programação",
    es: "Engenharia de Software"
};

// Base de arquivos/pastas em memória
let arquivos = [
    { tipo: "pasta", nome: "Site-Crud",                       data: "2026-08-12", turma: "prog" },
    { tipo: "pasta", nome: "Frontend",                        data: "2026-08-10", turma: "prog" },
    { tipo: "pdf",   nome: "Slides - Flexbox.pdf",            data: "2026-08-10", turma: "prog" },
    { tipo: "pasta", nome: "MongoDB",                         data: "2026-08-03", turma: "bd" },
    { tipo: "slide", nome: "Slides - Padrões de Projeto.pdf", data: "2026-08-06", turma: "es" },
    { tipo: "atividade", nome: "Enunciado - Trabalho Final.pdf", data: "2026-08-01", turma: "es" }
];

let crescente = true;
let filtroAtual = "todas";
let pastaAtual = null; // quando != null, estamos "dentro" de uma pasta (nome dela)

const lista = document.getElementById("lista-arquivos");
const btnOrdenar = document.getElementById("ordenar-btn");
const textoOrdem = document.getElementById("texto-ordem");
const breadcrumb = document.getElementById("breadcrumbArquivos");

const iconesPorTipo = {
    pasta: "fa-folder",
    pdf: "fa-file-pdf",
    slide: "fa-file-powerpoint",
    atividade: "fa-file-lines"
};

function renderBreadcrumb() {

    breadcrumb.innerHTML = `<span data-caminho="">Início</span>`;

    if (pastaAtual) {
        breadcrumb.innerHTML += `<i class="fa-solid fa-chevron-right" style="font-size:10px;"></i><span data-caminho="${pastaAtual}">${pastaAtual}</span>`;
    }

    breadcrumb.querySelectorAll("span").forEach(span => {
        span.addEventListener("click", () => {
            pastaAtual = span.dataset.caminho || null;
            renderArquivos();
        });
    });

}

function renderArquivos() {

    renderBreadcrumb();

    lista.innerHTML = "";

    // Dentro de uma pasta ainda não há sub-arquivos neste protótipo
    if (pastaAtual) {
        lista.innerHTML = `<div class="sem-arquivos-msg">Esta pasta ainda não tem arquivos. Use "Adicionar arquivo" para começar.</div>`;
        return;
    }

    const filtrados = arquivos.filter(arq => {
        return filtroAtual === "todas" || arq.turma === filtroAtual;
    });

    const ordenados = [...filtrados].sort((a, b) => {
        return crescente
            ? new Date(b.data) - new Date(a.data)
            : new Date(a.data) - new Date(b.data);
    });

    if (!ordenados.length) {
        lista.innerHTML = `<div class="sem-arquivos-msg">Nenhum arquivo encontrado para este filtro.</div>`;
        return;
    }

    ordenados.forEach((arq, indice) => {

        const item = document.createElement("div");
        item.className = "arquivo-item professor";
        if (arq.tipo === "pasta") item.classList.add("clicavel");

        const icone = iconesPorTipo[arq.tipo] || "fa-file";

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
                <button type="button" class="btn-icone-acao excluir" title="Excluir" data-indice="${indice}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;

        if (arq.tipo === "pasta") {
            item.querySelector(".info-arquivo").addEventListener("click", () => {
                pastaAtual = arq.nome;
                renderArquivos();
            });
        }

        item.querySelector(".btn-icone-acao.excluir").addEventListener("click", (e) => {
            e.stopPropagation();
            if (confirm(`Excluir "${arq.nome}"?`)) {
                arquivos = arquivos.filter(a => a !== arq);
                renderArquivos();
            }
        });

        lista.appendChild(item);

    });

}

// Filtro por turma
document.querySelectorAll("#filtroTurmaArquivos [data-filtro-turma]").forEach(botao => {
    botao.addEventListener("click", () => {

        document.querySelectorAll("#filtroTurmaArquivos [data-filtro-turma]").forEach(b => b.classList.remove("ativo"));
        botao.classList.add("ativo");

        filtroAtual = botao.dataset.filtroTurma;
        pastaAtual = null;
        renderArquivos();

    });
});

// Ordenar por data
btnOrdenar?.addEventListener("click", () => {

    crescente = !crescente;

    textoOrdem.textContent = crescente ? "Ascendente" : "Descendente";
    btnOrdenar.classList.toggle("desc");

    renderArquivos();

});

// ==========================================================
// MODAL: NOVA PASTA
// ==========================================================

const modalNovaPasta = document.getElementById("modalNovaPasta");
const btnNovaPasta = document.getElementById("btnNovaPasta");
const fecharModalPasta = document.getElementById("fecharModalPasta");
const formNovaPasta = document.getElementById("formNovaPasta");

btnNovaPasta?.addEventListener("click", () => {
    modalNovaPasta.classList.add("ativo");
});

fecharModalPasta?.addEventListener("click", () => {
    modalNovaPasta.classList.remove("ativo");
});

modalNovaPasta?.addEventListener("click", (e) => {
    if (e.target === modalNovaPasta) modalNovaPasta.classList.remove("ativo");
});

formNovaPasta?.addEventListener("submit", (e) => {

    e.preventDefault();

    const nome = document.getElementById("nomeNovaPasta").value.trim();
    const turma = document.getElementById("turmaNovaPasta").value;

    if (!nome) return;

    arquivos.unshift({
        tipo: "pasta",
        nome,
        data: new Date().toISOString().split("T")[0],
        turma
    });

    formNovaPasta.reset();
    modalNovaPasta.classList.remove("ativo");
    renderArquivos();

});

// ==========================================================
// MODAL: ADICIONAR ARQUIVO
// ==========================================================

const modalAdicionarArquivo = document.getElementById("modalAdicionarArquivo");
const btnAdicionarArquivo = document.getElementById("btnAdicionarArquivo");
const fecharModalArquivo = document.getElementById("fecharModalArquivo");
const formAdicionarArquivo = document.getElementById("formAdicionarArquivo");

btnAdicionarArquivo?.addEventListener("click", () => {
    modalAdicionarArquivo.classList.add("ativo");
});

fecharModalArquivo?.addEventListener("click", () => {
    modalAdicionarArquivo.classList.remove("ativo");
});

modalAdicionarArquivo?.addEventListener("click", (e) => {
    if (e.target === modalAdicionarArquivo) modalAdicionarArquivo.classList.remove("ativo");
});

formAdicionarArquivo?.addEventListener("submit", (e) => {

    e.preventDefault();

    const nome = document.getElementById("nomeArquivo").value.trim();
    const tipo = document.getElementById("tipoArquivo").value;
    const turma = document.getElementById("turmaArquivo").value;

    if (!nome) return;

    arquivos.unshift({
        tipo,
        nome,
        data: new Date().toISOString().split("T")[0],
        turma
    });

    formAdicionarArquivo.reset();
    modalAdicionarArquivo.classList.remove("ativo");
    renderArquivos();

});

// ==========================================================
// Se a página foi aberta com ?turma=bd (vindo de Minhas Turmas,
// por exemplo), já abre com o filtro daquela turma selecionado
// ==========================================================

const parametros = new URLSearchParams(window.location.search);
const turmaNaUrl = parametros.get("turma");

if (turmaNaUrl && nomesTurmas[turmaNaUrl]) {
    filtroAtual = turmaNaUrl;
    document.querySelectorAll("#filtroTurmaArquivos [data-filtro-turma]").forEach(b => {
        b.classList.toggle("ativo", b.dataset.filtroTurma === turmaNaUrl);
    });
}

renderArquivos();
