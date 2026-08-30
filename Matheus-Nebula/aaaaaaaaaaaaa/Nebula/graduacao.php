<?php
/* paginas/graduacao.php - Seção "Minha Graduação" do menu, incluída dentro de portal_aluno.php */
?>
<section class="pagina pagina-interna" data-conteudo="graduacao">

    <div class="cabecalho-pagina">
        <span class="categoria-pagina">ACADÊMICO</span>
        <div class="titulo-linha">
            <h1>Minha Graduação</h1>
            <span></span>
        </div>
        <p>Ciências da Computação - Bacharelado · Noturno</p>
    </div>

    <!-- BOTOES DE NAVEGAÇÃO -->
    <div class="container-botoes-graduacao">
        <button type="button" class="btn-opcao ativo" data-aba="notas">Minhas notas e Semestres</button>
        <button type="button" class="btn-opcao" data-aba="certificados">Certificados</button>
    </div>

    <!-- ABA 1: MINHAS NOTAS E SEMESTRES (Contém cards, botões de semestre e tabelas) -->
    <div class="conteudo-aba ativo" id="aba-notas">

        <div class="grid-cards-estatisticas">
            <div class="card-estatistica card-roxo">
                <span class="subtitulo-estatistica">MÉDIA GLOBAL (CRA)</span>
                <h2 class="valor-estatistica">8.92</h2>
            </div>

            <div class="card-estatistica card-roxo">
                <span class="subtitulo-estatistica">FREQUÊNCIA MÉDIA</span>
                <h2 class="valor-estatistica">96.4%</h2>
            </div>

            <div class="card-estatistica card-roxo">
                <span class="subtitulo-estatistica">CRÉDITOS CONCLUÍDOS</span>
                <h2 class="valor-estatistica">124/240</h2>
            </div>

            <div class="card-estatistica card-verde">
                <span class="subtitulo-estatistica">STATUS DA MATRÍCULA</span>
                <h2 class="valor-estatistica">Regular</h2>
            </div>
        </div>

        <!-- LISTA DE SEMESTRES -->
        <div class="container-semestres">
            <button type="button" class="btn-semestre" data-semestre="1">1° Semestre</button>
            <button type="button" class="btn-semestre" data-semestre="2">2° Semestre</button>
            <button type="button" class="btn-semestre" data-semestre="3">3° Semestre</button>
            <button type="button" class="btn-semestre" data-semestre="4">4° Semestre</button>
            <button type="button" class="btn-semestre ativo" data-semestre="5">5° Semestre</button>
           
            <button type="button" class="btn-semestre bloqueado" data-semestre="6">
                6° Semestre <img src="cadeado.png" alt="Bloqueado" class="img-cadeado">
                <span class="tooltip-bloqueado">Aguarde o próximo semestre!</span>
            </button>
            <button type="button" class="btn-semestre bloqueado" data-semestre="7">
                7° Semestre <img src="cadeado.png" alt="Bloqueado" class="img-cadeado">
                <span class="tooltip-bloqueado">Aguarde o próximo semestre!</span>
            </button>
            <button type="button" class="btn-semestre bloqueado" data-semestre="8">
                8° Semestre <img src="cadeado.png" alt="Bloqueado" class="img-cadeado">
                <span class="tooltip-bloqueado">Aguarde o próximo semestre!</span>
            </button>
        </div>

        <!-- CONTEÚDO EXCLUSIVO DO 5º SEMESTRE -->
        <div class="conteudo-semestre ativo" data-conteudo-semestre="5">
           
            <!-- 1ª BOX: DISCIPLINAS OBRIGATÓRIAS -->
            <div class="box-detalhes-semestre">
                <div class="cabecalho-box-semestre">
                    <h2 class="titulo-semestre-materia">
                        <span class="destaque-rosa">5º Semestre - Mecânica Analítica I</span>
                    </h2>
                    <span class="badge-status-curso">Cursando Atualmente</span>
                </div>

                <div class="container-tabela-disciplinas">
                    <table class="tabela-disciplinas">
                        <thead>
                            <tr>
                                <th class="col-disciplina">DISCIPLINA</th>
                                <th class="col-tipo">TIPO</th>
                                <th class="col-nota">NOTA FINAL</th>
                                <th class="col-frequencia">FREQUÊNCIA</th>
                                <th class="col-situacao">ACOMPANHAMENTO / SITUAÇÃO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Análise, Projeto e Otimização de Algoritmos</td>
                                <td><span class="tag-tipo">Obrigatória</span></td>
                                <td class="status-curso">Em curso</td>
                                <td class="frequencia-destaque">98%</td>
                                <td class="situacao-texto">P1: 8.8 | P2: --</td>
                            </tr>
                            <tr>
                                <td>Engenharia de Software Avançada e Arquitetura de Sistemas</td>
                                <td><span class="tag-tipo">Obrigatória</span></td>
                                <td class="status-curso">Em curso</td>
                                <td class="frequencia-destaque">96%</td>
                                <td class="situacao-texto">P1: 7.9 | P2: --</td>
                            </tr>
                            <tr>
                                <td>Introdução à Construção de Compiladores</td>
                                <td><span class="tag-tipo">Obrigatória</span></td>
                                <td class="status-curso">Em curso</td>
                                <td class="frequencia-destaque">95%</td>
                                <td class="situacao-texto">P1: 8.5 | P2: --</td>
                            </tr>
                            <tr>
                                <td>Sistemas Distribuídos e Computação Paralela</td>
                                <td><span class="tag-tipo">Obrigatória</span></td>
                                <td class="status-curso">Em curso</td>
                                <td class="frequencia-destaque">92%</td>
                                <td class="situacao-texto">P1: 7.2 | P2: --</td>
                            </tr>
                            <tr>
                                <td>Métodos Numéricos e Cálculo Computacional</td>
                                <td><span class="tag-tipo">Obrigatória</span></td>
                                <td class="status-curso">Em curso</td>
                                <td class="frequencia-destaque">100%</td>
                                <td class="situacao-texto">Relatórios: OK</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- 2ª BOX: DISCIPLINAS OPTATIVAS -->
            <div class="box-detalhes-semestre box-optativas">
                <div class="cabecalho-box-semestre cabecalho-optativas">
                    <span class="badge-optativas">OPTATIVAS</span>
                </div>

                <div class="container-tabela-disciplinas">
                    <table class="tabela-disciplinas">
                        <thead>
                            <tr>
                                <th class="col-disciplina">DISCIPLINA</th>
                                <th class="col-tipo">TIPO</th>
                                <th class="col-nota">NOTA FINAL</th>
                                <th class="col-frequencia">FREQUÊNCIA</th>
                                <th class="col-situacao">ACOMPANHAMENTO / SITUAÇÃO</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Física do Interior da Terra e Ondas Sísmicas</td>
                                <td><span class="tag-tipo">Optativa</span></td>
                                <td class="status-curso">Em curso</td>
                                <td class="frequencia-destaque">98%</td>
                                <td class="situacao-texto">P1: 8.8 | P2: --</td>
                            </tr>
                            <tr>
                                <td>Programação Científica Avançada em Python</td>
                                <td><span class="tag-tipo">Optativa</span></td>
                                <td class="status-curso">Em aberta</td>
                                <td class="frequencia-destaque">--</td>
                                <td class="situacao-texto">--</td>
                            </tr>
                            <tr>
                                <td>Termodinâmica de Sistemas Fora do Equilíbrio</td>
                                <td><span class="tag-tipo">Optativa</span></td>
                                <td class="status-curso">Em curso</td>
                                <td class="frequencia-destaque">95%</td>
                                <td class="situacao-texto">P1: 8.5 | P2: --</td>
                            </tr>
                            <tr>
                                <td>Tópicos de Astronomia de Posição</td>
                                <td><span class="tag-tipo">Optativa</span></td>
                                <td class="status-curso">Em aberta</td>
                                <td class="frequencia-destaque">--</td>
                                <td class="situacao-texto">--</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

