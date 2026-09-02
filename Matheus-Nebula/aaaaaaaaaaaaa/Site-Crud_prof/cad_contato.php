<?php
header("Content-type: text/html;charset=utf-8");
 
// Trazer as variaveis do form
 
$nome = $_POST['nome'];
$email = $_POST['email'];
$assunto = $_POST['assunto'];
$conteudo = $_POST['conteudo'];
 
echo $nome."<br>";
echo $email."<br>";
echo $assunto."<br>";
echo $conteudo."<br>";
 
// Chamando a conexão com o banco
include_once("connect.php");
 
// Criando uma variavel que vai conter o comando mysql para inserir registros
$sql = "INSERT INTO cad_contato (nome,email,assunto,conteudo)
        VALUES('$nome','$email','$assunto','$conteudo')";
 
echo $sql;

$resultado = mysqli_query($link,$sql);