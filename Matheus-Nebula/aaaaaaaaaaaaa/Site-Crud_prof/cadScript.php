    <!DOCTYPE html>
<html lang="pt-BR">
<?php include_once("connect.php");
 
$sql = "SELECT `id`, `nome`, `descricao`, `script`, `status`, `dataCriacao`, `data_at` FROM `script` WHERE 1";
//echo $sql;
 
$resultado = mysqli_query($link, $sql);
//var_dump($resultado);
 
$html = "";
$html .= "<div style='height: 36px;padding-top: 15px;'><a href=\"regScript.php\" style='background: blue;color: white;padding: 10px;border-radius: 19px;text-transform: uppercase'>Novo Registro</a></div>";
 
$html .= "<table border=1><tr><td>ID</td><td>Nome</td><td>Descrição</td><td>Script</td><td>Status</td><td>dataCriacao</td><td>Ultima Atualização</td><td>Ação</td></tr>";
 
foreach ($resultado as $rs) {
 
    $nome = $rs['nome'];
    $descricao = $rs['descricao'];
    $script = $rs['script'];
    $status = $rs['status'];
    $dataCriacao = $rs['dataCriacao'];
    $data_at = $rs['data_at'];
    //var_dump($rs);
 
    $html .= "<tr id='registro-".$rs['id']."'><td>".$rs['id']."</td><td>".$nome."</td><td>".$descricao."</td><td>".$script."</td><td>".$status."</td><td>".$dataCriacao."</td><td>".$data_at."</td><td><a href='regScript.php?id=".$rs['id']."'><img src='imagens/editar.png' style='width:15px;'></a> / <img src='imagens/excluir.png' style='width:15px;' onclick='deletar(".$rs['id'].");' /></td></tr>";
}
 
$html .= "</table>";
?>
 
<head>
    <meta charset="utf-8">
    <title>Cadastro de Script</title>
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
        <h1>Cadastro de Script</h1>
        <div id="cadastro">
            <?php echo $html; ?>
 
            <script>
function deletar(id) {
    if (!confirm("Tem certeza que deseja deletar este registro?")) return;
 
    fetch('deletar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'id=' + encodeURIComponent(id) + '&acao=deletarScript'
    })
    .then(response => response.text())
    .then(data => {
        if (data === "sucesso") {
            alert("Registro deletado com sucesso!");
            document.getElementById('registro-' + id).remove();
        } else {
            alert("Erro ao deletar: " + data);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
            </script>
 
        </div>
    </div>
 
    <div id="rodape">
        <?php include 'rodape.php'; ?>
    </div>
</div> <!-- fim da div geral -->
</body>
</html>