<?php
header("Content-type: application/json;charset=utf-8");

include_once("connect_nebula.php");
include_once("visitante.php");

$visitante_id = garantirVisitanteId();
$termo = trim($_POST['termo'] ?? '');

if ($termo === '') {
    echo json_encode(["sucesso" => false, "erro" => "Termo vazio"]);
    exit;
}

// Se o termo já existe no histórico deste visitante, remove a ocorrência antiga
// primeiro, assim ele "sobe" pro topo com a data nova (igual o Google faz)
$stmt = mysqli_prepare($link, "DELETE FROM historico_pesquisas WHERE visitante_id = ? AND termo_pesquisado = ?");
mysqli_stmt_bind_param($stmt, "ss", $visitante_id, $termo);
mysqli_stmt_execute($stmt);
mysqli_stmt_close($stmt);

// Insere o termo pesquisado agora
$stmt = mysqli_prepare($link, "INSERT INTO historico_pesquisas (visitante_id, termo_pesquisado) VALUES (?, ?)");
mysqli_stmt_bind_param($stmt, "ss", $visitante_id, $termo);
mysqli_stmt_execute($stmt);
mysqli_stmt_close($stmt);

// Mantém só os 10 termos mais recentes deste visitante, apaga o resto
$stmt = mysqli_prepare($link, "
    DELETE FROM historico_pesquisas
    WHERE visitante_id = ?
    AND id_historico NOT IN (
        SELECT id_historico FROM (
            SELECT id_historico
            FROM historico_pesquisas
            WHERE visitante_id = ?
            ORDER BY data_pesquisa DESC
            LIMIT 10
        ) AS mais_recentes
    )
");
mysqli_stmt_bind_param($stmt, "ss", $visitante_id, $visitante_id);
mysqli_stmt_execute($stmt);
mysqli_stmt_close($stmt);

echo json_encode(["sucesso" => true]);