<!-- ABA 2: CERTIFICADOS -->
<div class="conteudo-aba" id="aba-certificados">

    <div class="container-certificados">
        <h2 class="titulo-certificados">Seus Certificados:</h2>
        <p class="subtitulo-certificados">Aqui estão tanto os seus certificados parciais de competência técnica:</p>

        <div class="grid-cards-certificados">

            <!-- Card 1 -->
            <div class="card-certificado">
                <div class="barra-lateral-card"></div>
                <div class="conteudo-card-cert">
                    <span class="badge-certificacao">Certificação Qualificada</span>
                    <h3 class="titulo-cert">Assistente de Laboratório de Exatas</h3>
                    <p class="descricao-cert">
                        Módulo prático e competência em laboratório validados após a conclusão de Matrizes I, II e III.
                    </p>
                    <hr class="divisor-cert">
                    <div class="rodape-card-cert">
                        <span class="status-cert">Atualizado à 35 dias.</span>
                        <a href="certificados/logo%20UCEN.pdf" download="Certificado_Assistente_Fisica.pdf" class="btn-baixar-pdf">Baixar PDF</a>
                    </div>
                </div>
            </div>

            <!-- Card 2 -->
            <div class="card-certificado">
                <div class="barra-lateral-card"></div>
                <div class="conteudo-card-cert">
                    <span class="badge-certificacao">Certificação Qualificada</span>
                    <h3 class="titulo-cert">Programador Científico Júnior</h3>
                    <p class="descricao-cert">
                        Atribuído pelo cumprimento das matérias de Computação Científica e modelagem aplicada a Bando de Dados.
                    </p>
                    <hr class="divisor-cert">
                    <div class="rodape-card-cert">
                        <span class="status-cert">Atualizado hoje</span>
                        <a href="certificados/logo%20UCEN.pdf" download="Certificado_Programador_Cientifico_Junior.pdf" class="btn-baixar-pdf"> Baixar PDF</a>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</section>
