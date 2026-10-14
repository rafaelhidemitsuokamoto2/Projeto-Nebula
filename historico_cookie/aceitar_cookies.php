<?php
header("Content-type: application/json;charset=utf-8");

include_once __DIR__ . '/consentimento.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["sucesso" => false, "erro" => "Método inválido"]);
    exit;
}

registrarConsentimentoCookies();

echo json_encode(["sucesso" => true]);
