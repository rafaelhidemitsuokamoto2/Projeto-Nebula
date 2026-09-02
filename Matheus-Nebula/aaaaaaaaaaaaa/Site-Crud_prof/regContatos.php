<!DOCTYPE html>
<html lang="pt-BR">
<?php
include_once("connect.php");
error_reporting(0);
$id = isset($_GET['id']) ? (int) $_GET['id'] : 0; 
$nome = "";
$email = "";
$status = 1;
$dataCriacao = date("Y-m-d");
$sql = "SELECT `id`, `nome`, `email`, `status`, `dataCriacao` FROM `cad_contato` WHERE `id` = " .$id;
$resultado = mysqli_query($link, $sql);
if ($resultado) {
    foreach ($resultado as $rs) {
        $nome = $rs['nome'];
        $email = $rs['email'];
        $status = $rs['status'];
        $dataCriacao = $rs['dataCriacao'];
    }
}
?>
<head>
    <meta charset="utf-8">
    <title>Cadastro de Contatos</title>
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
        <!-- Tirei o (<h1>Cadastro de Contatos</h1>) daqui, pois assim dá para movê-lo junto dos inputs -->
        <div id="cadastro">
            <h1>Cadastro de Contatos</h1>
            <form method="post" action="atualiza_contatos.php">
                <input type="hidden" name="id" value="<?php echo $id; ?>">
                <table>
                    <tr>
                        <td id="texto">Nome:</td>
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
                        <td>E-mail:</td>
                        <td>
                            <input
                                type="email"
                                name="email"
                                maxlength="150"
                                value="<?php echo htmlspecialchars($email, ENT_QUOTES, 'UTF-8'); ?>"
                                class="txt"
                                required
                            >
                        </td>
                    </tr>
                    <tr>
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
                    <td>
                        <input type="submit" value="Enviar" class="bt_enviar">
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