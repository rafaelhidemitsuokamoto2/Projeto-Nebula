/*==================================================
        FORMULÁRIO DE MATRÍCULA NEBULA
==================================================*/


/*
====================================
ELEMENTOS
====================================
*/

const formulario = document.getElementById("formulario-nebula");


/*
====================================
VALIDAÇÃO DAS ETAPAS
====================================
*/

function validarEtapa(numeroEtapa) {

    const etapa = document.getElementById(`etapa-${numeroEtapa}`);

    let valido = true;

    etapa.querySelectorAll(".campo-erro").forEach(elemento => {
        elemento.classList.remove("campo-erro");
    });

    const radiosVerificados = [];

    const campos = etapa.querySelectorAll("input[required], select[required], textarea[required]");

    campos.forEach(campo => {

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

                                radio.removeEventListener(
                                    "change",
                                    removerErro
                                );

                            });

                        });

                }

            }

        }

        else if (campo.type === "file") {

            if (campo.files.length === 0) {

                valido = false;

                campo.parentElement.classList.add("campo-erro");

            }

        }

        else if (campo.type === "checkbox") {

            if (!campo.checked) {

                valido = false;

                campo.classList.add("campo-erro");

            }

        }

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

    if (proxima === 6)
        preencherResumo();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/*
====================================
VOLTAR ETAPA
====================================
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


/*
====================================
MÁSCARA DE CPF
====================================
*/

const campoCPF = document.getElementById("cpf");

