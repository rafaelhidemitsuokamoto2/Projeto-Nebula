// ==========================================================
// HISTÓRICO DE PESQUISA
// Cole este bloco no final do seu JavaScript_Home.js
// (ele usa os elementos que você já tem: inputPesquisa,
// dropdown, inputHeader, resultadoPesquisa, etc.)
// ==========================================================

// Busca o histórico do usuário logado no servidor
async function carregarHistorico() {

    try {

        const resposta = await fetch("listar_historico.php");
        return await resposta.json();

    } catch (erro) {

        console.error("Erro ao carregar histórico:", erro);
        return [];

    }

}

// Manda apagar um item específico (chamado pelo clique no X)
async function apagarHistorico(idHistorico) {

    try {

        await fetch("apagar_historico.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "id_historico=" + encodeURIComponent(idHistorico)
        });

    } catch (erro) {

        console.error("Erro ao apagar item do histórico:", erro);

    }

}

// Salva um termo pesquisado (chame isso quando o usuário clicar
// em um curso da lista, ou apertar Enter na pesquisa)
async function salvarNoHistorico(termo) {

    if (!termo) return;

    try {

        await fetch("salvar_historico.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: "termo=" + encodeURIComponent(termo)
        });

    } catch (erro) {

        console.error("Erro ao salvar histórico:", erro);

    }

}

// Desenha a lista de histórico dentro de um <ul>/<div> qualquer.
// containerLista: o elemento onde os itens vão entrar (ex: dropdown ou resultado-pesquisa)
// aoSelecionar: função chamada quando o usuário clica no termo (não no X)
async function exibirHistorico(containerLista, aoSelecionar) {

    const historico = await carregarHistorico();

    containerLista.innerHTML = "";

    if (historico.length === 0) {
        return;
    }

    historico.forEach(item => {

        const linha = document.createElement("div");
        linha.className = "item-historico";

        linha.innerHTML = `
            <span class="icone-relogio"><i class="fa-regular fa-clock"></i></span>
            <span class="texto-historico"></span>
            <span class="botao-apagar-historico"><i class="fa-solid fa-xmark"></i></span>
        `;

        // textContent em vez de inserir direto no innerHTML acima,
        // pra não correr risco de HTML estranho vindo do termo salvo
        linha.querySelector(".texto-historico").textContent = item.termo_pesquisado;

        linha.addEventListener("click", () => {
            aoSelecionar(item.termo_pesquisado);
        });

        const botaoApagar = linha.querySelector(".botao-apagar-historico");

        botaoApagar.addEventListener("click", async (evento) => {

            evento.stopPropagation(); // não deixa o clique "vazar" pro item e disparar a pesquisa

            await apagarHistorico(item.id_historico);

            linha.remove();

        });

        containerLista.appendChild(linha);

    });

}


// ==========================================================
// ONDE ENCAIXAR NO SEU CÓDIGO JÁ EXISTENTE
// ==========================================================

// --- 1) Caixa de pesquisa grande (hero) ---
// No listener que você já tem:
//
//   inputPesquisa.addEventListener('focus', () => {
//       dropdown.classList.add('ativo');
//       filtrarCursos();
//   });
//
// troque para:
//
//   inputPesquisa.addEventListener('focus', () => {
//       dropdown.classList.add('ativo');
//
//       if (inputPesquisa.value.trim() === "") {
//           exibirHistorico(dropdown.querySelector('#lista-graduacoes') ?? dropdown, (termo) => {
//               inputPesquisa.value = termo;
//               filtrarCursos();
//           });
//       } else {
//           filtrarCursos();
//       }
//   });
//
// E dentro da função filtrarCursos(), no trecho:
//
//   if (texto === "") {
//       itensLista.forEach(item => item.style.display = "none");
//       mensagemVazia.style.display = "none";
//       return;
//   }
//
// troque o corpo do "if" pra chamar o histórico também, assim quando
// o usuário apaga tudo que digitou, o histórico volta a aparecer:
//
//   if (texto === "") {
//       itensLista.forEach(item => item.style.display = "none");
//       mensagemVazia.style.display = "none";
//       exibirHistorico(dropdown.querySelector('#lista-graduacoes') ?? dropdown, (termo) => {
//           inputPesquisa.value = termo;
//           filtrarCursos();
//       });
//       return;
//   }

// --- 2) Salvar no histórico quando o usuário escolhe um curso ---
// No seu bloco:
//
//   itensLista.forEach(item => {
//     item.addEventListener('click', () => {
//       const urlDestino = item.getAttribute('data-url');
//       if (urlDestino) {
//         window.location.href = urlDestino;
//       }
//     });
//   });
//
// acrescente a linha de salvar ANTES do redirecionamento:
//
//   itensLista.forEach(item => {
//     item.addEventListener('click', () => {
//       const urlDestino = item.getAttribute('data-url');
//       salvarNoHistorico(item.textContent.trim());
//       if (urlDestino) {
//         window.location.href = urlDestino;
//       }
//     });
//   });
//
// Faça o mesmo no forEach do listaHeader (caixa do cabeçalho).

// --- 3) Caixa de pesquisa do cabeçalho ---
// A lógica é igual: quando o overlay abrir (ou quando o campo ficar vazio
// dentro de filtrarHeader), chame:
//
//   exibirHistorico(resultadoPesquisa.querySelector('#lista-header') ?? resultadoPesquisa, (termo) => {
//       inputHeader.value = termo;
//       filtrarHeader();
//   });
//
// e lembre de trocar "resultadoPesquisa.style.display" pra "block" antes,
// senão o histórico fica escondido atrás do CSS que esconde a lista vazia.

// --- 4) CSS ---
// Cole o conteúdo de historico.css no final do seu CSS_Home.css
// (ou dê um <link rel="stylesheet" href="historico.css"> no <head>
// do home.php, junto dos outros links).
