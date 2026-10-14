<?php

    session_start();
    include_once __DIR__ . '/../connect_nebula.php';
    header("Content-Type: application/json; charset=utf-8");

    // NOVO: precisa estar logado E ser professor. Antes só conferia "id_usuarios", que
    // agora também existe para alunos (um aluno logado conseguiria mexer no calendário).
    if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true) {
        http_response_code(401);
        echo json_encode(["erro" => "Professor não autenticado."]);
        exit;
    }

    if (($_SESSION['tipo'] ?? '') !== 'professor') {
        http_response_code(403);
        echo json_encode(["erro" => "Sem permissão."]);
        exit;
    }

    // NOVO: o professor agora tem id próprio na sessão (vem da tabela prof_login).
    $professorId = $_SESSION['id_prof'];

    $ano = isset($_GET['ano']) ? intval($_GET['ano']) : date('Y');
    $mes = isset($_GET['mes']) ? intval($_GET['mes']) : date('n');

    $inicio = sprintf('%04d-%02d-01', $ano, $mes);
    $fim = date('Y-m-t', strtotime($inicio));

    $sql = "SELECT id_calendario, data, titulo, horario
            FROM eventos_calendario
            WHERE professor_id = ? AND data BETWEEN ? AND ?
            ORDER BY data ASC, horario ASC";

    $stmt = mysqli_prepare($mysqli, $sql);
    mysqli_stmt_bind_param($stmt, "iss", $professorId, $inicio, $fim);
    mysqli_stmt_execute($stmt);
    $resultado = mysqli_stmt_get_result($stmt);

    $eventos = [];
    while ($linha = mysqli_fetch_assoc($resultado)) {
        $eventos[] = [
            "id" => $linha["id_calendario"],
            "data" => $linha["data"],
            "titulo" => $linha["titulo"],
            "horario" => $linha["horario"]
        ];
    }

    echo json_encode($eventos);

?>