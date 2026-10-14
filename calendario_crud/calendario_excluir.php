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

    $dados = json_decode(file_get_contents("php://input"), true);
    $id = intval($dados['id'] ?? 0);

    if ($id <= 0) {
        http_response_code(400);
        echo json_encode(["erro" => "ID inválido."]);
        exit;
    }

    // O "AND professor_id = ?" garante que um professor não consiga
    // apagar evento de outro professor mesmo manipulando a requisição.
    $sql = "DELETE FROM eventos_calendario WHERE id_calendario = ? AND professor_id = ?";
    $stmt = mysqli_prepare($mysqli, $sql);
    mysqli_stmt_bind_param($stmt, "ii", $id, $professorId);
    mysqli_stmt_execute($stmt);

    echo json_encode(["sucesso" => true]);

?>