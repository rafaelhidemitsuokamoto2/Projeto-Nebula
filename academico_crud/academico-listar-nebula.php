<?php
include_once(__DIR__ . "/academico-base-nebula.php");
exigirMetodo('GET');

try {

    $resultado = mysqli_query(
        $link,
        "SELECT id_alunos AS id, nome, matricula, curso, semestre, contato, status
           FROM alunos
          ORDER BY nome"
    );

    $alunos = mysqli_fetch_all($resultado, MYSQLI_ASSOC);

    echo json_encode(["sucesso" => true, "alunos" => $alunos]);

} catch (mysqli_sql_exception $e) {

    error_log("listar alunos: " . $e->getMessage());
    http_response_code(500);
    responderErro("Não foi possível carregar os alunos.");

}
