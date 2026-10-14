<?php
// ==========================================================
// agenda-listar-aluno.php
// NOVO: devolve para o ALUNO os compromissos que os professores cadastraram
// (tabela agenda_professor). É somente leitura: o aluno não insere nem exclui.
// ==========================================================
header("Content-type: application/json; charset=utf-8");
session_start();

if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true) {
    http_response_code(401);
    echo json_encode(["erro" => "Não autenticado"]);
    exit;
}

// Só aluno usa esta agenda (o professor continua usando agenda-listar.php)
if (($_SESSION['tipo'] ?? '') !== 'aluno') {
    http_response_code(403);
    echo json_encode(["erro" => "Sem permissão"]);
    exit;
}

include_once __DIR__ . '/../connect_nebula.php';

// Período da semana (opcional via GET, senão usa a semana atual: segunda a sexta)
$inicio = $_GET['inicio'] ?? '';
$fim    = $_GET['fim']    ?? '';

// Só aceita datas no formato AAAA-MM-DD; qualquer outra coisa volta para a semana atual
if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $inicio)) {
    $inicio = date('Y-m-d', strtotime('monday this week'));
}
if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $fim)) {
    $fim = date('Y-m-d', strtotime('friday this week'));
}

// Sem filtro de professor: o aluno vê os compromissos de todos os professores.
// O professor_id NÃO é enviado ao aluno (ele não precisa dessa informação).
$sql = "SELECT id_agenda, data, hora, titulo, horario, local, cor
        FROM agenda_professor
        WHERE data BETWEEN ? AND ?
        ORDER BY data, hora";

$stmt = mysqli_prepare($link, $sql);
mysqli_stmt_bind_param($stmt, "ss", $inicio, $fim);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

$eventos = [];
while ($linha = mysqli_fetch_assoc($result)) {
    $eventos[] = $linha;
}

echo json_encode($eventos);