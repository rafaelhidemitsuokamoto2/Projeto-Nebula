<?php
// ==========================================================
// POST arquivos_excluir.php
// Campo: id
// Se for uma pasta, apaga tudo que está dentro dela também
// (subpastas e arquivos), tanto no banco quanto fisicamente.
// ==========================================================

header("Content-Type: application/json; charset=utf-8");
include_once __DIR__ . '/../connect_nebula.php';

$id = isset($_POST["id"]) ? (int) $_POST["id"] : 0;

if (!$id) {
    echo json_encode(["sucesso" => false, "mensagem" => "Item inválido."]);
    exit;
}

$sqlAtual = "SELECT tipo, caminho FROM arquivos_professor WHERE id_arq_prof = $id";
$resAtual = mysqli_query($link, $sqlAtual);
$itemAtual = mysqli_fetch_assoc($resAtual);

if (!$itemAtual) {
    echo json_encode(["sucesso" => false, "mensagem" => "Item não encontrado."]);
    exit;
}

// Percorre recursivamente as subpastas para juntar o caminho de
// todos os arquivos físicos que precisam ser apagados do servidor
// (o banco em si é resolvido sozinho pelo ON DELETE CASCADE)
function coletarCaminhosFisicos($link, $idPasta, &$caminhos) {

    $sql = "SELECT id_arq_prof AS id, tipo, caminho FROM arquivos_professor WHERE pasta_pai = $idPasta";
    $resultado = mysqli_query($link, $sql);

    while ($item = mysqli_fetch_assoc($resultado)) {

        if ($item["caminho"]) {
            $caminhos[] = $item["caminho"];
        }

        if ($item["tipo"] === "pasta") {
            coletarCaminhosFisicos($link, $item["id"], $caminhos);
        }

    }

}

$caminhos = [];

if ($itemAtual["caminho"]) {
    $caminhos[] = $itemAtual["caminho"];
}

if ($itemAtual["tipo"] === "pasta") {
    coletarCaminhosFisicos($link, $id, $caminhos);
}

$sqlExcluir = "DELETE FROM arquivos_professor WHERE id_arq_prof = $id";

if (mysqli_query($link, $sqlExcluir)) {

    foreach ($caminhos as $caminho) {
        $caminhoCompleto = __DIR__ . "/" . $caminho;
        if (file_exists($caminhoCompleto)) {
            unlink($caminhoCompleto);
        }
    }

    echo json_encode(["sucesso" => true]);

} else {
    echo json_encode(["sucesso" => false, "mensagem" => mysqli_error($link)]);
}
