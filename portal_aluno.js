// ======================================================================
// MENU
// ======================================================================


const menu = document.getElementById("menu");
const botaoMenu = document.getElementById("botaoMenuFechar");




// ==========================================
// ABRIR / FECHAR MENU
// ==========================================


botaoMenu.addEventListener("click", function () {


    menu.classList.toggle("aberto");


});




// ==========================================
// FECHAR AO CLICAR FORA DO MENU
// ==========================================


document.addEventListener("click", function (evento) {


    if (
        menu.classList.contains("aberto") &&
        !menu.contains(evento.target)
    ) {
        menu.classList.remove("aberto");
    }


});




// ==========================================
// ITENS DO MENU
// ==========================================


const itensMenu = document.querySelectorAll(".item-menu");


const banner = document.querySelector(".banner-portal");


const paginaInicio = document.querySelector(".pagina-inicio");


const paginasInternas = document.querySelectorAll(".pagina-interna");




itensMenu.forEach(function (item) {


    item.addEventListener("click", function () {


        const pagina = item.dataset.pagina;


        abrirPagina(pagina);


    });


});




// ==========================================
// TROCAR PÁGINA
// ==========================================


function abrirPagina(pagina) {




    // ==========================================
    // INÍCIO
    // ==========================================


    if (pagina === "inicio") {


        // Mostra o banner exatamente como antes
        banner.style.display = "flex";


        // Mostra o início
        paginaInicio.style.display = "block";


        // Esconde somente as páginas internas
        paginasInternas.forEach(function (paginaInterna) {


            paginaInterna.style.display = "none";


        });


        // Volta para o topo
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        // IMPORTANTE:
        // para aqui.
        // Não executa o código das outras páginas.
        return;
    }




    // ==========================================
    // OUTRAS PÁGINAS
    // ==========================================


    // Esconde o banner do início
    banner.style.display = "none";


    // Esconde o início
    paginaInicio.style.display = "none";


    // Esconde todas as páginas internas
    paginasInternas.forEach(function (paginaInterna) {


        paginaInterna.style.display = "none";


    });




    // ==========================================
    // MOSTRAR A PÁGINA SELECIONADA
    // ==========================================


    const paginaSelecionada = document.querySelector(
        `.pagina-interna[data-conteudo="${pagina}"]`
    );




    if (paginaSelecionada) {


        paginaSelecionada.style.display = "block";


    }




    // ==========================================
    // VOLTAR PARA O TOPO
    // ==========================================


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


}




// ==========================================
// ABRIR INÍCIO AO ENTRAR/RECARREGAR
// ==========================================


abrirPagina("inicio");


// Fazer o botão da box do início "Agenda" ir para a "Agenda" mesmo
document.getElementById('btnVerAgenda')?.addEventListener('click', () => {
    document.querySelector('.item-menu[data-pagina="agenda"]')?.click();
});


// Função auxiliar para trocar para a aba desejada via JS
function navegarParaPagina(nomePagina) {
    const botaoMenu = document.querySelector(`.item-menu[data-pagina="${nomePagina}"]`);
    if (botaoMenu) {
        botaoMenu.click();
    }
}


// Evento do botão "Ver todas"
document.getElementById('btnVerTodasAvaliações')?.addEventListener('click', () => {
    navegarParaPagina('calendario');
});


// Eventos de todos os botões "Ver mais"
document.querySelectorAll('.btn-ver-mais-calendario').forEach(botao => {
    botao.addEventListener('click', () => {
        navegarParaPagina('calendario');
    });
});




// ===============================================
// Caixa de pesquisa do cabeçalho
// ===============================================


const caixaPesquisa = document.getElementById("caixaPesquisa");
const overlay = document.getElementById("overlayPesquisa");
const fecharPesquisa = document.getElementById("fecharPesquisa");


const inputHeader = document.getElementById("pesquisa-header");
const listaHeader = document.querySelectorAll("#lista-header li");


const mensagemHeader = document.getElementById("mensagem-header");
const resultadoPesquisa = document.querySelector(".resultado-pesquisa");




// ===============================================
// Abrir pesquisa
// ===============================================


caixaPesquisa.addEventListener("click", () => {


    overlay.classList.add("ativo");
    document.body.style.overflow = "hidden";


    inputHeader.value = "";


    resultadoPesquisa.style.display = "none";


    listaHeader.forEach(item => {
        item.style.display = "none";
    });


    mensagemHeader.style.display = "none";


    // MUDANÇA AQUI: Aguarda 50ms para a animação do overlay/CSS acontecer e foca direto no input
    setTimeout(() => {
        inputHeader.focus();
    }, 50);


});


