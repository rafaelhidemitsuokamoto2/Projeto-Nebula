<!DOCTYPE html>
<html lang="pt-BR">
<?php include_once("connect.php");

$sql = "SELECT `id`, `nome`, `descricao`, `imagem`, `status`, `dataCriacao`, `data_at` FROM `postagens` ORDER BY `id` DESC";
$resultado = mysqli_query($link, $sql);

$html = "";
$html .= "<div style='height: 36px; padding-top: 15px;'><a href=\"regPostagens.php\" style='background: blue; color: white; padding: 10px; border-radius: 19px; text-transform: uppercase; text-decoration: none;'>Novo Registro</a></div>";

$html .= "<table border=1 style='width:100%; text-align:center;'><tr><td>ID</td><td>Nome</td><td>Descrição</td><td>Imagem</td><td>Status</td><td>Data Criação</td><td>Última Atualização</td><td>Ação</td></tr>";

foreach ($resultado as $rs) {

    $nome        = htmlspecialchars($rs['nome'], ENT_QUOTES, 'UTF-8');
    $descricao   = htmlspecialchars($rs['descricao'], ENT_QUOTES, 'UTF-8');
    $imagem      = $rs['imagem'];
    $status      = ($rs['status'] == 1) ? 'Ativo' : 'Inativo';
    $dataCriacao = $rs['dataCriacao'];
    $data_at     = $rs['data_at'];

    // Monta a tag de imagem se houver um caminho salvo
    if (!empty($imagem) && file_exists($imagem)) {
        $tagImagem = "<img src='".$imagem."' style='width: 60px; height: 60px; object-fit: cover; border-radius: 5px;'>";
    } else if (!empty($imagem)) {
        $tagImagem = "<img src='".$imagem."' style='width: 60px; height: 60px; object-fit: cover; border-radius: 5px;'>";
    } else {
        $tagImagem = "<span style='color:#888;'>Sem foto</span>";
    }

    $html .= "<tr id='registro-".$rs['id']."'>
        <td>".$rs['id']."</td>
        <td>".$nome."</td>
        <td>".$descricao."</td>
        <td>".$tagImagem."</td>
        <td>".$status."</td>
        <td>".$dataCriacao."</td>
        <td>".$data_at."</td>
        <td>
            <a href='regPostagens.php?id=".$rs['id']."'><img src='imagens/editar.png' style='width:15px;' title='Editar'></a> / 
            <img src='imagens/excluir.png' style='width:15px; cursor:pointer;' title='Excluir' onclick='deletar(".$rs['id'].");' />
        </td>
    </tr>";
}

$html .= "</table>";
?>

<head>
    <meta charset="utf-8">
    <title>Cadastro de Postagens</title>
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
            <?php echo $html; ?>

            <script>
            function deletar(id) {
                if (!confirm("Tem certeza que deseja deletar este registro?")) return;

                fetch('deletar.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'id=' + encodeURIComponent(id) + '&acao=deletarPostagens'
                })
                .then(response => response.text())
                .then(data => {
                    if (data.trim() === "sucesso") {
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
</div> </body>
</html>