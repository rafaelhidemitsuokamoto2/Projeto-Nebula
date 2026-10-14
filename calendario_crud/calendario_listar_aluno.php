<?php

    // ==========================================================
    // calendario_listar_aluno.php
    // NOVO: devolve para o ALUNO as atividades do mês que os professores
    // cadastraram (tabela eventos_calendario). Somente leitura.
    // ==========================================================

    session_start();
    include_once __DIR__ . '/../connect_nebula.php';
    header("Content-Type: application/json; charset=utf-8");

    if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true) {
        http_response_code(401);
        echo json_encode(["erro" => "Não autenticado."]);
        exit;
    }

    // Só aluno usa este arquivo (o professor continua usando calendario_listar.php)
    if (($_SESSION['tipo'] ?? '') !== 'aluno') {
        http_response_code(403);
        echo json_encode(["erro" => "Sem permissão."]);
        exit;
    }

    $ano = isset($_GET['ano']) ? intval($_GET['ano']) : intval(date('Y'));
    $mes = isset($_GET['mes']) ? intval($_GET['mes']) : intval(date('n'));

    // Valores fora do normal voltam para o mês atual
    if ($ano < 2000 || $ano > 2100) $ano = intval(date('Y'));
    if ($mes < 1 || $mes > 12)      $mes = intval(date('n'));

    $inicio = sprintf('%04d-%02d-01', $ano, $mes);
    $fim = date('Y-m-t', strtotime($inicio));

    // Sem filtro de professor: o aluno vê as atividades de todos os professores.
    // O professor_id e o id do evento NÃO são enviados ao aluno (ele não precisa deles).
    $sql = "SELECT data, titulo, horario
            FROM eventos_calendario
            WHERE data BETWEEN ? AND ?
            ORDER BY data ASC, horario ASC";

    $stmt = mysqli_prepare($mysqli, $sql);
    mysqli_stmt_bind_param($stmt, "ss", $inicio, $fim);
    mysqli_stmt_execute($stmt);
    $resultado = mysqli_stmt_get_result($stmt);

    $eventos = [];
    while ($linha = mysqli_fetch_assoc($resultado)) {
        $eventos[] = [
            "data" => $linha["data"],
            "titulo" => $linha["titulo"],
            "horario" => $linha["horario"]
        ];
    }

    echo json_encode($eventos);

?>