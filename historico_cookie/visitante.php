<?php

// ==========================================================
// Identidade do visitante (independente de login)
//
// Quem ACEITAR os cookies recebe um cookie "visitante_id" com um código
// aleatório. É esse código que liga o histórico de pesquisa a
// "essa pessoa/navegador", sem depender de conta nem de login.
//
// Quem rejeita (ou ainda não escolheu) não recebe esse cookie: quem
// controla isso é o consentimento.php, checado no home.php e nos
// endpoints do histórico.
//
// Precisa ser chamado ANTES de qualquer HTML ser enviado
// (por isso fica logo no topo do home.php).
// ==========================================================

function garantirVisitanteId() {

    // Só aceita IDs no formato que nós mesmos geramos (32 caracteres hexadecimais).
    // O cookie fica no navegador e pode ser alterado à mão.
    if (isset($_COOKIE['visitante_id'])
        && preg_match('/^[a-f0-9]{32}$/', $_COOKIE['visitante_id'])) {
        return $_COOKIE['visitante_id'];
    }

    // 16 bytes aleatórios = 32 caracteres em hexadecimal, praticamente
    // impossível de outra pessoa adivinhar ou repetir por acaso
    $novoId = bin2hex(random_bytes(16));

    // Guarda por 1 ano
    setcookie('visitante_id', $novoId, [
        'expires'  => time() + 60 * 60 * 24 * 365,
        'path'     => '/',
        'secure'   => !empty($_SERVER['HTTPS']),
        'httponly' => true,
        'samesite' => 'Lax'
    ]);

    // Já deixa disponível nesta mesma requisição, já que o navegador
    // só manda o cookie de volta a partir da PRÓXIMA requisição
    $_COOKIE['visitante_id'] = $novoId;

    return $novoId;

}
