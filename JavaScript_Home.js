const track = document.getElementById("track");

// duplica apenas UMA vez
track.innerHTML += track.innerHTML;

let x = 0;
const velocidade = 1.4;

function mover(){

    x -= velocidade;

    const larguraOriginal = track.scrollWidth / 2;

    if(-x >= larguraOriginal){
        x = 0;
    }

    track.style.transform = `translate3d(${x}px,0,0)`;

    requestAnimationFrame(mover);

}

mover();


// Sempre que mudar o tamanho da tela,
// reposiciona corretamente.
window.addEventListener("resize",()=>{

    x = 0;

});

// Teste da IA sirius (talvez apagar depois)
const botao = document.getElementById("abrirSirius");

const janela = document.getElementById("janelaSirius");

const fechar = document.getElementById("fecharSirius");

botao.addEventListener("click", ()=>{

    janela.style.display="flex";

});

fechar.addEventListener("click", ()=>{

    janela.style.display="none";

});

// Se clicar fora da janela, fechar o chat do sirius
document.addEventListener("click", (evento) => {

    const clicouNaJanela = janela.contains(evento.target);

    const clicouNoBotao = botao.contains(evento.target);

    if (!clicouNaJanela && !clicouNoBotao) {

        janela.style.display = "none";

    }

});

// Se clicar em "Enviar", o que estiver escrito será enviado no chat
const campoMensagem = document.getElementById("campoMensagem");

const botaoEnviar = document.getElementById("botaoEnviar");

const mensagens = document.querySelector(".mensagens-sirius");

botaoEnviar.addEventListener("click", () => {

    const texto = campoMensagem.value.trim();

    if (texto === "") return;

    const novaMensagem = document.createElement("div");

    novaMensagem.className = "mensagem-usuario";

    novaMensagem.textContent = texto;

    mensagens.appendChild(novaMensagem);

    campoMensagem.value = "";

    mensagens.scrollTop = mensagens.scrollHeight;

});

// Poder enviar com "Enter"
campoMensagem.addEventListener("keydown", (evento) => {

    if (evento.key === "Enter") {

        evento.preventDefault();

        botaoEnviar.click();

    }

});

// Caixa pesquisa..............................................................

  const inputPesquisa = document.getElementById('pesquisa-grande');
  const dropdown = document.getElementById('dropdown-graduacoes');
  const itensLista = dropdown.querySelectorAll('li');
  const mensagemVazia = document.getElementById('mensagem-vazia');

  // Ao focar/clicar na caixa
  inputPesquisa.addEventListener('focus', () => {
    dropdown.classList.add('ativo');
    filtrarCursos(); // Aplica o filtro atual
  });

  // Ao digitar algo
  inputPesquisa.addEventListener('input', filtrarCursos);

  function filtrarCursos() {
    const texto = inputPesquisa.value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    // Se o campo estiver VAZIO: esconde todos os cursos e a mensagem
    if (texto === "") {
      itensLista.forEach(item => item.style.display = "none");
      mensagemVazia.style.display = "none";
      return;
    }

    // Se houver texto digitado: busca os cursos correspondentes
    let visiveis = 0;
    itensLista.forEach(item => {
      const itemTexto = item.textContent.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      if (itemTexto.includes(texto)) {
        item.style.display = "block";
        visiveis++;
      } else {
        item.style.display = "none";
      }
    });

    // Se digitou algo mas não encontrou nada da lista
    mensagemVazia.style.display = (visiveis === 0) ? "block" : "none";
  }

  // Ao clicar ele redireciona ao curso desejado
itensLista.forEach(item => {
  item.addEventListener('click', () => {
    const urlDestino = item.getAttribute('data-url');
    if (urlDestino) {
      window.location.href = urlDestino; // Leva o usuário para a página correspondente
    }
  });
});

  // Esconde a caixa ao clicar fora
  document.addEventListener('click', (e) => {
    if (!inputPesquisa.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('ativo');
    }
  });


//..............................................................................
// ===============================================
// Flip dos cards de Networking
// ===============================================

// Seleciona todos os cards da seção
const cardsNetworking = document.querySelectorAll(".card-networking");

// Percorre cada card
cardsNetworking.forEach(card => {

    // Quando clicar em um card
    card.addEventListener("click", (event) => {

        // Se o clique foi no link (LinkedIn ou Instagram),
        // não interfere. O navegador abre o link normalmente.
        if (event.target.closest(".link-rede")) {

        // Impede que o clique chegue ao document
        event.stopPropagation();

        // Deixa o navegador abrir o link normalmente
            return;
    }

        // Impede que o clique continue até o document,
        // evitando que o card seja fechado imediatamente.
        event.stopPropagation();

        // Se este card já está aberto,
        // não faz absolutamente nada.
        if (card.classList.contains("ativo")) {
            return;
        }

        // Fecha todos os cards
        cardsNetworking.forEach(c => c.classList.remove("ativo"));

        // Abre apenas o card clicado
        card.classList.add("ativo"); 

    });

});

