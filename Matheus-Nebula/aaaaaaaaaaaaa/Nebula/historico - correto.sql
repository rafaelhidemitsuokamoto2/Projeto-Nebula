-- ==========================================================
-- Migração: histórico deixa de depender do login
--
-- Rode isso na aba SQL do phpMyAdmin (banco faculdade_nebula).
-- Não apaga os dados que já existem na historico_pesquisas.
-- ==========================================================

-- 1) Remove a obrigatoriedade de estar logado (chave estrangeira e NOT NULL)
ALTER TABLE historico_pesquisas
    DROP FOREIGN KEY fk_historico_usuario;

ALTER TABLE historico_pesquisas
    MODIFY id_usuarios INT NULL;

-- 2) Adiciona a coluna que identifica o visitante pelo cookie
ALTER TABLE historico_pesquisas
    ADD COLUMN visitante_id VARCHAR(32) NULL AFTER id_usuarios;

-- 3) Índice pra buscar rápido "últimos termos deste visitante"
CREATE INDEX idx_historico_visitante_data
    ON historico_pesquisas (visitante_id, data_pesquisa);

-- Observação: a coluna id_usuarios continua existindo (só ficou opcional),
-- caso no futuro vocês queiram também ligar o histórico à conta de quem
-- está logado. Por enquanto ela fica sempre NULL, só o visitante_id é usado.
