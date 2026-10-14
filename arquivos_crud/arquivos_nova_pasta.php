<?php
// ==========================================================
// POST arquivos_nova_pasta.php
// Campos: nome, turma, pasta_pai (vazio = cria na raiz)
// ==========================================================

header("Content-Type: application/json; charset=utf-8");
include_once __DIR__ . '/../connect_nebula.php';

$nome     = mysqli_real_escape_string($link, trim($_POST["nome"] ?? ""));
$turma    = mysqli_real_escape_string($link, $_POST["turma"] ?? "");
$pastaPai = (isset($_POST["pasta_pai"]) && $_POST["pasta_pai"] !== "") ? (int) $_POST["pasta_pai"] : null;

if ($nome === "") {
    echo json_encode(["sucesso" => false, "mensagem" => "Informe um nome para a pasta."]);
    exit;
}

$valorPastaPai = $pastaPai ? $pastaPai : "NULL";

$sql = "INSERT INTO arquivos_professor (tipo, nome, turma, pasta_pai)
        VALUES ('pasta', '$nome', '$turma', $valorPastaPai)";

if (mysqli_query($link, $sql)) {
    echo json_encode(["sucesso" => true, "id" => mysqli_insert_id($link)]);
} else {
    echo json_encode(["sucesso" => false, "mensagem" => mysqli_error($link)]);
}
