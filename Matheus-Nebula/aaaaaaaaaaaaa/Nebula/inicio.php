<?php
/* paginas/inicio.php - Seção "Início" do menu, incluída dentro de portal_aluno.php */
?>
<section class="pagina pagina-inicio">

    <div class="conteudo-inicio">

        <!-- Card Próxima Aula -->
        <div class="card-proxima-aula">
            <span class="subtitulo-card">PRÓXIMA AULA</span>
            <h2 class="titulo-materia">Banco de Dados</h2>
            <p class="horario-aula">Hoje, 19h às 22h - Sala: 25</p>

            <div class="botao-vestibular">
                <button type="button" id="btnVerAgenda" class="btn-inscricao">
                    Ver Agenda
                </button>
            </div>
        </div>

        <!-- Card Próximas Avaliações -->
        <div class="card-avaliacoes">
            <div class="cabecalho-avaliacoes">
                <div>
                    <span class="subtitulo-card">ACOMPANHE</span>
                    <h2 class="titulo-avaliacoes">Próximas Avaliações</h2>
                </div>
                <button type="button" id="btnVerTodasAvaliações" class="btn-link-calendario">
                    Ver mais
                </button>
            </div>

            <hr class="divisor-card">

            <div class="lista-avaliacoes">
                <!-- Item 1 -->
                <div class="item-avaliacao">
                    <div class="data-badge">
                        <span class="dia">11</span>
                        <span class="mes">NOV</span>
                    </div>
                    <div class="info-materia">
                        <h3>PHP com MySql</h3>
                        <p>19:00 - Sala: 25</p>
                    </div>
                </div>

                <hr class="divisor-item">

                <!-- Item 2 -->
                <div class="item-avaliacao">
                    <div class="data-badge">
                        <span class="dia">25</span>
                        <span class="mes">NOV</span>
                    </div>
                    <div class="info-materia">
                        <h3>Arquitetura WEb</h3>
                        <p>20:30 - Sala: 25</p>
                    </div>
                </div>

                <hr class="divisor-item">

                <!-- Item 3 -->
                <div class="item-avaliacao">
                    <div class="data-badge">
                        <span class="dia">03</span>
                        <span class="mes">DEZ</span>
                    </div>
                    <div class="info-materia">
                        <h3>MongoDB</h3>
                        <p>19:00 - Sala: 25</p>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- Rodapé do Portal -->
<footer id="contato">

    <div class="footer-superior">
        <!-- Esquerda -->
        <div class="footer-esquerda">
            <img src="logo-ucen.png" alt="Logo">
            <h3 class="texto-footer">
                Campus central: Avenida das Estrelas, nº 372,<br>
                Jardim Primavera, Cidade Altas Flores/SP - CEP 14797-000
            </h3>
        </div>

        <!-- Direita -->
        <div class="footer-direita">
            <h3 class="titulo-footer">
                Suporte ao aluno
            </h3>
            <h3 class="texto-footer">
                E-mail: suporte.ftan@gmail.com<br>
                Telefone: 4006-8947<br>
                WhatsApp: (11) 94562-2899<br>
                Horário: Seg à Sex das 08h às 22:30h
            </h3>
        </div>
    </div>

    <div class="footer-inferior">
        <h3 class="copyright">
            © 2026 Universidade de Ciências e Exatas Nebula<br>
            Todos os direitos reservados.
        </h3>
    </div>

</footer>

</section>
