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

    $data = trim($dados['data'] ?? '');
    $titulo = trim($dados['titulo'] ?? '');
    $horario = trim($dados['horario'] ?? '');

    if ($data === '' || $titulo === '' || $horario === '') {
        http_response_code(400);
        echo json_encode(["erro" => "Preencha todos os campos."]);
        exit;
    }

    // NOVO: confere o formato (AAAA-MM-DD) e se a data realmente existe (recusa, por exemplo, 2026-02-31).
    $dataObj = DateTime::createFromFormat('Y-m-d', $data);
    if (!$dataObj || $dataObj->format('Y-m-d') !== $data) {
        http_response_code(400);
        echo json_encode(["erro" => "Data inválida."]);
        exit;
    }

    // Não é possível marcar atividades aos domingos, mesmo enviando a data
    // direto pra este endpoint (o calendário na tela também bloqueia o clique).
    if ($dataObj->format('w') === '0') { // 0 = domingo
        http_response_code(400);
        echo json_encode(["erro" => "Não é possível marcar atividades aos domingos."]);
        exit;
    }

    $sql = "INSERT INTO eventos_calendario (professor_id, data, titulo, horario) VALUES (?, ?, ?, ?)";
    $stmt = mysqli_prepare($mysqli, $sql);
    mysqli_stmt_bind_param($stmt, "isss", $professorId, $data, $titulo, $horario);

    // NOVO: se o banco recusar o INSERT, avisa o professor em vez de responder "sucesso" por engano
    if (!mysqli_stmt_execute($stmt)) {
        error_log("Calendário: erro ao inserir evento: " . mysqli_stmt_error($stmt));
        http_response_code(500);
        echo json_encode(["erro" => "Não foi possível salvar a atividade."]);
        exit;
    }

    echo json_encode([
        "id" => mysqli_insert_id($mysqli),
        "data" => $data,
        "titulo" => $titulo,
        "horario" => $horario
    ]);

?>