<?php
// Funções do cookie de consentimento (banner de cookies da UCEN)
// Valores do cookie: "1" = aceitou | "0" = rejeitou (não usado mais: rejeitar apaga o cookie)

const COOKIE_CONSENTIMENTO = 'cookie_consent';

// true SOMENTE se o visitante aceitou (é isso que libera o histórico)
function temConsentimentoCookies() {
    return isset($_COOKIE[COOKIE_CONSENTIMENTO]) && $_COOKIE[COOKIE_CONSENTIMENTO] === '1';
}

// true se o visitante já escolheu algo (aceitar OU rejeitar)
function jaDecidiuCookies() {
    return isset($_COOKIE[COOKIE_CONSENTIMENTO])
        && in_array($_COOKIE[COOKIE_CONSENTIMENTO], ['0', '1'], true);
}

// Grava a escolha do visitante por 1 ano
function registrarEscolhaCookies($aceitou) {

    $valor = $aceitou ? '1' : '0';

    setcookie(COOKIE_CONSENTIMENTO, $valor, [
        'expires'  => time() + 60 * 60 * 24 * 365,
        'path'     => '/',
        'secure'   => !empty($_SERVER['HTTPS']),
        'httponly' => true,
        'samesite' => 'Lax'
    ]);

    $_COOKIE[COOKIE_CONSENTIMENTO] = $valor;
}

// Mantido com o nome antigo para não quebrar o aceitar_cookies.php
function registrarConsentimentoCookies() {
    registrarEscolhaCookies(true);
}
