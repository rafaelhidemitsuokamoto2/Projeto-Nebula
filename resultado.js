/* =====================================================================
   resultado.js
   Página de Resultado — Vestibular Unificado Nebula
   Inspirada no layout de resultado do Prouni (print de referência).

   Para atualizar os dados exibidos, basta editar os objetos abaixo.
   Nenhuma outra parte do código precisa ser tocada.
   ===================================================================== */

/* -----------------------------------------------------------------
   1. DADOS DO CANDIDATO
   ----------------------------------------------------------------- */
const dadosCandidato = {
    nome: "Ana Beatriz Souza Lima",
    numeroInscricao: "NEB-2026-0143257",
    chamada: "Chamada Regular"
};

/* -----------------------------------------------------------------
   2. DADOS DAS OPÇÕES DE CURSO
   status aceito: "aprovado" | "espera" | "reprovado"
   ----------------------------------------------------------------- */
const dadosResultado = [
    {
        numeroOpcao: 1,
        nomeCurso: "Astronomia",
        codigoCurso: "1614357",
        tipoBolsa: "Bolsa Integral",
        valorBruto: "R$ 3.485,00",
        valorDesconto: "R$ 3.125,00",
        valorProuni: "R$ 0,00",
        grau: "Bacharelado",
        turno: "Noturno",
        modalidade: "Cota PPI",
        status: "espera",
        textoStatus: "Não pré-selecionado",
        bolsasListaEspera: 4,
        instituicao: "Nebula — Campus Central de Astrofísica",
        localOferta: "Avenida das Estrelas, nº372",
        enderecoLink: "#",
        municipio: "São Paulo, SP",
        alunoInstituicao: "Não",
        alunoCursoTurno: "Não",
        criterio: "Estudante que tenha cursado o Ensino Médio completo em escola da rede pública."
    },
    {
        numeroOpcao: 2,
        nomeCurso: "Ciências da Computação",
        codigoCurso: "1637326",
        tipoBolsa: "Bolsa Integral",
        valorBruto: "R$ 2.639,00",
        valorDesconto: "R$ 2.639,00",
        valorProuni: "R$ 0,00",
        grau: "Bacharelado",
        turno: "Noturno",
        modalidade: "Ampla concorrência",
        status: "aprovado",
        textoStatus: "Pré-selecionado",
        bolsasListaEspera: 0,
        instituicao: "Nebula — Campus Tecnológico Liberdade",
        localOferta: "Avenida das Estrelas, nº372",
        enderecoLink: "#",
        municipio: "São Paulo, SP",
        alunoInstituicao: "Não",
        alunoCursoTurno: "Não",
        criterio: "Estudante que tenha cursado o ensino médio completo em escola da rede pública."
    }
];

/* -----------------------------------------------------------------
   3. RENDERIZAÇÃO
   ----------------------------------------------------------------- */

// Converte o status em texto/classe da barra colorida
function configuracaoStatus(item) {
    switch (item.status) {
        case "aprovado":
            return { classe: "status-aprovado", rotulo: item.textoStatus || "Pré-selecionado" };
        case "espera":
            return { classe: "status-espera", rotulo: item.textoStatus || "Lista de Espera" };
        case "reprovado":
        default:
            return { classe: "status-reprovado", rotulo: item.textoStatus || "Não selecionado" };
    }
}

function montarNumeral(numero) {
    return `${numero}ª`;
}

function criarCardResultado(item) {
    const statusInfo = configuracaoStatus(item);

    const card = document.createElement("div");
    card.className = "card-resultado";

    card.innerHTML = `
        <h3 class="titulo-opcao-curso">${montarNumeral(item.numeroOpcao)} opção de curso</h3>
    `;

    // Corpo principal do card
    const corpo = document.createElement("div");
    corpo.className = "corpo-card-resultado";
    corpo.innerHTML = `
        <p class="nome-curso-resultado">
            ${item.nomeCurso} <span class="codigo-curso">(${item.codigoCurso})</span>
            — <span class="tipo-bolsa-resultado">${item.tipoBolsa}</span>
        </p>

        <div class="lista-valores-resultado">
            <p>Valor da mensalidade bruta: <strong>${item.valorBruto}</strong></p>
            <p>Valor da mensalidade c/ Desconto: <strong>${item.valorDesconto}</strong></p>
            <p>Valor da mensalidade p/ Prouni: <strong>${item.valorProuni}</strong></p>
        </div>

        <p class="linha-modalidade-resultado">
            <span>${item.grau}</span>
            <span>Turno ${item.turno}</span>
            <span>Modalidade de concorrência: ${item.modalidade}</span>
        </p>
    `;

    // Barra de status
    const barra = document.createElement("div");
    barra.className = `barra-status-resultado ${statusInfo.classe}`;
    barra.innerHTML = `
        <span>Resultado na ${dadosCandidato.chamada.toLowerCase()}: <strong>${statusInfo.rotulo}</strong></span>
        <span>Bolsas disponíveis na Lista de Espera: <strong>${item.bolsasListaEspera}</strong></span>
    `;

    // Caixa com dados da instituição
    const caixaInstituicao = document.createElement("div");
    caixaInstituicao.className = "caixa-instituicao-resultado";
    caixaInstituicao.innerHTML = `
        <p><strong>Instituição:</strong> ${item.instituicao}</p>
        <p><strong>Local de oferta:</strong> ${item.localOferta} — <a href="${item.enderecoLink}">Ver endereço</a></p>
        <p><strong>Município:</strong> ${item.municipio}</p>
        <p><strong>Aluno da instituição:</strong> ${item.alunoInstituicao} | <strong>Aluno deste curso/turno:</strong> ${item.alunoCursoTurno}</p>
    `;

    // Rodapé com critério de classificação
    const rodape = document.createElement("div");
    rodape.className = "rodape-card-resultado";
    rodape.innerHTML = `
        <p>Critério/ordem de classificação:</p>
        <p class="criterio-classificacao">${item.criterio}</p>
    `;

    card.appendChild(corpo);
    card.appendChild(barra);
    card.appendChild(caixaInstituicao);
    card.appendChild(rodape);

    return card;
}

function renderizarResultado() {
    // Cabeçalho do candidato
    document.getElementById("resumo-nome").textContent = dadosCandidato.nome;
    document.getElementById("resumo-inscricao").textContent = dadosCandidato.numeroInscricao;
    document.getElementById("resumo-selo").textContent = dadosCandidato.chamada;

    const lista = document.getElementById("lista-resultados");
    lista.innerHTML = "";

    if (!dadosResultado || dadosResultado.length === 0) {
        lista.innerHTML = `<div class="estado-vazio-resultado">Nenhum resultado disponível para esta chamada ainda.</div>`;
        return;
    }

    dadosResultado.forEach(item => {
        lista.appendChild(criarCardResultado(item));
    });

    // Só libera "Realizar Matrícula" se o candidato foi pré-selecionado em ao menos uma opção
    const foiAprovadoEmAlgumaOpcao = dadosResultado.some(item => item.status === "aprovado");
    const botaoMatricula = document.getElementById("botao-matricula");

    if (!foiAprovadoEmAlgumaOpcao) {
        botaoMatricula.textContent = "Aguardar Próxima Chamada";
        botaoMatricula.removeAttribute("href");
        botaoMatricula.style.opacity = "0.5";
        botaoMatricula.style.pointerEvents = "none";
        botaoMatricula.style.cursor = "default";
    }
}

document.addEventListener("DOMContentLoaded", renderizarResultado);