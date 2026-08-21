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