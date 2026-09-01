<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8">
	<title>Criando site em PHP </title>
	<link rel="stylesheet" type="text/css" href="estilo.css">

</head>
<body>


	<div id="geral">
		

	
	<div id="topo">

		<?php

		include 'topo.php';


		?>
	</div>

	<div id="menu">
		
		<?php
		include 'menu.php';


		?>
	</div>

	<div id="conteudo">
		<div class="container-login">
		
		<form action="login_acao.php" method="post">
 
                <label class="legenda">E-mail :</label><br>
                <input type="email" name="email" class="campos" placeholder="Digite seu E-mail aqui" required><br>

				<label class="legenda">Senha :</label><br>
                <input type="password" name="senha" class="senha_login" placeholder="Digite sua senha aqui" required><br>
 
                <input type="submit" value="ENVIAR" class="bt_enviar">
            </form>
        </div>
	</div>

	<div id="rodape">
		
	    <?php
		include 'rodape.php';


		?>
	</div>

</div>  <!-- fim da div geral -->

</body>
</html>