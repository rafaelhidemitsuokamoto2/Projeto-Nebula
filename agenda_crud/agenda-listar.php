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

// Período da semana (opcional via GET, senão usa a semana atual: segunda a sexta)
$inicio = isset($_GET['inicio']) ? $_GET['inicio'] : date('Y-m-d', strtotime('monday this week'));
$fim    = isset($_GET['fim'])    ? $_GET['fim']    : date('Y-m-d', strtotime('friday this week'));

$sql = "SELECT id_agenda, data, hora, titulo, horario, local, cor
        FROM agenda_professor
        WHERE professor_id = ? AND data BETWEEN ? AND ?
        ORDER BY data, hora";

$stmt = mysqli_prepare($link, $sql);
mysqli_stmt_bind_param($stmt, "iss", $professor_id, $inicio, $fim);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

$eventos = [];
while ($linha = mysqli_fetch_assoc($result)) {
    $eventos[] = $linha;
}

echo json_encode($eventos);
?>