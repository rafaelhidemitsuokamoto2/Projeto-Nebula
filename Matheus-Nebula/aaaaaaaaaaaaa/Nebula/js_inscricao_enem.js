/*==================================================
        FORMULÁRIO DE INSCRIÇÃO NEBULA (ENEM)
==================================================*/

/*
====================================
ELEMENTOS PRINCIPAIS
====================================

Aqui ficam os elementos que serão
utilizados durante todo o formulário.
*/

//Etapa 01

const formulario = document.getElementById("formulario-nebula");


/*
====================================
VALIDAÇÃO DAS ETAPAS
====================================

Esta função verifica se todos os
campos obrigatórios da etapa atual
foram preenchidos corretamente.
*/

function validarEtapa(numeroEtapa) {

    // Localiza a etapa atual
    const etapa = document.getElementById(`etapa-${numeroEtapa}`);

    let valido = true;

    /*
    Remove qualquer marcação de erro
    deixada anteriormente.
    */
    etapa.querySelectorAll(".campo-erro").forEach(elemento => {

        elemento.classList.remove("campo-erro");

    });

    /*
    Evita validar o mesmo grupo de
    radio várias vezes.
    */
    const radiosVerificados = [];

    /*
    Busca todos os campos obrigatórios
    da etapa atual.
    */
    const campos = etapa.querySelectorAll("input[required], select[required]");



    campos.forEach(campo => {

        /*
        ==============================
        CAMPOS RADIO
        ==============================
        */
        if (campo.type === "radio") {

            if (radiosVerificados.includes(campo.name))
                return;

            radiosVerificados.push(campo.name);

            const marcado = etapa.querySelector(
                `input[name="${campo.name}"]:checked`
            );

            if (!marcado) {

                valido = false;

                const lista = campo.closest(".lista-opcoes");

                if (lista) {

                    lista.classList.add("campo-erro");

                    etapa
                        .querySelectorAll(`input[name="${campo.name}"]`)
                        .forEach(radio => {

                            radio.addEventListener("change", function removerErro() {

                                lista.classList.remove("campo-erro");

                                etapa
                                    .querySelectorAll(`input[name="${campo.name}"]`)
                                    .forEach(r => {

                                        r.removeEventListener("change", removerErro);

                                    });

                            });

                        });

                }

            }

        }

        /*
        ==============================
        CAMPOS DE ARQUIVO
        ==============================
        */
        else if (campo.type === "file") {

            if (campo.files.length === 0) {

                valido = false;

                campo.parentElement.classList.add("campo-erro");

            }

        }

        /*
        ==============================
        INPUTS E SELECTS
        ==============================
        */
        else {

            if (campo.value.trim() === "") {

                valido = false;

                campo.classList.add("campo-erro");

                campo.addEventListener("input", function limparErro() {

                    campo.classList.remove("campo-erro");

                    campo.removeEventListener("input", limparErro);

                });

            }

        }

    });

    return valido;

}


/*
====================================
PRÓXIMA ETAPA
====================================

Valida a etapa atual.

Se estiver correta, esconde a etapa
atual e mostra a próxima.
*/

function proximaEtapa(atual, proxima) {

    if (!validarEtapa(atual))
        return;

    document
        .getElementById(`etapa-${atual}`)
        .classList
        .add("etapa-escondida");

    document
        .getElementById(`etapa-${proxima}`)
        .classList
        .remove("etapa-escondida");

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/*
====================================
VOLTAR ETAPA
====================================

Oculta a etapa atual e volta para
a etapa anterior.
*/

function voltarEtapa(atual, anterior) {

    document
        .getElementById(`etapa-${atual}`)
        .classList
        .add("etapa-escondida");

    document
        .getElementById(`etapa-${anterior}`)
        .classList
        .remove("etapa-escondida");

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

//Etapa 02

/*
====================================
MÁSCARA DE CPF
====================================

Aplica automaticamente a máscara
000.000.000-00 enquanto o usuário digita.
*/

const campoCPF = document.getElementById("cpf");

if (campoCPF) {

    campoCPF.addEventListener("input", function () {

        let valor = this.value.replace(/\D/g, "");

        // CPF possui 11 números
        valor = valor.substring(0, 11);

        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

        this.value = valor;

    });

}


/*
====================================
MÁSCARA DE RG
====================================

Aplica automaticamente a máscara

00.000.000-0
*/

const campoRG = document.getElementById("rg");

if (campoRG) {

    campoRG.addEventListener("input", function () {

        let valor = this.value.replace(/\D/g, "");

        // RG utilizado pelo formulário
        valor = valor.substring(0, 9);

        valor = valor.replace(/(\d{2})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1})$/, "$1-$2");

        this.value = valor;

    });

}


/*
====================================
MÁSCARA DE TELEFONE
====================================

Aplica automaticamente a máscara

(11) 99999-9999

ou

(11) 9999-9999
*/

