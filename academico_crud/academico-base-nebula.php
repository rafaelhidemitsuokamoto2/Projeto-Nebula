<?php
// Arquivo comum a todos os PHPs do Acadêmico.
// Faz: resposta em JSON, sessão protegida, conexão e checagem de login.

header("Content-type: application/json;charset=utf-8");

// Mesmo cookie protegido do login. Precisa vir ANTES do session_start()
session_set_cookie_params([
    'lifetime' => 0,
    'path'     => '/',
    'httponly' => true,
    'samesite' => 'Lax'
]);
session_start();

// Erros do mysqli viram exceção (a gente captura com try/catch nos arquivos)
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

include_once(__DIR__ . "/../connect_nebula.php");
mysqli_set_charset($link, "utf8mb4");

function responderErro($mensagem, $campo = null) {
    echo json_encode(["sucesso" => false, "erro" => $mensagem, "campo" => $campo]);
    exit;
}

function exigirMetodo($metodo) {
    if ($_SERVER['REQUEST_METHOD'] !== $metodo) {
        http_response_code(405);
        responderErro("Método inválido");
    }
}

// Pega um campo do POST sempre como texto (evita erro se vier um array)
function campoPost($nome) {
    $valor = $_POST[$nome] ?? '';
    return is_string($valor) ? trim($valor) : '';
}

// Só quem fez login pode listar, editar ou excluir
if (empty($_SESSION['logado'])) {
    http_response_code(401);
    responderErro("Sessão expirada. Faça login novamente.");
}
