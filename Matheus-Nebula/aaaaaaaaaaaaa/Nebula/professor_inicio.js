// ==========================================================
// PORTAL DO PROFESSOR - INÍCIO
// Menu lateral + pesquisa do cabeçalho (comuns a todas as páginas)
// ==========================================================

// ==========================================
// ABRIR / FECHAR MENU LATERAL
// ==========================================

const menu = document.getElementById("menu");
const botaoMenu = document.getElementById("botaoMenuFechar");

botaoMenu?.addEventListener("click", function () {
    menu.classList.toggle("aberto");
});

// Fechar ao clicar fora do menu
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

// Abrir pesquisa
caixaPesquisa?.addEventListener("click", () => {

    overlay.classList.add("ativo");
    document.body.style.overflow = "hidden";

    inputHeader.value = "";
    resultadoPesquisa.style.display = "none";

    listaHeader.forEach(item => {
        item.style.display = "none";
    });

    mensagemHeader.style.display = "none";

    setTimeout(() => {
        inputHeader.focus();
    }, 50);

});

// Fechar pesquisa
fecharPesquisa?.addEventListener("click", () => {
    overlay.classList.remove("ativo");
    document.body.style.overflow = "auto";
});

// Fechar clicando fora
overlay?.addEventListener("click", (e) => {
    if (e.target === overlay) {
        overlay.classList.remove("ativo");
        document.body.style.overflow = "auto";
    }
});

// Filtrar itens da pesquisa
inputHeader?.addEventListener("input", () => {

    const texto = inputHeader.value
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    if (texto === "") {
        resultadoPesquisa.style.display = "none";
        listaHeader.forEach(item => {
            item.style.display = "none";
        });
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

// Clique em um item da pesquisa navega para a página correspondente
listaHeader.forEach(item => {
    item.addEventListener("click", () => {
        const url = item.getAttribute("data-url");
        if (url) {
            window.location.href = url;
        }
    });
});
