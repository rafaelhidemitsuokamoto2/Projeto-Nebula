<?php
session_start();
var_dump($_SESSION);
?>
<img src="imagens/icon.png" class="logo">
<?php
if ($_SESSION['logado'] != true) { ?>
<a href="form_login.php" class="link_top"> LOGAR </a>
<a href="cliente.php" class="link_top">CADASTRE</a>
<?php 
} else {
  echo "<span style='color:white;float: inline-start;'> Seja bem vindo(a), ".$_SESSION['nome']."</span>";
  echo "<a href='logoff.php' class='link_top'> LOGOFF </a>";
}
?>