<?php
/* paginas/pastas.php - Seção "Arquivos" do menu, incluída dentro de portal_aluno.php */
?>
<section class="pagina pagina-interna" data-conteudo="pastas">

    <div class="cabecalho-pagina">

        <span class="categoria-pagina">ACADÊMICO</span>

        <div class="titulo-linha">
            <h1>Arquivos</h1>
            <span></span>
        </div>

        <p>Entre nos últimos materiais adicionados!</p>

    </div>

    <!-- CAIXA DOS ARQUIVOS -->
    <div class="materiais-box">

        <div class="materiais-topo">

            <h3>Ciência da Computação</h3>

            <button id="ordenar-btn" class="btn-ordenar">
                <span id="texto-ordem" class="ascendente">Ascendente</span>
                <i class="fa-solid fa-chevron-down" id="chevron"></i>
            </button>

        </div>

        <div class="cabecalho-arquivos">
            <span>Arquivo</span>
            <span>Modificado</span>
            <span>Professor</span>
        </div>

        <div id="lista-arquivos" class="lista-arquivos">
            <!-- JavaScript gera as linhas aqui -->
        </div>

    </div>

</section>