// ===============================================
// Fechar pesquisa
// ===============================================


fecharPesquisa.addEventListener("click", () => {


    overlay.classList.remove("ativo");
    document.body.style.overflow = "auto";


});




// ===============================================
// Fechar clicando fora
// ===============================================


overlay.addEventListener("click", (e) => {


    if (e.target === overlay) {


        overlay.classList.remove("ativo");
        document.body.style.overflow = "auto";


    }


});


// ===============================================
// Filtrar itens do menu
// ===============================================


inputHeader.addEventListener("input", () => {


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


// Se não encontrou nenhum item
mensagemHeader.style.display =
encontrados === 0 ? "block" : "none";


});




// ===============================================
// Clique nos itens da pesquisa
// ===============================================


listaHeader.forEach(item => {


    item.addEventListener("click", () => {


        const pagina = item.getAttribute("data-pagina");


        const botao = document.querySelector(
            `.item-menu[data-pagina="${pagina}"]`
        );


        if (botao) {


            botao.click();                    // Abre a mesma seção do menu
            overlay.classList.remove("ativo"); // Fecha a pesquisa


        }


    });


});


// ========================================
// Clique na logo direciona para o Início
// ========================================


document.getElementById('btnLogoInicio')?.addEventListener('click', () => {
    abrirPagina('inicio');
});


// ========================================
// Graduação - Alternar Abas (Notas / Certificados)
// ========================================
const botoesGraduacao = document.querySelectorAll('.btn-opcao');
const abasGraduacao = document.querySelectorAll('.conteudo-aba');


botoesGraduacao.forEach(botao => {
    botao.addEventListener('click', () => {
        const abaAlvo = botao.getAttribute('data-aba');


        // Alterna o botão ativo
        botoesGraduacao.forEach(b => b.classList.remove('ativo'));
        botao.classList.add('ativo');


        // Alterna a exibição das abas
        abasGraduacao.forEach(aba => aba.classList.remove('ativo'));
       
        if (abaAlvo) {
            document.getElementById(`aba-${abaAlvo}`)?.classList.add('ativo');
        }
    });
});


// =========================================
// Alternar seleção dos botões de semestre
// =========================================


document.addEventListener('DOMContentLoaded', () => {

    
    const botoesSemestre = document.querySelectorAll('.btn-semestre');
    const conteudosSemestre = document.querySelectorAll('.conteudo-semestre');
    let timerTooltip = null;


    botoesSemestre.forEach(botao => {
        botao.addEventListener('click', () => {
           
            // 1. Tratamento para Semestres Bloqueados (Com cadeado)
            if (botao.classList.contains('bloqueado')) {
                const tooltip = botao.querySelector('.tooltip-bloqueado');
               
                if (tooltip) {
                    // Esconde qualquer outro tooltip que esteja visível no momento
                    document.querySelectorAll('.tooltip-bloqueado').forEach(t => t.classList.remove('visivel'));
                   
                    // Exibe o tooltip do botão clicado
                    tooltip.classList.add('visivel');
                   
                    // Reinicia o temporizador caso o usuário clique novamente
                    clearTimeout(timerTooltip);
                   
                    // Esconde a mensagem após 2.5 segundos (2500 ms)
                    timerTooltip = setTimeout(() => {
                        tooltip.classList.remove('visivel');
                    }, 2500);
                }
               
                return; // Interrompe a execução para não alterar o conteúdo abaixo
            }


            // 2. Tratamento para Semestres Liberados
            const numSemestre = botao.getAttribute('data-semestre');


            // Desmarca todos os botões e destaca o clicado
            botoesSemestre.forEach(b => b.classList.remove('ativo'));
            botao.classList.add('ativo');


            // Esconde todas as caixas de conteúdos de semestres
            conteudosSemestre.forEach(c => c.classList.remove('ativo'));


            // Exibe a caixa correspondente ao semestre clicado
            const caixaAlvo = document.querySelector(`.conteudo-semestre[data-conteudo-semestre="${numSemestre}"]`);
            if (caixaAlvo) {
                caixaAlvo.classList.add('ativo');
            }
        });
    });
});


// ==========================================
// LÓGICA DO MODAL PIX
// ==========================================


