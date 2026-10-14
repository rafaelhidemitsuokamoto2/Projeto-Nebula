// ==========================================================
// PORTAL DO ALUNO - INÍCIO
// Data atual + menu lateral + pesquisa do cabeçalho
// ==========================================================

// DATA ATUAL (PT-BR)
function exibirDataAtual() {
    const elemento = document.getElementById("dataAtual");
    if (!elemento) return;

    const formatado = new Intl.DateTimeFormat("pt-BR", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    }).format(new Date());

    elemento.textContent = formatado.charAt(0).toUpperCase() + formatado.slice(1);
}

exibirDataAtual();

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


caixaPesquisa.addEventListener("click", () => {

    overlay.classList.add("ativo");
    document.body.classList.add("no-scroll");
    document.documentElement.classList.add("no-scroll");

    inputHeader.value = "";
    resultadoPesquisa.style.display = "none";

    listaHeader.forEach(item => {
        item.style.display = "none";
    });

    mensagemHeader.style.display = "none";
    inputHeader.focus();

     // Aguarda 50ms para a animação do overlay/CSS acontecer e foca direto no input
    setTimeout(() => {
        inputHeader.focus();
    }, 50);

});

// ===============================================
// Fechar pesquisa
// ===============================================

fecharPesquisa.addEventListener("click", () => {

    overlay.classList.remove("ativo");
    document.body.classList.remove("no-scroll");
    document.documentElement.classList.remove("no-scroll");

});


// ===============================================
// Fechar clicando fora
// ===============================================

overlay.addEventListener("click", (e) => {

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