[
    "telefone-principal",
    "telefone-reserva"
].forEach(id => {

    const campo = document.getElementById(id);

    if (!campo)
        return;

    campo.addEventListener("input", function () {

        let valor = this.value.replace(/\D/g, "");

        // Telefones brasileiros possuem no máximo 11 números
        valor = valor.substring(0, 11);

        if (valor.length <= 10) {

            valor = valor.replace(/(\d{2})(\d)/, "($1) $2");
            valor = valor.replace(/(\d{4})(\d)/, "$1-$2");

        }

        else {

            valor = valor.replace(/(\d{2})(\d)/, "($1) $2");
            valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

        }

        this.value = valor;

    });

});


//Etapa 03
/*
====================================
MODALIDADE DE CONCORRÊNCIA
====================================

Exibe ou oculta o bloco das cotas.
*/

function toggleCotas(exibir) {

    const bloco = document.getElementById("bloco-cotas");

    if (!bloco)
        return;

    if (exibir) {

        bloco.classList.remove("etapa-escondida");

    }

    else {

        bloco.classList.add("etapa-escondida");

        /*
        Ao voltar para Ampla Concorrência,
        limpa todas as opções internas.
        */

        bloco
            .querySelectorAll('input[type="radio"]')
            .forEach(radio => {

                radio.checked = false;

            });

        /*
        Também garante que o upload PcD
        desapareça caso estivesse aberto.
        */

        toggleLaudo(false);

    }

}


/*
====================================
PESSOA COM DEFICIÊNCIA (PcD)
====================================

Mostra ou oculta o envio do laudo.
*/

function toggleLaudo(exibir) {

    const bloco = document.getElementById("upload-laudo-pcd");

    const campo = document.getElementById("laudo-pcd");

    if (!bloco || !campo)
        return;

    if (exibir) {

        bloco.classList.remove("etapa-escondida");

        campo.required = true;

    }

    else {

        bloco.classList.add("etapa-escondida");

        campo.required = false;

        campo.value = "";

        campo.classList.remove("campo-erro");

        /*
        Volta o status do upload
        para "Pendente".
        */

        atualizarStatusArquivo(campo, "status-laudo-pcd");

    }

}


/*
====================================
NOME SOCIAL
====================================

Exibe ou oculta o campo de
Nome Social.
*/

function toggleNomeSocial(exibir) {

    const bloco = document.getElementById("campo-nome-social");

    const campo = document.getElementById("nome-social");

    if (!bloco || !campo)
        return;

    if (exibir) {

        bloco.classList.remove("etapa-escondida");

        campo.required = true;

    }

    else {

        bloco.classList.add("etapa-escondida");

        campo.required = false;

        campo.value = "";

        campo.classList.remove("campo-erro");

    }

}


/*
====================================
INICIALIZAÇÃO
====================================

Configura os eventos automáticos
quando a página termina de carregar.
*/

document.addEventListener("DOMContentLoaded", function () {

    /*
    ================================
    NOME SOCIAL
    ================================
    */

    const radiosNomeSocial = document.querySelectorAll(
        'input[name="utiliza-nome-social"]'
    );

    radiosNomeSocial.forEach(radio => {

        radio.addEventListener("change", function () {

            toggleNomeSocial(this.value === "sim");

        });

    });

    /*
    Mantém o formulário sincronizado
    caso a página carregue com alguma
    opção já marcada.
    */

    const nomeSocialSelecionado = document.querySelector(
        'input[name="utiliza-nome-social"]:checked'
    );

    if (nomeSocialSelecionado) {

        toggleNomeSocial(nomeSocialSelecionado.value === "sim");

    }

});

// Etapa 04
/*
====================================
STATUS DOS ARQUIVOS
====================================

Atualiza a barra de status logo abaixo
da área de upload.
*/

function atualizarStatusArquivo(input, idStatus) {

    const status = document.getElementById(idStatus);

    if (!status)
        return;

    /*
    ================================
    NENHUM ARQUIVO
    ================================
    */

    if (input.files.length === 0) {

        status.className = "status-upload status-pendente";

        status.innerHTML = `

            <span class="status-texto-esquerda">
                • Nenhum arquivo selecionado
            </span>

            <span class="status-texto-direita">
                Pendente
            </span>

        `;

        return;

    }

    /*
    ================================
    ARQUIVO SELECIONADO
    ================================
    */

    const arquivo = input.files[0];

    status.className = "status-upload status-selecionado";

    status.innerHTML = `

        <span class="status-texto-esquerda">
            ✔ ${arquivo.name}
        </span>

        <span class="status-texto-direita">
            Selecionado
        </span>

    `;

}


/*
====================================
FINALIZAÇÃO DO FORMULÁRIO
====================================

Valida a última etapa.

Quando existir backend,
bastará substituir o comentário
por formulario.submit() ou fetch().
*/

formulario.addEventListener("submit", function (event) {

    event.preventDefault();

    /*
    Valida somente a etapa 4.
    */

    if (!validarEtapa(4))
        return;

    /*
    Neste momento o formulário
    está completamente válido.

    Futuramente basta substituir
    este comentário por:

    formulario.submit();

    ou

    fetch(...)
    */

    window.location.href = "tela-de-carregamento.html";

});
const dados = JSON.parse(
    localStorage.getItem("inscricaoNebula")
);

console.log(dados["nome-completo"]);