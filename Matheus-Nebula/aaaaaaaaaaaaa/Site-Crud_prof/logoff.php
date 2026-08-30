<?php 
echo "Efetuando Logoff";

session_start();
session_destroy(); // Apaga toda a sessão

// Ou remover uma váriavel específica
unset($_SESSION['id']);
unset($_SESSION['nome']);
unset($_SESSION['cep']);

echo "<meta http-equiv='refresh' content='5;URL=\"index.php\"'/>";

?>