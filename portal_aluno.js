// Pulsação do rolar (Role para baixo)
const rolar = document.querySelector(".rolar");

let escala = 1;
let crescendo = true;
let pulsos = 0;
let pausando = false;

function pulsar() {

    if (pausando) {
        return;
    }

    if (crescendo) {
        escala += 0.01;

        if (escala >= 1.08) {
            crescendo = false;
        }

    } else {
        escala -= 0.01;

        if (escala <= 1) {
            crescendo = true;
            pulsos++;

            // Depois de 2 pulsadas, faz uma pausa
            if (pulsos === 2) {
                pausando = true;

                setTimeout(() => {
                    pulsos = 0;
                    pausando = false;
                }, 500);
            }
        }
    }

    rolar.style.transform = `scale(${escala})`;
}

setInterval(pulsar, 30);

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

// Fechar ao clicar fora do Menu
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

const areaConteudo = document.getElementById("areaConteudo");


itensMenu.forEach(function (item) {

    item.addEventListener("click", function () {

        const pagina = item.dataset.pagina;

        abrirPagina(pagina);

    });

});


// ==========================================
// TROCAR CONTEÚDO
// ==========================================

function abrirPagina(pagina) {


    if (pagina === "inicio") {

        areaConteudo.innerHTML = `

            <section class="pagina pagina-inicio">

                <div class="conteudo-inicio">

                    <div class="titulo-inicio">

                        <span class="titulo-um">
                            SEXTA-FEIRA, 08 DE AGOSTO DE 2026
                        </span>

                        <span class="titulo-dois">
                            Olá, Matheus!
                        </span>

                        <span class="titulo-tres">
                            Acompanhe os principais assuntos de hoje!
                        </span>

                    </div>

                </div>

            </section>

        `;

    }


    else if (pagina === "graduacao") {

        areaConteudo.innerHTML = `

            <section class="pagina">

                <h1>Minha Graduação</h1>

                <p>
                    Informações sobre sua graduação aparecerão aqui.
                </p>

            </section>

        `;

    }


    else if (pagina === "pastas") {

        areaConteudo.innerHTML = `

            <section class="pagina">

                <h1>Pastas</h1>

                <p>
                    Suas pastas e materiais aparecerão aqui.
                </p>

            </section>

        `;

    }


    else if (pagina === "agenda") {

        areaConteudo.innerHTML = `

            <section class="pagina">

                <h1>Agenda</h1>

                <p>
                    Sua agenda aparecerá aqui.
                </p>

            </section>

        `;

    }


    else if (pagina === "calendario") {

        areaConteudo.innerHTML = `

            <section class="pagina">

                <h1>Calendário de provas</h1>

                <p>
                    Suas provas aparecerão aqui.
                </p>

            </section>

        `;

    }


    else if (pagina === "documentos") {

        areaConteudo.innerHTML = `

            <section class="pagina">

                <h1>Documentos</h1>

                <p>
                    Seus documentos aparecerão aqui.
                </p>

            </section>

        `;

    }


    else if (pagina === "financeiro") {

        areaConteudo.innerHTML = `

            <section class="pagina">

                <h1>Financeiro</h1>

                <p>
                    Informações financeiras aparecerão aqui.
                </p>

            </section>

        `;

    }


    else if (pagina === "eventos") {

        areaConteudo.innerHTML = `

            <section class="pagina">

                <h1>Eventos</h1>

                <p>
                    Os eventos aparecerão aqui.
                </p>

            </section>

        `;

    }


    else if (pagina === "avisos") {

        areaConteudo.innerHTML = `

            <section class="pagina">

                <h1>Avisos</h1>

                <p>
                    Seus avisos aparecerão aqui.
                </p>

            </section>

        `;

    }


    else if (pagina === "perfil") {

        areaConteudo.innerHTML = `

            <section class="pagina">

                <h1>Meu perfil</h1>

                <p>
                    As informações do seu perfil aparecerão aqui.
                </p>

            </section>

        `;

    }

}