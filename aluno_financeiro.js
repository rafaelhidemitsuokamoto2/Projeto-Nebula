// ==========================================================
// PORTAL DO ALUNO - FINANCEIRO
// Menu lateral + pesquisa expansível + modal Pix
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
// MODAL PIX
// ==========================================================
const modalPix = document.getElementById("modalPix");
const btnFecharPix = document.getElementById("btnFecharPix");
const btnCopiarPix = document.getElementById("btnCopiarPix");
const chavePixInput = document.getElementById("chavePixInput");

function abrirPix() {
    modalPix?.classList.add("ativo");
    document.body.style.overflow = "hidden";
}

function fecharPix() {
    modalPix?.classList.remove("ativo");
    document.body.style.overflow = "auto";
}

// Botões que abrem o Pix (o principal e o "Pagar" do histórico)
document.querySelectorAll("#btnPagarMensalidade, .btn-abrir-pix").forEach(botao => {
    botao.addEventListener("click", abrirPix);
});

// Fechar no X, clicando fora ou com Esc
btnFecharPix?.addEventListener("click", fecharPix);

modalPix?.addEventListener("click", (e) => {
    if (e.target === modalPix) fecharPix();
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalPix?.classList.contains("ativo")) fecharPix();
});

// Copiar código Pix
let timerCopiar = null;

btnCopiarPix?.addEventListener("click", async () => {
    if (!chavePixInput) return;

    chavePixInput.select();

    try {
        await navigator.clipboard.writeText(chavePixInput.value);
    } catch (erro) {
        // Plano B para navegadores/contextos sem a API de clipboard
        document.execCommand("copy");
    }

    btnCopiarPix.textContent = "Código copiado!";
    btnCopiarPix.classList.add("copiado");

    clearTimeout(timerCopiar);
    timerCopiar = setTimeout(() => {
        btnCopiarPix.textContent = "Copiar código Pix";
        btnCopiarPix.classList.remove("copiado");
    }, 2000);
});