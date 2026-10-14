// ==========================================================
// PORTAL DO ALUNO - DOCUMENTOS
// Menu lateral + pesquisa expansível + abas + requisições
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
// ABAS (Documentos / Requisições)
// ==========================================================
const botoesAba = document.querySelectorAll(".btn-opcao");
const abasDocumentos = document.querySelectorAll(".conteudo-documento");

botoesAba.forEach(botao => {
    botao.addEventListener("click", () => {
        const alvo = botao.getAttribute("data-doc");

        botoesAba.forEach(b => b.classList.remove("ativo"));
        botao.classList.add("ativo");

        abasDocumentos.forEach(a => a.classList.remove("ativo"));
        document.getElementById(`doc-${alvo}`)?.classList.add("ativo");
    });
});

// ==========================================================
// REQUISIÇÕES - Contador de caracteres
// ==========================================================
const campoRequisicao = document.getElementById("reqAssunto");
const contadorRequisicao = document.querySelector(".contador-documento");
const restantesRequisicao = document.getElementById("restantesReq");

campoRequisicao?.addEventListener("input", () => {

    // Cresce junto com o texto
    campoRequisicao.style.height = "auto";
    campoRequisicao.style.height = campoRequisicao.scrollHeight + "px";

    const limite = 10000;
    const restantes = limite - campoRequisicao.value.length;

    restantesRequisicao.textContent = restantes.toLocaleString("pt-BR");
    contadorRequisicao.classList.toggle("no-limite", restantes <= 0);
});