// Quando clicar em qualquer lugar da página
document.addEventListener("click", () => {

    // Fecha todos os cards
    cardsNetworking.forEach(card => {
        card.classList.remove("ativo");
    });

});

// Animação ScrollReveal
const sr = ScrollReveal({
    distance: '60px',
    duration: 900,
    delay: 100,
    easing: 'ease-out',
    reset: true,
    cleanup: true, // Faz que quando a animação termina, não influencie em animações como o hover
    mobile: false // MELHOR sem animação no Responsivo
                  // Daria para usar "if (window.innerWidth > 768)" se quiser ter mais controle por tamanho de tela, então veremos
});
sr.reveal('.universo-content', {
    origin: 'bottom'
});

sr.reveal('.titulo-principal', {
    origin: 'left'
});

sr.reveal('.espaciais', {
    origin: 'bottom'
});

sr.reveal('.engenharias', {
    origin: 'left'
});

sr.reveal('.exatas', {
    origin: 'right'
});

sr.reveal('.titulo-modalidades-container', {
    origin: 'top'
});

sr.reveal('.card-reveal-wrapper', {
    origin: 'bottom',
    interval: 100 // Faz os cards aparecerem em "cascata", um por um
});

/*  sr.reveal('.card-modalidade', {
    origin: 'bottom'
});  */

sr.reveal('.titulo-vestibular-container', {
    origin: 'left'
});

sr.reveal('.caixa-vestibular', {
    origin: 'right'
});

sr.reveal('.conteudo-mec', {
    origin: 'left'
});

sr.reveal('.cards-networking', {
    origin: 'bottom'
});

sr.reveal('.titulo-parcerias', {
    origin: 'top'
});

sr.reveal('.linha-parcerias', {
    origin: 'left',
    delay: 200
});

sr.reveal('.marquee', {
    origin: 'bottom'
});

sr.reveal('.block-left', {
    origin: 'left'
});

sr.reveal('.block-right', {
    origin: 'right'
});

sr.reveal('.block-center', {
    origin: 'left'
});

/* Caso queiramos deixar mais controlavel a questão de pixels pro mobile sem depender do (mobile: false) da biblioteca
if (window.innerWidth > 768) {

    const sr = ScrollReveal({
        distance: '60px',
        duration: 900,
        delay: 100,
        easing: 'ease-out',
        reset: true
    });

    sr.reveal('.universo-content', {
        origin: 'bottom'
    });

    sr.reveal('.titulo-principal', {
        origin: 'left'
    });

    sr.reveal('.espaciais', {
        origin: 'bottom'
    });

    sr.reveal('.engenharias', {
        origin: 'left'
    });

    sr.reveal('.exatas', {
        origin: 'right'
    });

    sr.reveal('.titulo-modalidades-container', {
        origin: 'top'
    });

    sr.reveal('.card-modalidade', {
        origin: 'bottom',
        interval: 200
    });

    sr.reveal('.titulo-vestibular-container', {
        origin: 'left'
    });

    sr.reveal('.caixa-vestibular', {
        origin: 'right'
    });

    sr.reveal('.conteudo-mec', {
        origin: 'left'
    });

    sr.reveal('.cards-networking', {
        origin: 'bottom'
    });

    sr.reveal('.container-parcerias', {
        origin: 'top'
    });

    sr.reveal('.marquee', {
        origin: 'bottom'
    });

} */

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
    inputHeader.focus();

     // Aguarda 50ms para a animação do overlay/CSS acontecer e foca direto no input
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


// ==========================================================
// PESQUISA DA HERO (A DO MEIO DA TELA)
// ==========================================================

function filtrarHero(){

    const texto = inputPesquisa.value
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g,"");

    if(texto === ""){

        itensLista.forEach(item => {

            item.style.display = "none";

        });

        mensagemVazia.style.display = "none";

        return;

    }

    let encontrados = 0;

    itensLista.forEach(item => {

        const nome = item.textContent
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g,"");

        if(nome.includes(texto)){

            item.style.display = "block";
            encontrados++;

        }else{

            item.style.display = "none";

        }

    });

    mensagemVazia.style.display =
        encontrados === 0 ? "block" : "none";

}


// ==========================================================
// PESQUISA DO CABEÇALHO
// ==========================================================

function filtrarHeader(){

    const texto = inputHeader.value
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g,"");

    // Campo vazio
    if(texto === ""){

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

        const nome = item.textContent
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g,"");

        if(nome.includes(texto)){

            item.style.display = "block";
            encontrados++;

        }else{

            item.style.display = "none";

        }

    });

    // Mostra a mensagem quando não houver resultados
    mensagemHeader.style.display = encontrados === 0 ? "block" : "none";

}


// ==========================================================
// Eventos
// ==========================================================

inputPesquisa.addEventListener("input", filtrarHero);

inputHeader.addEventListener("input", filtrarHeader);

// ===============================================
// Clique nos cursos do cabeçalho
// ===============================================

listaHeader.forEach(item => {

    item.addEventListener("click", () => {

        const urlDestino = item.getAttribute("data-url");

        if (urlDestino) {

            window.location.href = urlDestino;

        }

    });

});