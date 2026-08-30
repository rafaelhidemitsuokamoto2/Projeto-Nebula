<?php
header("Content-type: text/html;charset=utf-8");
session_start(); // precisa vir antes de qualquer output, no topo do arquivo

$email = $_POST['usuario']; // nome certo do campo
$senha = $_POST['senha'];

include_once("connect_nebula.php");

$sql = "SELECT `id_usuarios`, `nome`, `email`, `senha` FROM `usuarios` WHERE email = '$email' AND senha = '$senha'";
$result = mysqli_query($link, $sql);

$id = 0;
$nome = "";

foreach ($result as $value) {
    $id = $value['id_usuarios'];
    $nome = $value['nome'];
}

if ($id > 0) {
    $_SESSION['nome'] = $nome;
    $_SESSION['logado'] = true;
    $_SESSION['id_usuarios'] = $id;
    echo "Usuário autenticado! Redirecionando para o Portal do Aluno!<br>";
    echo '<meta http-equiv="refresh" content="3; url=http://localhost/Matheus/aaaaaaaaaaaaa/Nebula/portal_aluno.php">';
} else {
    echo "Usuário ou senha incorretos, tente novamente!";
    echo '<meta http-equiv="refresh" content="3; url=http://localhost/Matheus/aaaaaaaaaaaaa/Nebula/login.php?logado=error">';
}
?>