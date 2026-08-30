<?php
header("Content-type: text/html;charset=utf-8");
 
// Trazer as variaveis do form
 
$nome = $_POST['nome'];
$email = $_POST['email'];
$senha = $_POST['senha'];
$telefone = $_POST['telefone'];
$cpf = $_POST['cpf'];
$dataNascimento = $_POST['dataNascimento'];
$genero = $_POST['genero'];
 
echo $nome."<br>";
echo $email."<br>";
echo $senha."<br>";
echo $telefone."<br>";
echo $cpf."<br>";
echo $dataNascimento."<br>";
echo $genero."<br>";
 
// Chamando a conexão com o banco
include_once("connect.php");
 
// Criando uma variavel que vai conter o comando mysql para inserir registros
$sql = "INSERT INTO usuarios (nome,email,senha,telefone,cpf,dataNascimento,genero)
        VALUES('$nome','$email','$senha','$telefone','$cpf','$dataNascimento','$genero')";
 
echo $sql;

$resultado = mysqli_query($link,$sql);

