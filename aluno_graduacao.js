// ==========================================================
// PORTAL DO ALUNO - MINHA GRADUAÇÃO
// Menu lateral + pesquisa + abas + semestres
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

fecharPesquisa.addEventListener("click", () => {

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
// ABAS (Notas e semestres / Certificados)
// ==========================================================
const botoesAba = document.querySelectorAll(".btn-opcao");
const paineisAba = document.querySelectorAll(".conteudo-aba");

botoesAba.forEach(botao => {
    botao.addEventListener("click", () => {
        const alvo = botao.getAttribute("data-aba");

        botoesAba.forEach(b => b.classList.remove("ativo"));
        botao.classList.add("ativo");

        paineisAba.forEach(p => p.classList.remove("ativo"));
        document.getElementById(`aba-${alvo}`)?.classList.add("ativo");
    });
});

// ==========================================================
// SEMESTRES
// Liberados trocam o conteúdo; bloqueados mostram um aviso
// ==========================================================
const botoesSemestre = document.querySelectorAll(".btn-semestre");
const conteudosSemestre = document.querySelectorAll(".conteudo-semestre");
let timerTooltip = null;

botoesSemestre.forEach(botao => {
    botao.addEventListener("click", () => {

        if (botao.classList.contains("bloqueado")) {
            const tooltip = botao.querySelector(".tooltip-bloqueado");
            if (!tooltip) return;

            document.querySelectorAll(".tooltip-bloqueado").forEach(t => t.classList.remove("visivel"));
            tooltip.classList.add("visivel");

            clearTimeout(timerTooltip);
            timerTooltip = setTimeout(() => tooltip.classList.remove("visivel"), 2500);
            return;
        }

        const numSemestre = botao.getAttribute("data-semestre");

        botoesSemestre.forEach(b => b.classList.remove("ativo"));
        botao.classList.add("ativo");

        conteudosSemestre.forEach(c => c.classList.remove("ativo"));
        document
            .querySelector(`.conteudo-semestre[data-conteudo-semestre="${numSemestre}"]`)
            ?.classList.add("ativo");
    });
});