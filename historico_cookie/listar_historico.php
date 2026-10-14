<?php
header("Content-type: application/json;charset=utf-8");

include_once __DIR__ . '/../connect_nebula.php';
include_once __DIR__ . '/../visitante.php';
include_once __DIR__ . '/../consentimento.php';

// Sem aceitar os cookies, o histórico não funciona
if (!temConsentimentoCookies()) {
    http_response_code(403);
    echo json_encode([]);
    exit;
}

$visitante_id = garantirVisitanteId();

$stmt = mysqli_prepare($link, "
    SELECT id_historico, termo_pesquisado
    FROM historico_pesquisas
    WHERE visitante_id = ?
    ORDER BY data_pesquisa DESC
    LIMIT 10
");
mysqli_stmt_bind_param($stmt, "s", $visitante_id);
mysqli_stmt_execute($stmt);
$resultado = mysqli_stmt_get_result($stmt);

$historico = [];
while ($linha = mysqli_fetch_assoc($resultado)) {
    $historico[] = $linha;
}

mysqli_stmt_close($stmt);

echo json_encode($historico);
