<!DOCTYPE html>
<html lang="pt-BR">
    <?php include_once("connect.php"); ?>
<head>
    <meta charset="UTF-8">
    <title> Painel Principal </title>
    <link rel="stylesheet" type="text/css" href="estilo.css">
</head>
<body>
<div id="geral">
        <div id="topo">
            <?php include 'topo.php'; ?>
        </div>
        <div id="menu">
            <?php include 'menu.php' ?>
        </div>
        <div id="conteudo">
<center>Painel Principal</center>
<div><a href="usuarios.php"><button>Cadastro de Pessoa</button></a></div>
<div><a href="cadPostagens.php"><button>Cadastro de Postagem</button></a></div>
<div><a href="cadScript.php"><button>Cadastro de Script</button></a></div>
<div><a href="cadContatos.php"><button>Cadastro de Contatos</button></a></div>
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