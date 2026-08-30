<?php

// ==========================================================
// Identidade do visitante (independente de login)
//
// Toda pessoa que entra no site — logada ou não — recebe um
// cookie "visitante_id" com um código aleatório. É esse código
// que liga o histórico de pesquisa a "essa pessoa/navegador",
// sem depender de conta nem de login.
//
// Precisa ser chamado ANTES de qualquer HTML ser enviado
// (por isso fica logo no topo do home.php).
// ==========================================================

function garantirVisitanteId() {

    if (isset($_COOKIE['visitante_id']) && $_COOKIE['visitante_id'] !== '') {
        return $_COOKIE['visitante_id'];
    }

    // 16 bytes aleatórios = 32 caracteres em hexadecimal, praticamente
    // impossível de outra pessoa adivinhar ou repetir por acaso
    $novoId = bin2hex(random_bytes(16));

    // Guarda por 1 ano (60 * 60 * 24 * 365 segundos)
    setcookie('visitante_id', $novoId, time() + 60 * 60 * 24 * 365, '/');

    // Já deixa disponível nesta mesma requisição, já que o navegador
    // só manda o cookie de volta a partir da PRÓXIMA requisição
    $_COOKIE['visitante_id'] = $novoId;

    return $novoId;

}
