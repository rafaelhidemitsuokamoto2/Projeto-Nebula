<?php
/* paginas/agenda.php - Seção "Agenda" do menu, incluída dentro de portal_aluno.php */
?>
<section class="pagina pagina-interna" data-conteudo="agenda">

    <div class="cabecalho-pagina">

        <span class="categoria-pagina">
            PLANEJAMENTO
        </span>

        <div class="titulo-linha">
            <h1>Agenda</h1>
            <span></span>
        </div>

        <p>
            Seu horário, avaliações e compromissos acadêmicos.
        </p>

    </div>

    <!-- SEMANA -->
    <div class="semana-agenda">
        23 - 27 de novembro de 2026
    </div>

    <!-- AGENDA -->
    <div class="agenda-semanal">

        <!-- Horários -->
        <div class="coluna-horas">

            <div class="topo-vazio"></div>

            <div class="hora">19h</div>
            <div class="hora">20h</div>
            <div class="hora">21h</div>
            <div class="hora">22h</div>

        </div>

        <!-- SEGUNDA -->
        <div class="dia-agenda">

            <div class="cabecalho-dia">
                <div class="badge-dia">
                    <span>Seg.</span>
                    <strong>23</strong>
                </div>
            </div>

            <div class="aula linha19">
                <h4>Banco de dados</h4>
                <p>19:00 - 20:30</p>
                <span>Sala 25</span>
                <div class="cor-aula vermelho"></div>
            </div>

            <div class="aula linha21">
                <h4>PHP com MySQL</h4>
                <p>21:00 - 22:00</p>
                <span>Sala 25</span>
                <div class="cor-aula verde"></div>
            </div>

        </div>

        <!-- TERÇA -->
        <div class="dia-agenda">

            <div class="cabecalho-dia">
                <div class="badge-dia">
                    <span>Ter.</span>
                    <strong>24</strong>
                </div>
            </div>

            <div class="aula linha19">
                <h4>Banco de dados</h4>
                <p>19:00 - 20:30</p>
                <span>Sala 25</span>
                <div class="cor-aula branco"></div>
            </div>

        </div>

        <!-- QUARTA -->
        <div class="dia-agenda">

            <div class="cabecalho-dia">
                <div class="badge-dia">
                    <span>Quar.</span>
                    <strong>25</strong>
                </div>
            </div>

            <div class="aula linha19">
                <h4>Banco de dados</h4>
                <p>19:00 - 20:00</p>
                <span>Sala 25</span>
                <div class="cor-aula branco"></div>
            </div>

            <div class="aula linha20">
                <h4>GIT e GITHUB</h4>
                <p>20:30 - 21:30</p>
                <span>Sala 25</span>
                <div class="cor-aula branco"></div>
            </div>

            <div class="aula linha22">
                <h4>PHP com MySQL</h4>
                <p>21:30 - 22:00</p>
                <span>Sala 25</span>
                <div class="cor-aula branco"></div>
            </div>

        </div>

        <!-- QUINTA -->
        <div class="dia-agenda">

            <div class="cabecalho-dia">
                <div class="badge-dia">
                    <span>Quin.</span>
                    <strong>26</strong>
                </div>
            </div>

            <div class="aula linha19">
                <h4>PHP com MySQL</h4>
                <p>19:00 - 20:00</p>
                <span>Sala 25</span>
                <div class="cor-aula branco"></div>
            </div>

            <div class="aula linha22">
                <h4>Engenharia de Software</h4>
                <p>20:30 - 22:00</p>
                <span>Sala 25</span>
                <div class="cor-aula branco"></div>
            </div>

        </div>

        <!-- SEXTA -->
        <div class="dia-agenda">

            <div class="cabecalho-dia">
                <div class="badge-dia">
                    <span>Sex.</span>
                    <strong>27</strong>
                </div>
            </div>

            <div class="aula linha19">
                <h4>Banco de dados</h4>
                <p>19:00 - 20:30</p>
                <span>Sala 25</span>
                <div class="cor-aula azul"></div>
            </div>

            <div class="aula linha21">
                <h4>GIT e GITHUB</h4>
                <p>21:00 - 21:30</p>
                <span>Sala 25</span>
                <div class="cor-aula branco"></div>
            </div>

            <div class="aula linha22">
                <h4>Engenharia Software</h4>
                <p>21:30 - 22:00</p>
                <span>Sala 25</span>
                <div class="cor-aula branco"></div>
            </div>

        </div>

    </div>

    <!-- LEGENDA DA AGENDA -->
<div class="legenda-agenda">

    <h3>Níveis de importância:</h3>

    <div class="grid-legenda">

        <!-- Item 1 -->
        <div class="item-legenda">
            <div class="cabecalho-item">
                <span class="quadradinho azul-legenda"></span>
                <strong>Peso alto</strong>
            </div>
            <p>Provas finais e trabalhos grandes que valem metade ou mais da média.</p>
        </div>

        <!-- Item 2 -->
        <div class="item-legenda">
            <div class="cabecalho-item">
                <span class="quadradinho vermelho-legenda"></span>
                <strong>Peso médio</strong>
            </div>
            <p>Provas parciais e listas longas de exercícios do meio do semestre.</p>
        </div>

        <!-- Item 3 -->
        <div class="item-legenda">
            <div class="cabecalho-item">
                <span class="quadradinho verde-legenda"></span>
                <strong>Peso baixo</strong>
            </div>
            <p>tarefas menores, presença ou testes rápidos de leitura.</p>
        </div>

        <!-- Item 4 -->
        <div class="item-legenda">
            <div class="cabecalho-item">
                <span class="quadradinho branco-legenda"></span>
                <strong>Peso zero</strong>
            </div>
            <p>Atividades bônus ou opcionais que ajudam a subir pontos extras.</p>
        </div>
    </div>
</div>
</section>
