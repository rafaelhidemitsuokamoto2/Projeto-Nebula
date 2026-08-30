<?php
include_once("connect.php");
$id = $_POST['id'];
 
// Deleta os contatos
if ($_POST['acao'] == 'deletarContato') {
    if ($id > 0) {  
        $sql = "DELETE FROM `cad_contato` WHERE id=".$id;
        // echo $sql;
        $resultado = mysqli_query($link,$sql);
    }
 
// Deleta os usuários
} elseif ($_POST['acao'] == 'deletarUsuarios') {
    if ($id > 0) {
        $sql = "DELETE FROM `usuarios` WHERE id=".$id;
        $resultado = mysqli_query($link,$sql);
    }
 
// Deleta os postagens
} elseif ($_POST['acao'] == 'deletarPostagens') {
    if ($id > 0) {
        $sql = "DELETE FROM `postagens` WHERE id=".$id;
        $resultado = mysqli_query($link,$sql);
    }
 
// Deleta os scripts
} elseif ($_POST['acao'] == 'deletarScript') {
    if ($id > 0) {
        $sql = "DELETE FROM `script` WHERE id=".$id;
        $resultado = mysqli_query($link,$sql);
    }
}
echo "sucesso";
echo '<meta http-equiv="refresh" content="3; url=http://localhost/Matheus/Site-Crud_prof/painel.php">';
?>
 