const modalPix = document.getElementById("modalPix");
const btnPagar = document.getElementById("btnPagarMensalidade");
const btnFecharPix = document.getElementById("btnFecharPix");
const btnCopiarPix = document.getElementById("btnCopiarPix");
const chavePixInput = document.getElementById("chavePixInput");


// Abrir Modal
btnPagar?.addEventListener("click", () => {
    modalPix?.classList.add("ativo");
    document.body.style.overflow = "hidden"; // Evita rolagem de fundo
});


// Fechar Modal no X
btnFecharPix?.addEventListener("click", () => {
    modalPix?.classList.remove("ativo");
    document.body.style.overflow = "auto";
});


// Fechar ao clicar fora do conteúdo
modalPix?.addEventListener("click", (e) => {
    if (e.target === modalPix) {
        modalPix.classList.remove("ativo");
        document.body.style.overflow = "auto";
    }
});


// Copiar Chave Pix
btnCopiarPix?.addEventListener("click", () => {
    if (chavePixInput) {
        chavePixInput.select();
        navigator.clipboard.writeText(chavePixInput.value);


        const textoOriginal = btnCopiarPix.textContent;
        btnCopiarPix.textContent = "Chave copiada!";
        btnCopiarPix.style.background = "#2e7d32";


        setTimeout(() => {
            btnCopiarPix.textContent = textoOriginal;
            btnCopiarPix.style.background = "#6a0dad";
        }, 2000);
    }
});


// Seleciona todos os botões que devem abrir o Pix (o principal e o botão Pagar do histórico)
const botoesAbrirPix = document.querySelectorAll("#btnPagarMensalidade, .btn-abrir-pix");


botoesAbrirPix.forEach(botao => {
    botao.addEventListener("click", () => {
        modalPix?.classList.add("ativo");
        document.body.style.overflow = "hidden";
    });
});


// Ação para os botões 'Recibo' (Clicáveis, sem alerta nem erro)
const botoesRecibo = document.querySelectorAll(".btn-recibo");


botoesRecibo.forEach(botao => {
    botao.addEventListener("click", () => {
        // Reservado para funcionalidade futura
    });
});

// ========================================
// DOCUMENTOS - Alternar Abas
// ========================================

const botoesDocumentos = document.querySelectorAll(".btn-opcao-documentos");
const abasDocumentos = document.querySelectorAll(".conteudo-documento");

botoesDocumentos.forEach(botao => {
    botao.addEventListener("click", () => {

        const abaAlvo = botao.dataset.doc;

        // Alterna botão ativo
        botoesDocumentos.forEach(b => b.classList.remove("ativo"));
        botao.classList.add("ativo");

        // Alterna conteúdo
        abasDocumentos.forEach(aba => aba.classList.remove("ativo"));
        document.getElementById(`doc-${abaAlvo}`)?.classList.add("ativo");

    });
});

// ==========================================
// REQUISIÇÕES - CONTADOR DE CARACTERES
// ==========================================

const campoRequisicao = document.getElementById("reqAssunto");

campoRequisicao?.addEventListener("input", () => {

    campoRequisicao.style.height = "auto";
    campoRequisicao.style.height = campoRequisicao.scrollHeight + "px";

    const limite = 10000;
    const restantes = limite - campoRequisicao.value.length;

    document.getElementById("restantesReq").textContent =
        restantes.toLocaleString("pt-BR");

    const contador = document.querySelector(".contador-documento");
    const aviso = document.getElementById("limiteReq");

    if (restantes <= 0) {

        contador.style.color = "#ff5a5a";
        aviso.style.display = "inline";

    } else {

        contador.style.color = "#d7d7d7";
        aviso.style.display = "none";

    }

});


// =====================================
// BANCO DE DADOS DAS PROVAS
// =====================================
const eventosAcademicos = [
    { data: "2026-11-11", titulo: "Prova - Banco de dados", horario: "19:00 - 20:00" },
    { data: "2026-11-20", titulo: "Prova - PHP com MySQL", horario: "20:00 - 21:30" },
    { data: "2026-11-25", titulo: "Prova - Arquitetura Web", horario: "20:30 - 22:00" },
    { data: "2026-11-26", titulo: "Prova - MongoDB", horario: "19:00 - 20:00" },
    { data: "2026-12-10", titulo: "Trabalho Final - Engenharia", horario: "19:00 - 22:00" }
];

