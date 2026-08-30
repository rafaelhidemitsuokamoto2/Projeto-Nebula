// ==========================================================
// PORTAL DO PROFESSOR - MEU PERFIL
// Menu lateral + pesquisa (comuns) + lógica do perfil (própria)
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
// MEU PERFIL
// ==========================================================

// ============================
// 1. UPLOAD DE FOTO (PREVIEW)
// ============================

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

// ============================
// 2. BUSCA AUTOMÁTICA DE CEP
// ============================

const inputCep = document.getElementById("cep");
const inputLogradouro = document.getElementById("logradouro");
const inputBairro = document.getElementById("bairro");
const inputCidade = document.getElementById("cidade");
const selectUf = document.getElementById("uf");

inputCep?.addEventListener("blur", consultarCEP);

async function consultarCEP() {

    const cep = inputCep.value.replace(/\D/g, "");

    if (cep.length !== 8) return;

    try {

        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();

        if (dados.erro) {
            alert("CEP não encontrado.");
            return;
        }

        inputLogradouro.value = dados.logradouro || "";
        inputBairro.value = dados.bairro || "";
        inputCidade.value = dados.localidade || "";
        selectUf.value = dados.uf || "";

        document.getElementById("numero").focus();

    } catch (erro) {
        console.error("Erro ao consultar o CEP:", erro);
    }

}

// ============================
// 3. SALVAR FORMULÁRIO
// ============================

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

});

// ============================
// 4. ALTERAR SENHA
// ============================

const btnAlterarSenha = document.getElementById('btn-alterar-senha');

btnAlterarSenha?.addEventListener('click', () => {
    // Reservado para o fluxo de troca de senha
});

// ============================
// 5. VISUALIZADOR DE FOTO
// (PRESS & HOLD)
// ============================

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

    // Não abrir ao clicar no botão da câmera
    if (e.target.closest('.btn-alterar-foto')) return;

    clearTimeout(pressTimer);

    pressTimer = setTimeout(() => {
        abrirModalFoto();
    }, 400);

}

if (avatarWrapper) {

    // Desktop
    avatarWrapper.addEventListener('mousedown', iniciarPressao);

    avatarWrapper.addEventListener('mouseup', () => {
        clearTimeout(pressTimer);
    });

    avatarWrapper.addEventListener('mouseleave', () => {
        clearTimeout(pressTimer);
    });

    // Mobile
    avatarWrapper.addEventListener('touchstart', iniciarPressao);

    avatarWrapper.addEventListener('touchend', () => {
        clearTimeout(pressTimer);
    });

}

// Fecha SOMENTE clicando fora
modalFoto?.addEventListener('click', (e) => {
    if (e.target === modalFoto) {
        fecharModalFoto();
    }
});
