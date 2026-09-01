<!DOCTYPE html>
<html lang="pt-BR">
<?php
include_once("connect.php");
error_reporting(0);
$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;
$nome = "";
$descricao = "";
$imagem = "";
$status = 1;
$dataCriacao = date("Y-m-d");
$sql = "SELECT `id`, `nome`, `descricao`, `imagem`, `status`, `dataCriacao` FROM `postagens` WHERE `id` = " .$id;
$resultado = mysqli_query($link, $sql);
if ($resultado) {
    foreach ($resultado as $rs) {
        $nome = $rs['nome'];
        $descricao = $rs['descricao'];
        $imagem = $rs['imagem'];
        $status = $rs['status'];
        $dataCriacao = $rs['dataCriacao'];
    }
}
?>
<head>
    <meta charset="utf-8">
    <title>Cadastro de Postagen</title>
    <link rel="stylesheet" type="text/css" href="estilo.css">
</head>
<body>
<div id="geral">
    <div id="topo">
        <?php include 'topo.php'; ?>
    </div>
    <div id="menu">
        <?php include 'menu.php'; ?>
    </div>
    <div id="conteudo">
        <h1>Cadastro de Postagens</h1>
        <div id="cadastro">
            <form method="post" action="atualiza_postagens.php" enctype="multipart/form-data">
                <input type="hidden" name="id" value="<?php echo $id; ?>">
                <table>
                    <tr>
                        <td>Nome:</td>
                        <td>
                            <input
                                type="text"
                                name="nome"
                                maxlength="150"
                                value="<?php echo htmlspecialchars($nome, ENT_QUOTES, 'UTF-8'); ?>"
                                class="txt"
                                required
                            >
                        </td>
                    </tr>
                    <tr>
                        <td>Descrição:</td>
                        <td>
                            <input
                                type="text"
                                name="descricao"
                                maxlength="255"
                                value="<?php echo htmlspecialchars($descricao, ENT_QUOTES, 'UTF-8'); ?>"
                                class="txt"
                                required
                            >
                        </td>
                    </tr>
                        <td>Status:</td>
                        <td>
                            <label>
                                <input
                                type="radio"
                                name="status"
                                value="1"
                                <?php echo ((string) $status === '1') ? 'checked' : ''; ?>
                            >
                            Ativo
                        </label>
                        <br>
                        <label>
                            <input
                            type="radio"
                            name="status"
                            value="0"
                            <?php echo ((string) $status === '0') ? 'checked' : ''; ?>
                            >
                            Inativo
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>Data de Criação:</td>
                    <td>
                        <input
                        type="date"
                        name="dataCriacao"
                        value="<?php echo htmlspecialchars($dataCriacao, ENT_QUOTES, 'UTF-8'); ?>"
                        class="txt"
                        required
                        >
                    </td>
                </tr>
                <tr>
                    <td>Imagem:</td>
                        <td>
                            <input type="file" name="imagem" accept="image/*">
                           
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <br><button type="submit" class="bt_enviar">Enviar Imagem</button> </form>
                        </td>
                    </tr>
 
            </table>
        </form>
    </div>
</div>
    <div id="rodape">
        <?php include 'rodape.php'; ?>
    </div>
</div>
</body>
</html>
 
 