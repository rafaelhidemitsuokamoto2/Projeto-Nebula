<?php
header("Content-type: text/html;charset=utf-8");
 
// Trazer as variaveis do form
 
$email = $_POST['email'];
$senha = $_POST['senha'];
 
echo $email."<br>";
echo $senha."<br>";
 
// Chamando a conexão com o banco
include_once("connect.php");
 
// Criando uma variavel que vai conter o comando mysql para inserir registros
$sql = "SELECT `id_usuarios`, `nome`, `email`, `senha`, `telefone`, `cpf`, `dataNascimento`, `dataCadastro`, `status` FROM `usuarios` WHERE email = '$email' AND senha = '$senha'";

echo $sql;
$result = mysqli_query($link, $sql);
/*echo "<pre>";
var_dump($result);
echo "<prev">;*/
foreach ($result as $value) {
        /* echo "<pre>";
        var_dump($value);
        echo "</pre>"; */
        $id = $value['id_usuarios'];
        $nome = $value['nome'];
}
if ($id > 0) {
        session_start();
        $_SESSION['nome'] = $nome;
        $_SESSION['logado'] = true;
        $_SESSION['id'] = $id;
        echo "Usuário autenticado! Redirecionando para a Home!<br>";
        var_dump($_SESSION);
        echo '<meta http-equiv="refresh" content="3; url=http://localhost/Matheus/Site-Crud_prof/index.php">';
} else {
        echo "Usuário ou senha incorretos, tente novamente!";
        echo '<meta http-equiv="refresh" content="3; url=http://localhost/Matheus/Site-Crud_prof/form_login.php?logado=error">';
}
?>