let dataAtual = new Date(2026, 10, 1);

const mesesNomes = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
];

// =====================================
// ELEMENTOS
// =====================================
const modalAnual = document.getElementById("modal-visao-anual");
const tituloMesAno = document.getElementById("mes-ano-titulo");
const fecharModalBtn = document.getElementById("fechar-modal-anual");
const gradeDias = document.getElementById("grade-dias");
const listaEventos = document.getElementById("lista-eventos");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");

// =====================================
// CALENDÁRIO
// =====================================
function renderizarCalendario() {

    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth();

    tituloMesAno.textContent = `${mesesNomes[mes]} de ${ano}`;

    const primeiroDia = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    const ultimoAnterior = new Date(ano, mes, 0).getDate();

    gradeDias.innerHTML = "";

    // Mês anterior
    for (let i = primeiroDia; i > 0; i--) {

        const div = document.createElement("div");
        div.className = "dia-num outro-mes";
        div.textContent = ultimoAnterior - i + 1;
        gradeDias.appendChild(div);

    }

    // Mês atual
    for (let dia = 1; dia <= ultimoDia; dia++) {

        const div = document.createElement("div");
        div.className = "dia-num";

        const data = `${ano}-${String(mes + 1).padStart(2,"0")}-${String(dia).padStart(2,"0")}`;

        if (new Date(ano, mes, dia).getDay() === 0)
            div.classList.add("domingo");

        if (eventosAcademicos.some(e => e.data === data))
            div.classList.add("com-evento");

        div.textContent = dia;
        gradeDias.appendChild(div);

    }

    // Completar grade
    const usados = primeiroDia + ultimoDia;
    const faltam = usados > 35 ? 42 - usados : 35 - usados;

    for (let i = 1; i <= faltam; i++) {

        const div = document.createElement("div");
        div.className = "dia-num outro-mes";
        div.textContent = i;
        gradeDias.appendChild(div);

    }

    renderizarEventos(ano, mes);

}

// =====================================
// MODAL ANUAL
// =====================================
function renderizarModalAnual() {

    const ano = dataAtual.getFullYear();

    document.getElementById("titulo-ano-modal").textContent = `Ano de ${ano}`;

    const grid = document.getElementById("grid-meses-ano");
    grid.innerHTML = "";

    mesesNomes.forEach((nome, index) => {

        const prefixo = `${ano}-${String(index + 1).padStart(2,"0")}`;

        const qtd = eventosAcademicos.filter(e => e.data.startsWith(prefixo)).length;

        const card = document.createElement("div");
        card.className = "card-mes-opcao";

        if (index === dataAtual.getMonth())
            card.classList.add("mes-atual-selecionado");

        if (qtd > 0)
            card.classList.add("com-atividades");

        card.innerHTML = `
            <h4>${nome}</h4>
            ${qtd ? `<span class="badge-qtd-atividades">${qtd} ${qtd === 1 ? "prova" : "provas"}</span>` : ""}
        `;

        card.addEventListener("click", () => {

            dataAtual.setMonth(index);
            renderizarCalendario();
            modalAnual.classList.remove("ativo");

        });

        grid.appendChild(card);

    });

}

// =====================================
// EVENTOS DO MÊS
// =====================================
function renderizarEventos(ano, mes) {

    listaEventos.innerHTML = "";

    const prefixo = `${ano}-${String(mes + 1).padStart(2,"0")}`;

    const eventos = eventosAcademicos.filter(e => e.data.startsWith(prefixo));

    if (!eventos.length) {

        listaEventos.innerHTML = `
            <div class="sem-eventos-msg">
                Nenhuma prova ou anotação para este mês.
            </div>
        `;
        return;

    }

    eventos.forEach(evento => {

        const dia = evento.data.split("-")[2];

        const card = document.createElement("div");
        card.className = "card-evento-cal";

        card.innerHTML = `
            <div class="badge-dia-evento">${dia}</div>

            <div class="info-evento-cal">
                <h4>${evento.titulo}</h4>
                <p>${evento.horario}</p>
            </div>
        `;

        listaEventos.appendChild(card);

    });

}

