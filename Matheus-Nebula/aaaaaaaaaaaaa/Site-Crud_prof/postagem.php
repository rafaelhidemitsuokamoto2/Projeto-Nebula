<!DOCTYPE html>
<html lang="pt-BR">
<head>
	<meta charset="utf-8">
	<title> Criando site em php </title>
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
		include 'menu.php'; ?>
	</div>

	<div id="conteudo">
		
		<?php
		include 'conteudo_postagem.php'; ?>
	</div>

    <div id="rodape">
        <?php
        include 'rodape.php';
        ?>
    </div>

</div> <!-- fim da div geral -->

<script src="https://unpkg.com/scrollreveal"></script>

<script>
    ScrollReveal().reveal('#conteudo', {
        duration: 1000,
        distance: '50px',
        origin: 'bottom',
        opacity: 0,
        easing: 'ease-in-out',
        reset: false
    });
</script>

</body>
</html>

</body>
</html>