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

    // Retorna só as datas do ano inteiro; o JS conta quantas caem em cada mês
    $sql = "SELECT data FROM eventos_calendario WHERE professor_id = ? AND data LIKE ?";
    $curinga = $ano . "-%";

    $stmt = mysqli_prepare($mysqli, $sql);
    mysqli_stmt_bind_param($stmt, "is", $professorId, $curinga);
    mysqli_stmt_execute($stmt);
    $resultado = mysqli_stmt_get_result($stmt);

    $datas = [];
    while ($linha = mysqli_fetch_assoc($resultado)) {
        $datas[] = $linha["data"];
    }

    echo json_encode($datas);

?>