<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contato</title>

     
<link rel="stylesheet" type="text/css" href="css_contato.css">
 
<div id="conteudo_principal">
    <h1 class="titulos"> CONTATO  </h1>
    <div class="postagens">
        <h1 class="titulos"> </h1>
 
   
            <form action="cad_contato.php" method="post">
                <label class="legenda">NOME :</label><br>
                <input type="text" name="nome" class="campos" placeholder="Preencha este campo com seu nome" required><br>
 
                <label class="legenda">EMAIL :</label><br>
                <input type="email" name="email" class="campos" placeholder="Digite seu email aqui" required><br>
 
                <label class="legenda">ASSUNTO :</label><br>
                <input type="text" name="assunto" class="campos" placeholder="Sobre o que você deseja falar ?" required><br>
 
                <label class="legenda">CONTEUDO :</label><br>
                <textarea name="conteudo" class="campo2" placeholder="Digite em no maximo 140 caracteres o conteudo" maxlength="140" required></textarea><br>
 
                <input type="submit" value="ENVIAR" class="bt_enviar">
            </form>
    </div>
 
    <!--<div class="postagens">
        <h1 class="titulos"> TITULOS DA POSTAGEM </h1>
        <img src="imagens/postagem.jpg" class="imagem">
        <p class="paragrafo">Paragrafo</p>
        <span class="data">10/03/2018</span>
    </div>
    -->
 
 
</div>
 
<div id="recentes">
    <h1 class="titulos">Recentes</h1>
    <div class="postagens_recentes">
        <h1 class="titulos"><a href="#">   Titulo dos arquivos recentes</a></h1>
        <span class="data"> 11/03/2018</span>
    </div>
</div>
 