<?php
/* paginas/calendario.php - Seção "Calendário de Provas (inclui o modal de visão anual)" do menu, incluída dentro de portal_aluno.php */
?>
<section class="pagina pagina-interna" data-conteudo="calendario">

    <div class="cabecalho-pagina">

        <span class="categoria-pagina">PLANEJAMENTO</span>

        <div class="titulo-linha">
            <h1>Calendário de Provas</h1>
            <span></span>
        </div>

        <p>Seu horário, avaliações e compromissos acadêmicos.</p>

    </div>

    <div class="container-calendario-secao">

        <!-- CALENDÁRIO -->
        <div class="box-calendario">

            <div class="topo-calendario">
                <button class="btn-nav-cal" id="btn-prev">&lt;</button>

                <h2 id="mes-ano-titulo">Novembro de 2026</h2>

                <button class="btn-nav-cal" id="btn-next">&gt;</button>
            </div>

            <div class="dias-semana-cal">
                <span>Dom.</span>
                <span>Seg.</span>
                <span>Ter.</span>
                <span>Qua.</span>
                <span>Qui.</span>
                <span>Sex.</span>
                <span>Sáb.</span>
            </div>

            <div class="grade-dias-cal" id="grade-dias">
                <!-- JS -->
            </div>

        </div>

        <!-- EVENTOS -->
        <div class="box-eventos">

            <div class="lista-eventos-cal" id="lista-eventos">
                <!-- JS -->
            </div>

        </div>

    </div>

</section>

<div id="modal-visao-anual" class="modal-overlay-anual">

    <div class="modal-container-anual">

        <div class="header-modal-anual">

            <h2 id="titulo-ano-modal">Ano de 2026</h2>

            <button
                class="btn-fechar-modal"
                id="fechar-modal-anual"
                aria-label="Fechar">

                <i class="fa-solid fa-xmark"></i>

            </button>

        </div>

        <div class="grid-meses-ano" id="grid-meses-ano">
            <!-- JavaScript gera os 12 meses -->
        </div>

    </div>

</div>
