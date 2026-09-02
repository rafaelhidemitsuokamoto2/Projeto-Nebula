<?php
/* paginas/documentos.php - Seção "Documentos" do menu, incluída dentro de portal_aluno.php */
?>
<section class="pagina pagina-interna" data-conteudo="documentos">

    <div class="cabecalho-pagina">

        <span class="categoria-pagina">
            SECRETARIA
        </span>

        <div class="titulo-linha">
            <h1>Documentos</h1>
            <span></span>
        </div>

        <p>
            Envie solicitações e veja seus documentos de forma online.
        </p>

    </div>

    <!-- BOTÕES -->
    <div class="container-botoes-graduacao">
        <button type="button" class="btn-opcao-documentos ativo" data-doc="documentos">
            Documentos
        </button>

        <button type="button" class="btn-opcao-documentos" data-doc="requisicoes">
            Requisições
        </button>
    </div>

<!-- ABA DOCUMENTOS -->
<div class="conteudo-documento ativo" id="doc-documentos">

    <div class="container-documentos">

        <h2 class="titulo-documentos">
            Seus documentos oficiais
        </h2>

        <p class="subtitulo-documentos">
            Aqui estão seus documentos acadêmicos solicitados da secretaria:
        </p>

        <div class="grid-cards-documentos">

            <!-- Documento 1 -->
            <div class="card-documento">

                <div class="barra-lateral-documento"></div>

                <div class="conteudo-card-documento">

                    <span class="badge-secretaria">
                        Secretaria
                    </span>

                    <h3 class="titulo-documento">
                        Declaração de Matrícula Ativa
                    </h3>

                    <p class="descricao-documento">
                        Comprovante oficial com assinatura digital atestando que você possui vínculo regular e ativo no 5º semestre de Ciências da Computação.
                    </p>

                    <hr class="divisor-documento">

                    <div class="rodape-documento">

                        <span class="status-documento">
                            Válido por 90 dias
                        </span>

                        <a href="documentos/historico_certificado.pdf.pdf"
                           download
                           class="btn-baixar-documento">
                            Baixar PDF
                        </a>

                    </div>
                </div>
            </div>

            <!-- Documento 2 -->
            <div class="card-documento">

                <div class="barra-lateral-documento"></div>

                <div class="conteudo-card-documento">

                    <span class="badge-secretaria">
                        Secretaria
                    </span>

                    <h3 class="titulo-documento">
                        Histórico Escolar
                    </h3>

                    <p class="descricao-documento">
                        Documento consolidado contendo todas as notas, frequência e créditos validados do 1º ao 4º semestre.
                    </p>

                    <hr class="divisor-documento">

                    <div class="rodape-documento">

                        <span class="status-documento">
                            Atualizado hoje
                        </span>

                        <a href="documentos/historico_certificado.pdf.pdf"
                           download
                           class="btn-baixar-documento">
                            Baixar PDF
                        </a>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- ABA REQUISIÇÕES -->
<div class="conteudo-documento" id="doc-requisicoes">

    <div class="container-requisicoes">

        <h2 class="titulo-documentos">
            Envie seu requerimento
        </h2>

        <p class="subtitulo-documentos">
            Envie um requerimento ao e-mail de suporte da Nebula!
        </p>

        <form class="form-requisicoes">

            <label for="reqNome">Nome:</label>
            <input type="text" id="reqNome" placeholder="Digite seu nome aqui!" autocomplete="on">

            <label for="reqEmail">E-mail:</label>
            <input type="email" id="reqEmail" placeholder="Digite seu E-mail aqui!" autocomplete="on">

            <label for="reqAssunto">Assunto:</label>
            <textarea id="reqAssunto" maxlength="10000" placeholder="Descreva sua solicitação..."></textarea>

            <div class="rodape-requisicoes">

                <p class="contador-documento">
                    Até <span id="restantesReq">10.000</span> caracteres.
                    <span id="limiteReq">Limite de caracteres atingido.</span>
                </p>

                <button type="submit" class="btn-enviar-requisicao">
                    Enviar
                </button>

            </div>
        </form>
    </div>
</div>
</section>
