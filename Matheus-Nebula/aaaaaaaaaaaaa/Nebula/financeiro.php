<?php
/* paginas/financeiro.php - Seção "Financeiro" do menu, incluída dentro de portal_aluno.php */
?>
<section class="pagina pagina-interna" data-conteudo="financeiro">

    <div class="cabecalho-pagina">

        <span class="categoria-pagina">
            FINANCEIRO
        </span>

        <div class="titulo-linha">

            <h1>
                Financeiro
            </h1>
        </div>

        <p>
            Acompanhe suas mensalidades, faturas pendentes e histórico de pagamentos.
        </p>
    </div>

    <!-- BOX DE SALDO EM ABERTO -->
    <div class="card-saldo-financeiro">
        <div class="info-saldo">
            <span class="subtitulo-saldo">SALDO EM ABERTO</span>
            <h2 class="valor-saldo">R$ 1.200,00</h2>
            <p class="vencimento-saldo">Próximo vencimento: 10/09/2026</p>
        </div>
        <button type="button" id="btnPagarMensalidade" class="btn-pagar-mensalidade">
            Pagar mensalidade
        </button>
    </div>

    <!-- MODAL PAGAMENTO VIA PIX (ADICIONAR AQUI) -->
    <div id="modalPix" class="modal-pix-overlay">
        <div class="modal-pix-conteudo">
            <button type="button" class="btn-fechar-modal" id="btnFecharPix">&times;</button>
           
            <h2 class="titulo-modal-pix">Pagamento via Pix</h2>
            <p class="subtitulo-modal-pix">Mensalidade Setembro/2026 - R$ 1.200,00</p>
           
            <!-- Área do QR Code -->
            <div class="container-qrcode">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=00020126580014br.gov.bcb.pix0136a62c-8822-4416-831e-univ-portal-2026" alt="QR Code Pix" class="img-qrcode">
            </div>
           
            <p class="instrucao-pix">
                Escaneie o QR Code acima com o app do seu banco<br>ou copie o código Pix abaixo:
            </p>
           
            <div class="caixa-codigo-pix">
                <input type="text" id="chavePixInput" value="00020126580014br.gov.bcb.pix0136a62c-8822-4416-831e-univ-portal-2026" readonly>
            </div>
           
            <button type="button" id="btnCopiarPix" class="btn-copiar-pix">
                Copiar chave pix
            </button>
        </div>
    </div>

    <!-- HISTÓRICO DE MENSALIDADES -->
<div class="container-historico-mensalidades">
    <h2 class="titulo-historico">Histórico de Mensalidades:</h2>

    <!-- Item 1: Em Aberto -->
    <div class="card-historico em-aberto">
        <div class="barra-status"></div>
        <div class="conteudo-historico">
            <div class="coluna-historico">
                <span class="label-historico">REFERÊNCIA</span>
                <strong class="valor-coluna">Novembro 2026</strong>
            </div>

            <div class="coluna-historico">
                <span class="label-historico">VENCIMENTO</span>
                <strong class="valor-coluna">20/11/2026</strong>
            </div>

            <div class="coluna-historico">
                <span class="label-historico">VALOR</span>
                <strong class="valor-coluna">R$ 1.200,00</strong>
            </div>

            <div class="coluna-historico">
                <span class="label-historico">STATUS</span>
                <span class="badge-status em-aberto">Em aberto</span>
            </div>

            <div class="coluna-acao">
                <!-- Botão que abre o Modal Pix -->
                <button type="button" class="btn-acao-historico btn-abrir-pix">Pagar</button>
            </div>
        </div>
    </div>

    <!-- Item 2: Pago -->
    <div class="card-historico pago">
        <div class="barra-status"></div>
        <div class="conteudo-historico">
            <div class="coluna-historico">
                <span class="label-historico">REFERÊNCIA</span>
                <strong class="valor-coluna">Outubro 2026</strong>
            </div>

            <div class="coluna-historico">
                <span class="label-historico">VENCIMENTO</span>
                <strong class="valor-coluna">20/10/2026</strong>
            </div>

            <div class="coluna-historico">
                <span class="label-historico">VALOR</span>
                <strong class="valor-coluna">R$ 1.200,00</strong>
            </div>

            <div class="coluna-historico">
                <span class="label-historico">STATUS</span>
                <span class="badge-status pago">Pago</span>
            </div>

            <div class="coluna-acao">
                <button type="button" class="btn-acao-historico btn-recibo">Recibo</button>
            </div>
        </div>
    </div>

    <!-- Item 3: Pago -->
    <div class="card-historico pago">
        <div class="barra-status"></div>
        <div class="conteudo-historico">
            <div class="coluna-historico">
                <span class="label-historico">REFERÊNCIA</span>
                <strong class="valor-coluna">Setembro 2026</strong>
            </div>

            <div class="coluna-historico">
                <span class="label-historico">VENCIMENTO</span>
                <strong class="valor-coluna">20/09/2026</strong>
            </div>

            <div class="coluna-historico">
                <span class="label-historico">VALOR</span>
                <strong class="valor-coluna">R$ 1.200,00</strong>
            </div>

            <div class="coluna-historico">
                <span class="label-historico">STATUS</span>
                <span class="badge-status pago">Pago</span>
            </div>

            <div class="coluna-acao">
                <button type="button" class="btn-acao-historico btn-recibo">Recibo</button>
            </div>
        </div>
    </div>

    <!-- Item 4: Pago -->
    <div class="card-historico pago">
        <div class="barra-status"></div>
        <div class="conteudo-historico">
            <div class="coluna-historico">
                <span class="label-historico">REFERÊNCIA</span>
                <strong class="valor-coluna">Agosto 2026</strong>
            </div>

            <div class="coluna-historico">
                <span class="label-historico">VENCIMENTO</span>
                <strong class="valor-coluna">20/08/2026</strong>
            </div>

            <div class="coluna-historico">
                <span class="label-historico">VALOR</span>
                <strong class="valor-coluna">R$ 1.200,00</strong>
            </div>

            <div class="coluna-historico">
                <span class="label-historico">STATUS</span>
                <span class="badge-status pago">Pago</span>
            </div>

            <div class="coluna-acao">
                <button type="button" class="btn-acao-historico btn-recibo">Recibo</button>
            </div>
        </div>
    </div>
</div>
</section>