// =====================================
// INICIALIZAÇÃO
// =====================================
document.addEventListener("DOMContentLoaded", () => {

    renderizarCalendario();

    // Abrir modal
    tituloMesAno?.addEventListener("click", () => {

        renderizarModalAnual();
        modalAnual.classList.add("ativo");

    });

    // Fechar pelo X
    fecharModalBtn?.addEventListener("click", () => {
        modalAnual.classList.remove("ativo");
    });

    // Fechar clicando no fundo
    modalAnual?.addEventListener("click", (e) => {

        if (e.target === modalAnual)
            modalAnual.classList.remove("ativo");

    });

    // Navegação
    btnPrev?.addEventListener("click", () => {

        dataAtual.setMonth(dataAtual.getMonth() - 1);
        renderizarCalendario();

    });

    btnNext?.addEventListener("click", () => {

        dataAtual.setMonth(dataAtual.getMonth() + 1);
        renderizarCalendario();

    });

});

// ============================
// PERFIL
// ============================

document.addEventListener('DOMContentLoaded', () => {

    // ============================
    // 1. UPLOAD DE FOTO (PREVIEW)
    // ============================

    const btnTriggerFoto = document.getElementById('btn-trigger-foto');
    const inputUploadFoto = document.getElementById('upload-foto');
    const imgPerfil = document.getElementById('foto-perfil-img');
    const avatarPlaceholder = document.getElementById('avatar-placeholder');

    btnTriggerFoto?.addEventListener('click', () => {
        inputUploadFoto.click();
    });

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

    const inputCep = document.getElementById('cep');
    const inputLogradouro = document.getElementById('logradouro');
    const inputBairro = document.getElementById('bairro');
    const inputCidade = document.getElementById('cidade');
    const selectUf = document.getElementById('uf');

    inputCep?.addEventListener('blur', async () => {

        const cepLimpo = inputCep.value.replace(/\D/g, '');

        if (cepLimpo.length !== 8) return;

        try {

            const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            const data = await response.json();

            if (!data.erro) {

                inputLogradouro.value = data.logradouro;
                inputBairro.value = data.bairro;
                inputCidade.value = data.localidade;
                selectUf.value = data.uf;

                document.getElementById('numero').focus();

            } else {

                alert('CEP não encontrado.');

            }

        } catch (erro) {

            console.error('Erro ao buscar CEP:', erro);

        }

    });

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

        alert('Dados cadastrais atualizados com sucesso!');

    });

    // ============================
    // 4. ALTERAR SENHA
    // ============================

    const btnAlterarSenha = document.getElementById('btn-alterar-senha');

    btnAlterarSenha?.addEventListener('click', () => {

        alert('Redirecionando para redefinição de senha...');

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

        if (
            imgPerfil.src &&
            imgPerfil.style.display !== 'none'
        ) {
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

});

// ======================
// ARQUIVOS 
// ======================
const arquivos = [
    {
        tipo: "pasta",
        nome: "Site-Crud",
        data: "2026-08-12",
        professor: "Israel Dias"
    },
    {
        tipo: "pasta",
        nome: "Frontend",
        data: "2026-08-10",
        professor: "Israel Dias"
    },
    {
        tipo: "pdf",
        nome: "Slides - Flexbox.pdf",
        data: "2026-08-10",
        professor: "Israel Dias"
    },
    {
        tipo: "pasta",
        nome: "MongoDB",
        data: "2026-08-03",
        professor: "Israel Dias"
    }
];

let crescente = true;

const lista = document.getElementById("lista-arquivos");
const btn = document.getElementById("ordenar-btn");
const texto = document.getElementById("texto-ordem");

function renderArquivos(){

    lista.innerHTML = "";

    const ordenados = [...arquivos].sort((a,b)=>{
        return crescente
            ? new Date(b.data) - new Date(a.data)
            : new Date(a.data) - new Date(b.data);
    });

    ordenados.forEach(arq=>{

        const item = document.createElement("div");
        item.className = "arquivo-item";

        const icone =
            arq.tipo === "pasta"
            ? "fa-folder"
            : "fa-file-pdf";

        item.innerHTML = `
            <div class="info-arquivo">
                <i class="fa-solid ${icone}"></i>
                <span>${arq.nome}</span>
            </div>

            <div class="data-arquivo">
                ${arq.data.split("-").reverse().join("/")}
            </div>

            <div class="professor-tag">
                ${arq.professor}
            </div>
        `;

        lista.appendChild(item);

    });

}

btn.addEventListener("click",()=>{

    crescente = !crescente;

    texto.textContent = crescente
        ? "Ascendente"
        : "Descendente";

    btn.classList.toggle("desc");

    renderArquivos();

});

renderArquivos();