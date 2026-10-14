<?php

    // ==========================================================
    // calendario_ano_aluno.php
    // NOVO: devolve para o ALUNO só as datas (AAAA-MM-DD) que têm atividade
    // no ano inteiro; o JS conta quantas caem em cada mês (visão anual).
    // ==========================================================

    session_start();
    include_once __DIR__ . '/../connect_nebula.php';
    header("Content-Type: application/json; charset=utf-8");

    if (!isset($_SESSION['logado']) || $_SESSION['logado'] !== true) {
        http_response_code(401);
        echo json_encode(["erro" => "Não autenticado."]);
        exit;
    }

    if (($_SESSION['tipo'] ?? '') !== 'aluno') {
        http_response_code(403);
        echo json_encode(["erro" => "Sem permissão."]);
        exit;
    }

    $ano = isset($_GET['ano']) ? intval($_GET['ano']) : intval(date('Y'));
    if ($ano < 2000 || $ano > 2100) $ano = intval(date('Y'));

    $inicio = sprintf('%04d-01-01', $ano);
    $fim    = sprintf('%04d-12-31', $ano);

    $sql = "SELECT data FROM eventos_calendario WHERE data BETWEEN ? AND ?";

    $stmt = mysqli_prepare($mysqli, $sql);
    mysqli_stmt_bind_param($stmt, "ss", $inicio, $fim);
    mysqli_stmt_execute($stmt);
    $resultado = mysqli_stmt_get_result($stmt);

    $datas = [];
    while ($linha = mysqli_fetch_assoc($resultado)) {
        $datas[] = $linha["data"];
    }

    echo json_encode($datas);

?>