-- ==========================================================
-- Tabela de histórico de pesquisa
-- Guarda os termos que cada usuário logado pesquisou,
-- pra exibir tipo o histórico do Google no dropdown.
-- ==========================================================

CREATE TABLE historico_pesquisas (

    id_historico     INT AUTO_INCREMENT PRIMARY KEY,
    id_usuarios      INT NOT NULL,
    termo_pesquisado VARCHAR(150) NOT NULL,
    data_pesquisa    DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_historico_usuario
        FOREIGN KEY (id_usuarios)
        REFERENCES usuarios(id_usuarios)
        ON DELETE CASCADE

);

-- Acelera a busca "últimos termos deste usuário"
CREATE INDEX idx_historico_usuario_data
    ON historico_pesquisas (id_usuarios, data_pesquisa);
