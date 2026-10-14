<?php
header("Content-type: application/json;charset=utf-8");

include_once __DIR__ . '/consentimento.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["sucesso" => false, "erro" => "Método inválido"]);
    exit;
}

// Rejeitar NÃO grava nenhuma decisão: apaga o consentimento (se existir)
// para que o banner volte a perguntar na próxima visita ou no F5
setcookie(COOKIE_CONSENTIMENTO, '', time() - 3600, '/');
unset($_COOKIE[COOKIE_CONSENTIMENTO]);

// Remove também o ID de visitante, se já existir de antes (histórico nunca é usado)
setcookie('visitante_id', '', time() - 3600, '/');
unset($_COOKIE['visitante_id']);

echo json_encode(["sucesso" => true]);
