<?php
// ==========================================================
// POST arquivos_upload.php  (multipart/form-data)
// Campos: nome, tipo, turma, pasta_pai (vazio = raiz), arquivo (file)
// ==========================================================

header("Content-Type: application/json; charset=utf-8");
include_once __DIR__ . '/../connect_nebula.php';

$nome     = trim($_POST["nome"] ?? "");
$tipo     = mysqli_real_escape_string($link, $_POST["tipo"] ?? "arquivo");
$turma    = mysqli_real_escape_string($link, $_POST["turma"] ?? "");
$pastaPai = (isset($_POST["pasta_pai"]) && $_POST["pasta_pai"] !== "") ? (int) $_POST["pasta_pai"] : null;

if (!isset($_FILES["arquivo"]) || $_FILES["arquivo"]["error"] !== UPLOAD_ERR_OK) {
    echo json_encode(["sucesso" => false, "mensagem" => "Nenhum arquivo válido foi enviado."]);
    exit;
}

// Pasta física onde os uploads ficam salvos no servidor
$pastaDestino = __DIR__ . "/uploads/professor_arquivos/";

if (!is_dir($pastaDestino)) {
    mkdir($pastaDestino, 0755, true);
}

// Extensões aceitas - ajuste essa lista conforme a necessidade
$extensoesAceitas = ["pdf", "ppt", "pptx", "doc", "docx", "xls", "xlsx", "zip", "png", "jpg", "jpeg"];
$extensao = strtolower(pathinfo($_FILES["arquivo"]["name"], PATHINFO_EXTENSION));

if (!in_array($extensao, $extensoesAceitas)) {
    echo json_encode(["sucesso" => false, "mensagem" => "Tipo de arquivo não permitido (.$extensao)."]);
    exit;
}

if ($nome === "") {
    $nome = $_FILES["arquivo"]["name"];
}
$nome = mysqli_real_escape_string($link, $nome);

// Nome físico único no servidor, pra não sobrescrever arquivos com nomes repetidos
$nomeFisico    = uniqid("arq_") . "." . $extensao;
$caminhoFisico = $pastaDestino . $nomeFisico;
$caminhoSalvo  = "uploads/professor_arquivos/" . $nomeFisico; // caminho relativo salvo no banco

if (move_uploaded_file($_FILES["arquivo"]["tmp_name"], $caminhoFisico)) {

    $valorPastaPai = $pastaPai ? $pastaPai : "NULL";

    $sql = "INSERT INTO arquivos_professor (tipo, nome, caminho, turma, pasta_pai)
            VALUES ('$tipo', '$nome', '$caminhoSalvo', '$turma', $valorPastaPai)";

    if (mysqli_query($link, $sql)) {
        echo json_encode(["sucesso" => true, "id" => mysqli_insert_id($link), "caminho" => $caminhoSalvo]);
    } else {
        // Se a linha não foi salva no banco, não faz sentido deixar o arquivo órfão no servidor
        unlink($caminhoFisico);
        echo json_encode(["sucesso" => false, "mensagem" => mysqli_error($link)]);
    }

} else {
    echo json_encode(["sucesso" => false, "mensagem" => "Falha ao mover o arquivo enviado."]);
}