if (campoCPF) {

    campoCPF.addEventListener("input", function () {

        let valor = this.value.replace(/\D/g, "");

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
*/

const campoRG = document.getElementById("rg");

if (campoRG) {

    campoRG.addEventListener("input", function () {

        let valor = this.value.replace(/\D/g, "");

        valor = valor.substring(0, 9);

        valor = valor.replace(/(\d{2})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
        valor = valor.replace(/(\d{3})(\d{1})$/, "$1-$2");

        this.value = valor;

    });

}


/*
====================================
MÁSCARA DE CEP
====================================
*/

const campoCEP = document.getElementById("cep");

if (campoCEP) {

    campoCEP.addEventListener("input", function () {

        let valor = this.value.replace(/\D/g, "");

        valor = valor.substring(0, 8);

        valor = valor.replace(/(\d{5})(\d)/, "$1-$2");

        this.value = valor;

    });

}


/*
====================================
MÁSCARA DE TELEFONE
====================================
*/

["telefone", "telefone-reserva"].forEach(id => {

    const campo = document.getElementById(id);

    if (!campo)
        return;

    campo.addEventListener("input", function () {

        let valor = this.value.replace(/\D/g, "");

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


/*
====================================
CEP — CONSULTA DE ENDEREÇO
====================================
*/

if (campoCEP) {

    campoCEP.addEventListener("blur", consultarCEP);

}


async function consultarCEP() {

    const cep = campoCEP.value.replace(/\D/g, "");

    if (cep.length !== 8)
        return;

    try {

        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        const dados = await resposta.json();

        if (dados.erro) {

            alert("CEP não encontrado.");

            return;

        }

        const logradouro = document.getElementById("logradouro");
        const bairro = document.getElementById("bairro");
        const cidade = document.getElementById("cidade");
        const uf = document.getElementById("uf-endereco");

        logradouro.value = dados.logradouro || "";
        bairro.value = dados.bairro || "";
        cidade.value = dados.localidade || "";
        uf.value = dados.uf || "";

    }

    catch (erro) {

        console.error("Erro ao consultar o CEP:", erro);

    }

}


/*
====================================
ACESSIBILIDADE
====================================
*/

document
    .querySelectorAll('input[name="acessibilidade"]')
    .forEach(radio => {

        radio.addEventListener("change", function () {

            const campo = document.getElementById("campo-acessibilidade");

            const textarea = document.getElementById(
                "necessidade-acessibilidade"
            );

            if (this.value === "sim") {

                campo.classList.remove("etapa-escondida");

                textarea.required = true;

            }

            else {

                campo.classList.add("etapa-escondida");

                textarea.required = false;

                textarea.value = "";

                textarea.classList.remove("campo-erro");

            }

        });

    });


/*
====================================
MORADIA
====================================
*/

document
    .querySelectorAll('input[name="mora-sozinho"]')
    .forEach(radio => {

        radio.addEventListener("change", function () {

            const rendaIndividual = document.getElementById(
                "campo-renda-individual"
            );

            const campoRendaIndividual = document.getElementById(
                "renda-individual"
            );

            const grupoFamiliar = document.getElementById(
                "grupo-familiar"
            );

            const quantidadeMoradores = document.getElementById(
                "quantidade-moradores"
            );

            const rendaFamiliar = document.getElementById(
                "renda-familiar"
            );


            if (this.value === "sim") {

                rendaIndividual.classList.remove("etapa-escondida");

                campoRendaIndividual.required = true;

                grupoFamiliar.classList.add("etapa-escondida");

                quantidadeMoradores.required = false;
                rendaFamiliar.required = false;

                quantidadeMoradores.value = "";
                rendaFamiliar.value = "";

            }

            else {

                rendaIndividual.classList.add("etapa-escondida");

                campoRendaIndividual.required = false;

                campoRendaIndividual.value = "";

                grupoFamiliar.classList.remove("etapa-escondida");

                quantidadeMoradores.required = true;
                rendaFamiliar.required = true;

            }

        });

    });


/*
====================================
UPLOAD DA ETAPA 5
====================================
*/

function atualizarStatusArquivo(input, idStatus) {

    const status = document.getElementById(idStatus);

    if (!status)
        return;

    if (input.files.length === 0) {

        status.className =
            "barra-status-upload status-pendente";

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

    const arquivo = input.files[0];

    status.className =
        "barra-status-upload status-selecionado";

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
VALIDAÇÃO DOS UPLOADS
====================================
*/

function uploadsCompletos() {

    const uploads = [

        "doc-identificacao",
        "doc-certidao",
        "doc-residencia",
        "doc-certificado-ensino-medio",
        "doc-foto"

    ];

    for (const id of uploads) {

        const arquivo = document.getElementById(id);

        if (!arquivo || !arquivo.files.length) {

            alert("Envie todos os documentos obrigatórios.");

            return false;

        }

    }

    return true;

}


/*
====================================
VERIFICAÇÃO DA ETAPA 4
====================================
*/

function verificarDestinoEtapa4() {

    if (!validarEtapa(4))
        return;

    const pagamento = document.querySelector(
        'input[name="pagamento"]:checked'
    );

    if (!pagamento)
        return;

    fecharModalPix();

    proximaEtapa(4, 5);

}


/*
====================================
MODAL PIX
====================================
*/

const modalPix = document.getElementById(
    "modalPixMatricula"
);

const btnFecharPix = document.getElementById(
    "btnFecharPixMatricula"
);


function abrirModalPix() {

    if (!modalPix)
        return;

    modalPix.classList.add("ativo");

}


function fecharModalPix() {

    if (!modalPix)
        return;

    modalPix.classList.remove("ativo");

}


if (btnFecharPix) {

    btnFecharPix.addEventListener(
        "click",
        fecharModalPix
    );

}


if (modalPix) {

    modalPix.addEventListener("click", function (evento) {

        if (evento.target === modalPix)
            fecharModalPix();

    });

}


/*
====================================
COPIAR PIX
====================================
*/

const btnCopiarPix = document.getElementById(
    "btnCopiarPixMatricula"
);

const chavePix = document.getElementById(
    "chavePixMatricula"
);


if (btnCopiarPix && chavePix) {

    btnCopiarPix.addEventListener("click", async function () {

        try {

            await navigator.clipboard.writeText(
                chavePix.value
            );

            this.textContent = "Código Pix copiado!";

            setTimeout(() => {

                this.textContent = "Copiar código Pix";

            }, 2000);

        }

        catch (erro) {

            chavePix.select();

            document.execCommand("copy");

            this.textContent = "Código Pix copiado!";

            setTimeout(() => {

                this.textContent = "Copiar código Pix";

            }, 2000);

        }

    });

}
/*
====================================
ABRIR MODAL AO SELECIONAR PIX
====================================
*/

document
    .querySelectorAll('input[name="pagamento"]')
    .forEach(radio => {

        radio.addEventListener("change", function () {

            if (this.value === "PIX")
                abrirModalPix();

        });

    });


/*
====================================
RESUMO DA MATRÍCULA
====================================
*/

function preencherResumo() {

    const campos = {

        "resumo-nome": "nome-completo",
        "resumo-cpf": "cpf",
        "resumo-rg": "rg",
        "resumo-orgao-expedidor": "orgao-expedidor",
        "resumo-uf-rg": "uf-rg",
        "resumo-data-nascimento": "data-nascimento",
        "resumo-nome-mae": "nome-mae",
        "resumo-nome-pai": "nome-pai",
        "resumo-email": "email-principal",
        "resumo-telefone": "telefone",
        "resumo-telefone-reserva": "telefone-reserva",

        "resumo-cep": "cep",
        "resumo-logradouro": "logradouro",
        "resumo-numero": "numero",
        "resumo-complemento": "complemento",
        "resumo-bairro": "bairro",
        "resumo-cidade": "cidade",
        "resumo-uf-endereco": "uf-endereco",

        "resumo-nacionalidade": "nacionalidade",
        "resumo-cidade-nascimento": "cidade-nascimento",
        "resumo-uf-nascimento": "uf-nascimento"

    };


    Object.entries(campos).forEach(([resumo, campo]) => {

        const elementoResumo =
            document.getElementById(resumo);

        const elementoCampo =
            document.getElementById(campo);

        if (!elementoResumo || !elementoCampo)
            return;

        if (elementoCampo.tagName === "SELECT") {

            const opcao =
                elementoCampo.options[elementoCampo.selectedIndex];

            elementoResumo.textContent =
                opcao ? opcao.textContent : "—";

        }

        else {

            elementoResumo.textContent =
                elementoCampo.value.trim() || "—";

        }

    });


    const pagamento = document.querySelector(
        'input[name="pagamento"]:checked'
    );

    const resumoPagamento =
        document.getElementById("resumo-forma-pagamento");

    if (resumoPagamento) {

        resumoPagamento.textContent =
            pagamento ? pagamento.value : "—";

    }

}


/*
====================================
CONFIRMAÇÃO DA MATRÍCULA
====================================
*/

formulario.addEventListener("submit", function (evento) {

    evento.preventDefault();

    if (!validarEtapa(6))
        return;

    if (!uploadsCompletos())
        return;

    preencherResumo();

    window.location.href = "carregamento_matricula.html";

});