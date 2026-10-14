<?php
// ==========================================================
// BUSCA PERFIL DO PROFESSOR
// Retorna em JSON os dados já salvos (foto, contato, endereço,
// preferências) do professor logado, para a tela professor_perfil
// preencher os campos automaticamente ao carregar.
// ==========================================================

session_start();
header("Content-Type: application/json; charset=utf-8");
include_once(__DIR__ . "/../connect_nebula.php");

// IMPORTANTE: aqui assumimos que o login grava o id do usuário
// em $_SESSION['id_usuarios']. Se no seu login a chave de sessão
// tiver outro nome, troque aqui.
$id_usuarios = isset($_SESSION['id_usuarios']) ? (int) $_SESSION['id_usuarios'] : 0;

if ($id_usuarios <= 0) {
    echo json_encode(["sucesso" => false, "mensagem" => "Sessão expirada. Faça login novamente."]);
    exit;
}

$sql = "SELECT `foto`, `celular`, `tel_recado`, `email_secundario`,
               `cep`, `logradouro`, `numero`, `complemento`, `bairro`, `cidade`, `uf`,
               `notificacoes_email`, `lembrete_aulas`, `alerta_frequencia`
        FROM `professores`
        WHERE `id_usuarios` = ?";

$stmt = mysqli_prepare($link, $sql);
mysqli_stmt_bind_param($stmt, "i", $id_usuarios);
mysqli_stmt_execute($stmt);
$resultado = mysqli_stmt_get_result($stmt);
$perfil = mysqli_fetch_assoc($resultado);
mysqli_stmt_close($stmt);

if (!$perfil) {
    // Professor ainda não tem registro em `professores` -> valores padrão
    $perfil = [
        "foto" => null,
        "celular" => "",
        "tel_recado" => "",
        "email_secundario" => "",
        "cep" => "",
        "logradouro" => "",
        "numero" => "",
        "complemento" => "",
        "bairro" => "",
        "cidade" => "",
        "uf" => "",
        "notificacoes_email" => 1,
        "lembrete_aulas" => 1,
        "alerta_frequencia" => 1
    ];
}

echo json_encode(["sucesso" => true, "perfil" => $perfil]);

mysqli_close($link);
?>
