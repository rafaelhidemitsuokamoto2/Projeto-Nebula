<?php
header("Content-type: application/json; charset=utf-8");
session_start();

if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true) {
    http_response_code(401);
    echo json_encode(["erro" => "Não autenticado"]);
    exit;
}

// NOVO: a agenda é só do professor. Aluno e suporte também têm sessão "logado",
// mas não podem ler nem alterar a agenda (403 = logado, porém sem permissão).
if (($_SESSION['tipo'] ?? '') !== 'professor') {
    http_response_code(403);
    echo json_encode(["erro" => "Sem permissão"]);
    exit;
}

include_once __DIR__ . '/../connect_nebula.php';

// NOVO: o professor agora tem id próprio na sessão (vem da tabela prof_login).
// Antes era $_SESSION['id_usuarios'], que agora só existe para alunos.
$professor_id = $_SESSION['id_prof'];
$id_agenda    = $_POST['id_agenda'] ?? 0;

$sql = "DELETE FROM agenda_professor WHERE id_agenda = ? AND professor_id = ?";
$stmt = mysqli_prepare($link, $sql);
mysqli_stmt_bind_param($stmt, "ii", $id_agenda, $professor_id);

if (mysqli_stmt_execute($stmt)) {
    echo json_encode(["sucesso" => true]);
} else {
    http_response_code(500);
    echo json_encode(["erro" => "Erro ao excluir: " . mysqli_error($link)]);
}
?>