<?php
include_once(__DIR__ . "/academico-base-nebula.php");
exigirMetodo('POST');

$id = filter_var($_POST['id'] ?? '', FILTER_VALIDATE_INT);

if (!$id) {
    responderErro("Aluno inválido.");
}

try {

    $stmt = mysqli_prepare($link, "DELETE FROM alunos WHERE id_alunos = ?");
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);
    $apagados = mysqli_stmt_affected_rows($stmt);
    mysqli_stmt_close($stmt);

    if ($apagados === 0) {
        responderErro("Aluno não encontrado. Ele pode já ter sido excluído.");
    }

    echo json_encode(["sucesso" => true]);

} catch (mysqli_sql_exception $e) {

    // 1451 = existem registros em outras tabelas ligados a esse aluno (chave estrangeira)
    if ($e->getCode() === 1451) {
        responderErro("Este aluno tem registros vinculados (matrículas, notas...) e não pode ser excluído. Altere o status para Cancelado.");
    }

    error_log("excluir aluno: " . $e->getMessage());
    http_response_code(500);
    responderErro("Não foi possível excluir o aluno.");

}
