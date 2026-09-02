/*==================================================
        FORMULÁRIO DE INSCRIÇÃO NEBULA
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

    const campos = etapa.querySelectorAll("input[required]");

    campos.forEach(campo => {

        if (campo.type === "radio") {

            if (radiosVerificados.includes(campo.name))
                return;

            radiosVerificados.push(campo.name);

            const marcado = etapa.querySelector(`input[name="${campo.name}"]:checked`);

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

        else if (campo.type === "file") {

            if (campo.files.length === 0) {

                valido = false;

                campo.parentElement.classList.add("campo-erro");

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
MÁSCARA DE TELEFONE
====================================
*/

["telefone", "telefone-reserva"].forEach(id => {

    const campo = document.getElementById(id);

    if (!campo) return;

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
FAMILIAR NA NEBULA
====================================
*/

function toggleFamiliar(exibir) {

    const bloco = document.getElementById("bloco-familiar-input");

    const campo = document.getElementById("documento-familiar");

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
TRABALHO / SERVIDOR
====================================
*/

function toggleTrabalho(exibir) {

    const bloco = document.getElementById("bloco-orgao-input");

    const campo = document.getElementById("nome-orgao");

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

    atualizarBeneficios();

}


/*
====================================
DESCONTOS
====================================
*/

function atualizarBeneficios() {

    const linha = document.getElementById("linha-desconto");

    const valor = document.getElementById("valor-calculado");

    const opcaoIsencao = document.getElementById("opcao-isencao");

    let preco = 90;

    let desconto = 0;

    const familiar = document.querySelector('input[name="familiar-nebula"]:checked');

    const trabalho = document.querySelector('input[name="vinculo-trabalho"]:checked');



    if (familiar && familiar.value === "Sim") {

        desconto = Math.max(desconto, 15);

    }

    if (trabalho) {

        if (trabalho.value === "Parceira") {

            desconto = Math.max(desconto, 25);

        }

        if (trabalho.value === "Servidor") {

            desconto = Math.max(desconto, 25);

        }

    }



    if (desconto > 0) {

        preco = preco * (1 - desconto / 100);

        linha.classList.remove("etapa-escondida");

        valor.textContent = "R$ " + preco.toFixed(2).replace(".", ",");

    }

    else {

        linha.classList.add("etapa-escondida");

    }



    /*
    Se não houver desconto,
    mantém a opção de isenção disponível.
    */

    if (desconto === 0) {

        opcaoIsencao.classList.remove("etapa-escondida");

    }

    else {

        opcaoIsencao.classList.add("etapa-escondida");

    }

}


/*
====================================
EVENTOS AUTOMÁTICOS
====================================
*/

document.querySelectorAll('input[name="familiar-nebula"]').forEach(radio => {

    radio.addEventListener("change", atualizarBeneficios);

});

document.querySelectorAll('input[name="vinculo-trabalho"]').forEach(radio => {

    radio.addEventListener("change", atualizarBeneficios);

});

/*
====================================
VERIFICAÇÃO DA ETAPA 4
====================================
*/

function verificarDestinoEtapa4() {

    if (!validarEtapa(4))
        return;

    const pagamento = document.querySelector('input[name="pagamento"]:checked');

    if (!pagamento)
        return;

    if (pagamento.value === "Isencao") {

        document
            .getElementById("etapa-4")
            .classList
            .add("etapa-escondida");

        document
            .getElementById("etapa-5")
            .classList
            .remove("etapa-escondida");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }

    else {

        finalizarFormulario();

    }

}


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

        status.className = "barra-status-upload status-pendente";

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

    status.className = "barra-status-upload status-selecionado";

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

        "doc-historico",

        "doc-residencia",

        "doc-holerite",

        "doc-extrato"

    ];

    for (const id of uploads) {

        const arquivo = document.getElementById(id);

        if (!arquivo.files.length) {

            alert("Envie todos os documentos obrigatórios.");

            return false;

        }

    }

    return true;

}


/*
====================================
FINALIZAÇÃO
====================================
*/

function finalizarFormulario() {

    const etapa5 = document.getElementById("etapa-5");

    if (!etapa5.classList.contains("etapa-escondida")) {

        if (!uploadsCompletos())
            return;

    }

    window.location.href = "carregamento_vestibular.html";

}


/*
====================================
INICIALIZAÇÃO
====================================
*/

document.addEventListener("DOMContentLoaded", () => {

    atualizarBeneficios();

});