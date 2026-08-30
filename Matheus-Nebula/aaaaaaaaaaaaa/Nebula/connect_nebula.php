<?php header("Content-type: text/html;charset=utf-8");

    $host = "localhost";
    $user = "root";
    $pass = "";
    $db = "faculdade_nebula";

    $link = mysqli_connect($host,$user,$pass,$db);
    $banco = mysqli_connect_errno();

    if($banco == true) {
        die("Erro na conexão: " . mysqli_connect_error());
    }

    // O $mysqli_connect já devolve um objeto mysqli, então dá pra usar
    // esse mesmo objeto tanto no estilo procedural (mysqli_query($link, ...))
    // quanto no estilo orientado a objeto ($mysqli->query(...), usado no home.php).
    // Antes o $mysqli nunca era criado aqui, então home.php quebrava.
    $mysqli = $link;

?>
<?php
/*
$host = "localhost";
$db = "faculdade_nebula";
$user = "root";
$pass = "";
$mysqli = new mysqli($host, $user, $pass, $db);
if ($mysqli->connect_errno) {
    die("Falha na conexão com o banco de dados");
    }
*/