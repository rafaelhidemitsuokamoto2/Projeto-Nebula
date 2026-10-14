<?php
header("Content-type: application/json;charset=utf-8");

include_once __DIR__ . '/../connect_nebula.php';
include_once __DIR__ . '/../visitante.php';
include_once __DIR__ . '/../consentimento.php';

// Sem aceitar os cookies, o histórico não funciona
if (!temConsentimentoCookies()) {
    http_response_code(403);
    echo json_encode(["sucesso" => false, "erro" => "Cookies não aceitos"]);
    exit;
}

$visitante_id = garantirVisitanteId();
$id_historico = intval($_POST['id_historico'] ?? 0);

if ($id_historico <= 0) {
    echo json_encode(["sucesso" => false, "erro" => "ID inválido"]);
    exit;
}

// O "AND visitante_id = ?" é o que impede um visitante de apagar
// histórico de outra pessoa só chutando um id_historico na requisição
$stmt = mysqli_prepare($link, "DELETE FROM historico_pesquisas WHERE id_historico = ? AND visitante_id = ?");
mysqli_stmt_bind_param($stmt, "is", $id_historico, $visitante_id);
mysqli_stmt_execute($stmt);

$apagou = mysqli_stmt_affected_rows($stmt) > 0;

mysqli_stmt_close($stmt);

echo json_encode(["sucesso" => $apagou]);
