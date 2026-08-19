// Data da prova (26/11/2026 às 12:00 - Horário de Brasília)
const dataProva = new Date("2026-11-26T12:00:00-03:00");

const contador = document.getElementById("contador");

function atualizarContador() {

    const agora = new Date();

    const diferenca = dataProva - agora;

    if (diferenca <= 0) {
        contador.textContent = "A prova começou!";
        return;
    }

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));

    const horas = Math.floor(
        (diferenca % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutos = Math.floor(
        (diferenca % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const segundos = Math.floor(
        (diferenca % (1000 * 60))
        / 1000
    );

    contador.innerHTML = `
    <span class="texto-contador">Faltam </span>
    <span class="numero-contador">
        ${dias} dias, ${horas}h ${minutos}min ${segundos}s
    </span>
    <span class="texto-contador"> para o exame.</span>
`;
// teste luzinha
if (segundos % 20 === 0) {

    const numero = document.querySelector(".numero-contador");

    numero.classList.remove("flash");

    void numero.offsetWidth;

    numero.classList.add("flash");

}

}

atualizarContador();

setInterval(atualizarContador, 1000);