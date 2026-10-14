<?php
// ==========================================================
// GET arquivos_listar.php?pasta=ID&turma=bd&ordem=desc
// Retorna em JSON os itens da pasta atual (ou da raiz, se "pasta"
// vier vazio) e o caminho (breadcrumb) até ela.
// ==========================================================

header("Content-Type: application/json; charset=utf-8");
include_once __DIR__ . '/../connect_nebula.php';

$pastaId = (isset($_GET["pasta"]) && $_GET["pasta"] !== "") ? (int) $_GET["pasta"] : null;
$turma   = isset($_GET["turma"]) ? mysqli_real_escape_string($link, $_GET["turma"]) : "todas";
$ordem   = (isset($_GET["ordem"]) && $_GET["ordem"] === "asc") ? "ASC" : "DESC";

$condicaoPasta = $pastaId ? "pasta_pai = $pastaId" : "pasta_pai IS NULL";

$condicaoTurma = "";
if ($turma !== "" && $turma !== "todas") {
    $condicaoTurma = "AND turma = '$turma'";
}

// Pastas sempre aparecem primeiro, depois os arquivos, ordenados pela data
$sql = "SELECT id_arq_prof AS id, tipo, nome, caminho, turma, data_criacao
        FROM arquivos_professor
        WHERE $condicaoPasta $condicaoTurma
        ORDER BY (tipo = 'pasta') DESC, data_criacao $ordem";

$resultado = mysqli_query($link, $sql);

if (!$resultado) {
    echo json_encode(["sucesso" => false, "mensagem" => mysqli_error($link)]);
    exit;
}

$itens = [];
while ($linha = mysqli_fetch_assoc($resultado)) {
    $itens[] = $linha;
}

// Monta o breadcrumb subindo pela árvore de pastas (pasta_pai em pasta_pai)
$breadcrumb = [];
$idAtual = $pastaId;

while ($idAtual) {

    $sqlPasta = "SELECT id_arq_prof AS id, nome, pasta_pai FROM arquivos_professor WHERE id_arq_prof = " . (int) $idAtual;
    $resPasta = mysqli_query($link, $sqlPasta);
    $pasta = mysqli_fetch_assoc($resPasta);

    if (!$pasta) break;

    array_unshift($breadcrumb, ["id" => $pasta["id"], "nome" => $pasta["nome"]]);
    $idAtual = $pasta["pasta_pai"];

}

echo json_encode([
    "sucesso" => true,
    "itens" => $itens,
    "breadcrumb" => $breadcrumb
]);
