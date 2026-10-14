// ==========================================================
// PORTAL DO ALUNO - MEU PERFIL
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
        menu?.classList.contains("aberto") &&
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
// MEU PERFIL
// ==========================================================

// ============================
// 1. UPLOAD DE FOTO (PREVIEW)
// ============================

const inputUploadFoto = document.getElementById('upload-foto');
const imgPerfil = document.getElementById('foto-perfil-img');
const avatarPlaceholder = document.getElementById('avatar-placeholder');
const btnRemoverFoto = document.getElementById('btn-remover-foto');

// Controle da remoção da foto:
// - fotoSalvaNoServidor: o aluno já tem uma foto gravada no banco/servidor
// - removerFotoPendente: a foto foi removida na tela e falta clicar em "Salvar Alterações"
let fotoSalvaNoServidor = false;
let removerFotoPendente = false;

inputUploadFoto?.addEventListener('change', (e) => {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {
        imgPerfil.src = event.target.result;
        imgPerfil.style.display = 'block';
        avatarPlaceholder.style.display = 'none';
        if (btnRemoverFoto) btnRemoverFoto.style.display = 'flex';
        removerFotoPendente = false; // escolheu uma foto nova, então não há mais remoção pendente
    };

    reader.readAsDataURL(file);
    // O arquivo só é enviado ao servidor quando o formulário
    // de Contato & Endereço for salvo (ver "SALVAR FORMULÁRIO" abaixo).

});

// Remover foto: volta ao ícone padrão. Se já existia uma foto gravada,
// a remoção definitiva acontece ao salvar o formulário (envia "remover_foto").
btnRemoverFoto?.addEventListener('click', () => {

    imgPerfil.src = '';
    imgPerfil.style.display = 'none';
    avatarPlaceholder.style.display = 'flex';
    inputUploadFoto.value = '';
    btnRemoverFoto.style.display = 'none';

    removerFotoPendente = fotoSalvaNoServidor;

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
const btnSalvarPerfil = formContato?.querySelector('.btn-principal');

formContato?.addEventListener('submit', async (e) => {

    e.preventDefault();

    const formData = new FormData();
    formData.append('celular', document.getElementById('celular').value);
    formData.append('telRecado', document.getElementById('tel-recado').value);
    formData.append('emailSecundario', document.getElementById('email-secundario').value);
    formData.append('cep', inputCep.value);
    formData.append('logradouro', inputLogradouro.value);
    formData.append('numero', document.getElementById('numero').value);
    formData.append('complemento', document.getElementById('complemento').value);
    formData.append('bairro', inputBairro.value);
    formData.append('cidade', inputCidade.value);
    formData.append('uf', selectUf.value);

    // Só anexa a foto se o aluno escolheu um arquivo novo
    if (inputUploadFoto?.files[0]) {
        formData.append('foto', inputUploadFoto.files[0]);
    }

    // Foto removida na tela: avisa o servidor para apagar a foto gravada
    if (removerFotoPendente && !inputUploadFoto?.files[0]) {
        formData.append('remover_foto', '1');
    }

    if (btnSalvarPerfil) {
        btnSalvarPerfil.disabled = true;
        btnSalvarPerfil.style.opacity = '0.7';
    }

    try {
// Duvida, esse salva_perfil_aluno.php nem existe na minha pasta
        const resposta = await fetch('salva_perfil_aluno.php', {
            method: 'POST',
            body: formData
        });

        const dados = await resposta.json();

        if (dados.sucesso) {
            alert(dados.mensagem || 'Perfil atualizado com sucesso!');
            if (dados.foto) {
                imgPerfil.src = dados.foto + '?t=' + Date.now(); // evita cache da foto antiga
                imgPerfil.style.display = 'block';
                avatarPlaceholder.style.display = 'none';
                if (btnRemoverFoto) btnRemoverFoto.style.display = 'flex';
                fotoSalvaNoServidor = true;
                removerFotoPendente = false;
            } else if (removerFotoPendente) {
                fotoSalvaNoServidor = false;
                removerFotoPendente = false;
            }
        } else {
            alert(dados.mensagem || 'Não foi possível salvar o perfil.');
        }

    } catch (erro) {
        console.error('Erro ao salvar perfil:', erro);
        alert('Erro de conexão ao salvar o perfil.');
    } finally {
        if (btnSalvarPerfil) {
            btnSalvarPerfil.disabled = false;
            btnSalvarPerfil.style.opacity = '1';
        }
    }

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

    // Não abrir ao clicar nos botões da câmera / remover foto
    if (e.target.closest('.btn-alterar-foto') || e.target.closest('.btn-remover-foto')) return;

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

// ============================
// 6. CARREGAR PERFIL SALVO
// ============================

async function carregarPerfil() {

    try {

        const resposta = await fetch('busca_perfil_aluno.php');
        const dados = await resposta.json();

        if (!dados.sucesso) return;

        const perfil = dados.perfil;

        if (perfil.foto) {
            imgPerfil.src = perfil.foto;
            imgPerfil.style.display = 'block';
            avatarPlaceholder.style.display = 'none';
            if (btnRemoverFoto) btnRemoverFoto.style.display = 'flex';
            fotoSalvaNoServidor = true;
        }

        if (document.getElementById('celular')) document.getElementById('celular').value = perfil.celular || '';
        if (document.getElementById('tel-recado')) document.getElementById('tel-recado').value = perfil.tel_recado || '';
        if (document.getElementById('email-secundario')) document.getElementById('email-secundario').value = perfil.email_secundario || '';
        if (inputCep) inputCep.value = perfil.cep || '';
        if (inputLogradouro) inputLogradouro.value = perfil.logradouro || '';
        if (document.getElementById('numero')) document.getElementById('numero').value = perfil.numero || '';
        if (document.getElementById('complemento')) document.getElementById('complemento').value = perfil.complemento || '';
        if (inputBairro) inputBairro.value = perfil.bairro || '';
        if (inputCidade) inputCidade.value = perfil.cidade || '';
        if (selectUf) selectUf.value = perfil.uf || '';

        const chkNotifEmail = document.getElementById('chk-notif-email');
        const chkLembreteAulas = document.getElementById('chk-lembrete-aulas');
        const chkAlertaFrequencia = document.getElementById('chk-alerta-frequencia');

        if (chkNotifEmail) chkNotifEmail.checked = !!Number(perfil.notificacoes_email);
        if (chkLembreteAulas) chkLembreteAulas.checked = !!Number(perfil.lembrete_aulas);
        if (chkAlertaFrequencia) chkAlertaFrequencia.checked = !!Number(perfil.alerta_frequencia);

    } catch (erro) {
        console.error('Erro ao carregar perfil:', erro);
    }

}

carregarPerfil();

// ============================
// 7. AUTO-SAVE DOS TOGGLES
// (Configurações)
// ============================

const togglesConfiguracao = document.querySelectorAll('.lista-configuracoes input[type="checkbox"][data-campo]');

togglesConfiguracao.forEach(toggle => {

    toggle.addEventListener('change', async () => {

        const campo = toggle.getAttribute('data-campo');
        const valor = toggle.checked ? 1 : 0;

        try {

            const resposta = await fetch('salva_preferencia_aluno.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `campo=${encodeURIComponent(campo)}&valor=${valor}`
            });

            const dados = await resposta.json();

            if (!dados.sucesso) {
                alert(dados.mensagem || 'Não foi possível salvar a preferência.');
                toggle.checked = !toggle.checked; // desfaz visualmente se falhou
            }

        } catch (erro) {
            console.error('Erro ao salvar preferência:', erro);
            toggle.checked = !toggle.checked;
        }

    });

});