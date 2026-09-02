<?php
/* paginas/perfil.php - Seção "Meu Perfil" do menu, incluída dentro de portal_aluno.php */
?>
<section class="pagina pagina-interna perfil-container" data-conteudo="perfil">
    
    <!-- Topo / Header do Perfil -->
    <section class="perfil-header-card">
        
        <!-- Avatar Wrapper configurado como Label para acionar o Input File -->
        <label for="upload-foto" class="avatar-wrapper" id="avatar-container">
            <!-- Ícone padrão do usuário (exibido enquanto não houver foto) -->
            <div class="avatar-placeholder" id="avatar-placeholder">
                <i class="fa-solid fa-user"></i>
            </div>
            
            <!-- Imagem de preview (inicia oculta) -->
            <img src="" alt="Foto de Perfil" id="foto-perfil-img" style="display: none;">
            
            <!-- Input oculto conectado pelo 'for="upload-foto"' da label -->
            <input type="file" id="upload-foto" accept="image/*" style="display: none;">
            
            <!-- Botão visual da câmera -->
            <div class="btn-alterar-foto" title="Alterar Foto">
                <i class="fa-solid fa-camera"></i>
            </div>
        </label>

        <div class="perfil-header-info">
            <div class="nome-status-wrapper">
                <h2>Matheus de Oliveira</h2>
                <span class="badge-status ativo">Matriculado</span>
            </div>
            <p class="meta-info"><i class="fa-solid fa-graduation-cap"></i> Ciências da Computação</p>
            <p class="meta-info"><i class="fa-solid fa-id-card"></i> Matrícula / RA: <strong>628090055</strong></p>
        </div>

    </section>

    <!-- Bloco 1: Acesso & Segurança -->
    <section class="perfil-secao-card">
        <div class="secao-titulo">
            <i class="fa-solid fa-shield-halved"></i>
            <h3>Acesso & Segurança</h3>
        </div>
        <div class="form-grid-2">
            <div class="input-group">
                <label>E-mail de Login</label>
                <input type="email" value="matheusdeoliveira25.reciclar@gmail.com" readonly class="input-bloqueado">
            </div>
            <div class="input-group btn-align-bottom">
                <button type="button" class="btn-secundario" id="btn-alterar-senha">
                    <i class="fa-solid fa-key"></i> Alterar Senha
                </button>
            </div>
        </div>
    </section>

    <!-- Bloco 2: Dados Pessoais & Documentos -->
    <section class="perfil-secao-card">
        <div class="secao-titulo-com-alerta">
            <div class="secao-titulo">
                <i class="fa-solid fa-id-card-clip"></i>
                <h3>Dados Pessoais & Documentos</h3>
            </div>
            <div class="alerta-secretaria">
                <i class="fa-solid fa-lock"></i> Dados alteráveis apenas via Secretaria
            </div>
        </div>

        <div class="form-grid-3">
            <div class="input-group span-2">
                <label>Nome Completo</label>
                <div class="input-com-icone">
                    <input type="text" value="MATHEUS DE OLIVEIRA" readonly class="input-bloqueado">
                    <i class="fa-solid fa-lock icone-cadeado"></i>
                </div>
            </div>
            <div class="input-group">
                <label>Nome Social</label>
                <div class="input-com-icone">
                    <input type="text" value="--" readonly class="input-bloqueado">
                    <i class="fa-solid fa-lock icone-cadeado"></i>
                </div>
            </div>

            <div class="input-group">
                <label>CPF</label>
                <div class="input-com-icone">
                    <input type="text" value="541.170.248-84" readonly class="input-bloqueado">
                    <i class="fa-solid fa-lock icone-cadeado"></i>
                </div>
            </div>
            <div class="input-group">
                <label>Data de Nascimento</label>
                <div class="input-com-icone">
                    <input type="text" value="25/04/2007" readonly class="input-bloqueado">
                    <i class="fa-solid fa-lock icone-cadeado"></i>
                </div>
            </div>
            <div class="input-group">
                <label>Gênero</label>
                <div class="input-com-icone">
                    <input type="text" value="Masculino" readonly class="input-bloqueado">
                    <i class="fa-solid fa-lock icone-cadeado"></i>
                </div>
            </div>

            <div class="input-group">
                <label>RG / Documento</label>
                <div class="input-com-icone">
                    <input type="text" value="628090055" readonly class="input-bloqueado">
                    <i class="fa-solid fa-lock icone-cadeado"></i>
                </div>
            </div>
            <div class="input-group">
                <label>Órgão Emissor / UF</label>
                <div class="input-com-icone">
                    <input type="text" value="SSP / SP" readonly class="input-bloqueado">
                    <i class="fa-solid fa-lock icone-cadeado"></i>
                </div>
            </div>
            <div class="input-group">
                <label>Estado Civil</label>
                <div class="input-com-icone">
                    <input type="text" value="Solteiro(a)" readonly class="input-bloqueado">
                    <i class="fa-solid fa-lock icone-cadeado"></i>
                </div>
            </div>

            <div class="input-group span-2">
                <label>Nome da Mãe</label>
                <div class="input-com-icone">
                    <input type="text" value="IVANI PORTO DE OLIVEIRA" readonly class="input-bloqueado">
                    <i class="fa-solid fa-lock icone-cadeado"></i>
                </div>
            </div>
            <div class="input-group">
                <label>Raça / Etnia</label>
                <div class="input-com-icone">
                    <input type="text" value="Sem declaração" readonly class="input-bloqueado">
                    <i class="fa-solid fa-lock icone-cadeado"></i>
                </div>
            </div>
        </div>

        <div class="card-footer-solicitacao">
            <a href="solicitar-alteracao.html" class="btn-secundario-link">
                <i class="fa-solid fa-file-signature"></i> Solicitar Alteração de Dados
            </a>
        </div>
    </section>

    <!-- Bloco 3: Contato & Endereço -->
    <section class="perfil-secao-card">
        <form id="form-contato-endereco">
            <div class="secao-titulo">
                <i class="fa-solid fa-address-book"></i>
                <h3>Contato & Endereço</h3>
            </div>

            <div class="form-grid-3">
                <div class="input-group">
                    <label for="celular">Celular (WhatsApp)</label>
                    <input type="text" id="celular" value="(11) 99854-5737" placeholder="(00) 00000-0000">
                </div>
                <div class="input-group">
                    <label for="tel-recado">Telefone Residencial / Recado</label>
                    <input type="text" id="tel-recado" value="" placeholder="(00) 0000-0000">
                </div>
                <div class="input-group">
                    <label for="email-secundario">E-mail Comercial / Secundário</label>
                    <input type="email" id="email-secundario" value="" placeholder="exemplo@email.com">
                </div>

                <div class="input-group">
                    <label for="cep">CEP</label>
                    <input type="text" id="cep" value="06246-000" placeholder="00000-000">
                </div>
                <div class="input-group span-2">
                    <label for="logradouro">Logradouro / Rua</label>
                    <input type="text" id="logradouro" value="R PASCHOAL RANIERI MAZZILI">
                </div>

                <div class="input-group">
                    <label for="numero">Número</label>
                    <input type="text" id="numero" value="362">
                </div>
                <div class="input-group">
                    <label for="complemento">Complemento</label>
                    <input type="text" id="complemento" value="" placeholder="Apt, Bloco, etc.">
                </div>
                <div class="input-group">
                    <label for="bairro">Bairro</label>
                    <input type="text" id="bairro" value="MUNHOZ JUNIOR">
                </div>

                <div class="input-group">
                    <label for="cidade">Cidade</label>
                    <input type="text" id="cidade" value="OSASCO">
                </div>
                <div class="input-group">
                    <label for="uf">Estado (UF)</label>
                    <select id="uf">
                        <option value="SP" selected>São Paulo (SP)</option>
                        <option value="RJ">Rio de Janeiro (RJ)</option>
                        <option value="MG">Minas Gerais (MG)</option>
                        <option value="PR">Paraná (PR)</option>
                    </select>
                </div>
            </div>

            <div class="form-actions">
                <button type="submit" class="btn-principal">
                    <i class="fa-solid fa-floppy-disk"></i> Salvar Alterações
                </button>
            </div>
        </form>
    </section>

    <!-- Modal para Visualizar Foto em Destaque -->
    <div id="modal-foto-perfil" class="modal-foto-overlay">
        <div class="modal-foto-content">
            <img id="img-modal-zoom" src="" alt="Foto de Perfil Ampliada">
        </div>
    </div>

</section>
