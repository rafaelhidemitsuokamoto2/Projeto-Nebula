<?php
include_once(__DIR__ . "/academico-base-nebula.php");
exigirMetodo('POST');

$id        = filter_var($_POST['id'] ?? '', FILTER_VALIDATE_INT);
$nome      = campoPost('nome');
$matricula = campoPost('matricula');
$curso     = campoPost('curso');
$semestre  = campoPost('semestre');
$contato   = campoPost('contato');
$status    = campoPost('status');

// ---------- Validação (o JavaScript do navegador nunca é suficiente) ----------

if (!$id) {
    responderErro("Aluno inválido.");
}
if ($nome === '' || mb_strlen($nome) > 120) {
    responderErro("Informe o nome do aluno (até 120 caracteres).", "nome");
}
if (!preg_match('/^[0-9]{4,20}$/', $matricula)) {
    responderErro("A matrícula deve ter apenas números (de 4 a 20 dígitos).", "matricula");
}
if ($curso === '' || mb_strlen($curso) > 100) {
    responderErro("Informe o curso.", "curso");
}
if ($semestre === '' || mb_strlen($semestre) > 10) {
    responderErro("Informe o semestre (ex.: 3º).", "semestre");
}
// Se o contato puder ser telefone também, troque por uma checagem de tamanho
if (!filter_var($contato, FILTER_VALIDATE_EMAIL) || mb_strlen($contato) > 120) {
    responderErro("Informe um e-mail de contato válido.", "contato");
}
if (!in_array($status, ['ativo', 'trancado', 'cancelado'], true)) {
    responderErro("Status inválido.", "status");
}

try {

    // O aluno existe? (affected_rows vem 0 quando nada mudou, então não serve pra isso)
    $stmt = mysqli_prepare($link, "SELECT id_alunos FROM alunos WHERE id_alunos = ?");
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $existe = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));
    mysqli_stmt_close($stmt);

    if (!$existe) {
        responderErro("Aluno não encontrado. Ele pode já ter sido excluído.");
    }

    $stmt = mysqli_prepare(
        $link,
        "UPDATE alunos
            SET nome = ?, matricula = ?, curso = ?, semestre = ?, contato = ?, status = ?
          WHERE id_alunos = ?"
    );
    mysqli_stmt_bind_param($stmt, "ssssssi", $nome, $matricula, $curso, $semestre, $contato, $status, $id);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    echo json_encode([
        "sucesso" => true,
        "aluno"   => [
            "id"        => $id,
            "nome"      => $nome,
            "matricula" => $matricula,
            "curso"     => $curso,
            "semestre"  => $semestre,
            "contato"   => $contato,
            "status"    => $status
        ]
    ]);

} catch (mysqli_sql_exception $e) {

    // 1062 = valor duplicado (matrícula é UNIQUE)
    if ($e->getCode() === 1062) {
        responderErro("Já existe outro aluno com essa matrícula.", "matricula");
    }

    error_log("editar aluno: " . $e->getMessage());
    http_response_code(500);
    responderErro("Não foi possível salvar as alterações.");

}
