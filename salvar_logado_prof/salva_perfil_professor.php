<?php
// ==========================================================
// SALVA PERFIL DO PROFESSOR
// Recebe (via FormData/fetch) os campos de Contato & Endereço
// e, se enviada, a nova foto de perfil. Faz UPDATE se já existir
// registro em `professores` para o usuário logado, ou INSERT
// caso seja o primeiro salvamento.
//
// O upload de foto segue o mesmo padrão de atualiza_postagens.php:
// move_uploaded_file() + salva o caminho no banco.
// ==========================================================

session_start();
header("Content-Type: application/json; charset=utf-8");
include_once(__DIR__ . "/../config_google.php");

$id_usuarios = isset($_SESSION['id_usuarios']) ? (int) $_SESSION['id_usuarios'] : 0;

if ($id_usuarios <= 0) {
    echo json_encode(["sucesso" => false, "mensagem" => "Sessão expirada. Faça login novamente."]);
    exit;
}

// ----------------------------
// 1. Campos de texto
// ----------------------------
$celular          = isset($_POST['celular']) ? trim($_POST['celular']) : '';
$telRecado        = isset($_POST['telRecado']) ? trim($_POST['telRecado']) : '';
$emailSecundario  = isset($_POST['emailSecundario']) ? trim($_POST['emailSecundario']) : '';
$cep              = isset($_POST['cep']) ? trim($_POST['cep']) : '';
$logradouro       = isset($_POST['logradouro']) ? trim($_POST['logradouro']) : '';
$numero           = isset($_POST['numero']) ? trim($_POST['numero']) : '';
$complemento      = isset($_POST['complemento']) ? trim($_POST['complemento']) : '';
$bairro           = isset($_POST['bairro']) ? trim($_POST['bairro']) : '';
$cidade           = isset($_POST['cidade']) ? trim($_POST['cidade']) : '';
$uf               = isset($_POST['uf']) ? trim($_POST['uf']) : '';

if ($emailSecundario !== '' && !filter_var($emailSecundario, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["sucesso" => false, "mensagem" => "Informe um e-mail secundário válido."]);
    exit;
}

// ----------------------------
// 2. Busca registro atual (para saber se é INSERT ou UPDATE
//    e para não perder a foto já salva caso nenhuma nova seja enviada)
// ----------------------------
$sql = "SELECT `id_professor`, `foto` FROM `professores` WHERE `id_usuarios` = ?";
$stmt = mysqli_prepare($link, $sql);
mysqli_stmt_bind_param($stmt, "i", $id_usuarios);
mysqli_stmt_execute($stmt);
$res = mysqli_stmt_get_result($stmt);
$existente = mysqli_fetch_assoc($res);
mysqli_stmt_close($stmt);

$foto = $existente['foto'] ?? null;

// ----------------------------
// 3. Upload da foto (se enviada)
// ----------------------------
if (isset($_FILES['foto']) && $_FILES['foto']['error'] === 0) {

    $extensoesPermitidas = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    $extensao = strtolower(pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION));

    if (!in_array($extensao, $extensoesPermitidas)) {
        echo json_encode(["sucesso" => false, "mensagem" => "Formato de imagem não suportado."]);
        exit;
    }

    $pasta = "uploads/professores/";

    if (!is_dir($pasta)) {
        mkdir($pasta, 0777, true);
    }

    // nome único para não sobrescrever foto de outro professor / cache antigo
    $nomeArquivo = "professor_" . $id_usuarios . "_" . time() . "." . $extensao;
    $caminho = $pasta . $nomeArquivo;

    if (move_uploaded_file($_FILES['foto']['tmp_name'], $caminho)) {
        $foto = $caminho;
    } else {
        echo json_encode(["sucesso" => false, "mensagem" => "Falha ao enviar a foto."]);
        exit;
    }
}

// ----------------------------
// 4. INSERT ou UPDATE
// ----------------------------
if ($existente) {

    $sql = "UPDATE `professores`
            SET `foto` = ?, `celular` = ?, `tel_recado` = ?, `email_secundario` = ?,
                `cep` = ?, `logradouro` = ?, `numero` = ?, `complemento` = ?,
                `bairro` = ?, `cidade` = ?, `uf` = ?
            WHERE `id_usuarios` = ?";

    $stmt = mysqli_prepare($link, $sql);
    mysqli_stmt_bind_param(
        $stmt, "sssssssssssi",
        $foto, $celular, $telRecado, $emailSecundario,
        $cep, $logradouro, $numero, $complemento,
        $bairro, $cidade, $uf, $id_usuarios
    );
    $resultado = mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

} else {

    $sql = "INSERT INTO `professores`
            (`id_usuarios`, `foto`, `celular`, `tel_recado`, `email_secundario`,
             `cep`, `logradouro`, `numero`, `complemento`, `bairro`, `cidade`, `uf`)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    $stmt = mysqli_prepare($link, $sql);
    mysqli_stmt_bind_param(
        $stmt, "isssssssssss",
        $id_usuarios, $foto, $celular, $telRecado, $emailSecundario,
        $cep, $logradouro, $numero, $complemento, $bairro, $cidade, $uf
    );
    $resultado = mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);
}

if ($resultado) {
    echo json_encode(["sucesso" => true, "mensagem" => "Perfil atualizado com sucesso!", "foto" => $foto]);
} else {
    echo json_encode(["sucesso" => false, "mensagem" => "Falha ao salvar. Erro: " . mysqli_error($link)]);
}

mysqli_close($link);
?>
