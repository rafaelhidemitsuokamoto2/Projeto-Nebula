<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - FTAN</title>

    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet"href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css">

    <style>

body {
font-family: Arial, Helvetica, sans-serif;
background: #050912;
overflow: hidden;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
}

.botao-sair {
  width: 110px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-decoration: none;
  border: 1px solid rgba(255, 255, 255, .45);
  border-radius: 18px;
  transition: .3s;
}

.botao-sair:hover {
  background: rgba(255, 255, 255, .08);
}

.tela-login {
background: transparent;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
padding: 0;
border-radius: 0;
display:flex;
align-items:center;
gap:95px;
color: white;
}

input{
width:280px;
font-size:12px;
padding:12px;
background:transparent;
border:1px solid rgba(255,255,255,.7);
color:white;
text-align:center;
outline:none;
/* Efeito de luzinha */
transition: .3s;
}
/* Efeito de luzinha parte 2 */
input:focus{
    border-color:#E7B6E6;
    box-shadow:
        0 0 8px rgba(231,182,230,.35),
        0 0 18px rgba(197,117,204,.2);
}

input::placeholder{
    color:#d6d6d6;
}

.botao-logar{
width:305px;
padding:12px;
background:transparent;
color:rgb(150, 97, 146);
border:1px solid rgb(197, 117, 204);
transition:all .35s ease;
}

.botao-logar:hover{
cursor:pointer;
color:white;
background:rgba(179, 84, 255, .12);
border-color:#d57fff;
box-shadow:
0 0 8px rgba(197,117,204,.5),
0 0 20px rgba(197,117,204,.35),
0 0 35px rgba(197,117,204,.2);
}

.nebula {
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
object-fit: cover;
opacity: 0.20;
z-index: -1;
}

.lado-esquerdo{
    display:flex;
    align-items:center;
}


.ftan-frase{
    width:250px;
    margin-top: 90px;
}

.linha-login{
    width:2px;
    height:240px;
    background:#E7B6E6;
    margin-top: 90px;
    opacity:.7;
}

.lado-direito{
    display:flex;
    flex-direction:column;
    gap:28px;
}

.logo-login{
    width:110px;
    cursor:pointer;
    /* Faz a logo dar uma subidinha */
    transition:.35s;
}

/* Faz a logo dar uma subidinha parte 2*/
.logo-login:hover{
    transform:scale(1.05);
}
.titulo-login{
    color:#E7B6E6;
    font-size:45px;
    font-weight:bold;  
    font-family: "Sora", sans-serif;
    text-align:center;
    margin-bottom:25px;
}

.campo-senha{
    position: relative;
    width:305px;
}

.campo-senha input{
    width:100%;
    padding:12px;
    padding-right:45px;
    padding-left:45px;
    box-sizing:border-box;
}
.esqueci-senha{
    width:305px;
    text-align:right;

    margin-top:-18px;
    margin-bottom:-12px;

    font-size:14px;
}
.esqueci-senha a{
    color:#d6d6d6;
    text-decoration:underline;
    text-underline-offset:3px;
    text-decoration-thickness:1px;
    transition:.3s;
}

.esqueci-senha a:hover{
    color:#E7B6E6;
}

.olho{
    position:absolute;
    right:15px;
    top:50%;
    transform:translateY(-50%);
    cursor:pointer;
    color:#d6d6d6;
    transition:.3s;
}

.olho:hover{
    color:#E7B6E6;
}

    </style>
</head>
<body>
    <header>
    <a href="Home.php">
        <img src="logo-ucen.png" class="logo-login" alt="FTAN">
    </a>
    <a href="Home.php" class="botao-sair">
        Sair
    </a>
    </header>

    <div class="tela-login">
    <div class="lado-esquerdo">
    <img src="ftan-frase-logar.png" class="ftan-frase">
    </div>
    <div class="linha-login"></div>

    <!-- Isso (form) diz para o navegador que é um formulario, visualmente nada muda, mas assim fica mais 
    facil no futuro para JS e PHP -->
    <form class="lado-direito" action="login-acao-nebula.php" method="post" autocomplete="on">
    <h1 class="titulo-login">Login</h1>

    <!-- MUITO importante colocar "name", pois assim o PHP localiza, se não tiver em algo, me alerte -->
    <input type="email" id="usuario" name="usuario" autocomplete="username" placeholder="E-mail">

    <div class="campo-senha">
    <input type="password" autocomplete="current-password" id="senha" name="senha" placeholder="Senha">

    <span class="olho" id="icone-olho">
        <i class="fa-regular fa-eye"></i>
    </span>
    </div>
    <p class="esqueci-senha">
    <a href="#">Esqueceu sua senha?</a></p>

    <!-- Type "submit" faz enviar com Enter e é importante para o php -->
    <input class="botao-logar" name="submit" type="submit" value="Logar">
    </form>

    </div>

    <section>
    
    <img src="fundo-nebula-pequena.jpg" class="nebula" alt="fundo-estelar">

    </section>

<script>

// Código de olho
const senha = document.getElementById("senha");
const olho = document.getElementById("icone-olho");

olho.addEventListener("click", function(){

    if(senha.type === "password"){

        senha.type = "text";

        olho.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';

    }else{

        senha.type = "password";

        olho.innerHTML = '<i class="fa-regular fa-eye"></i>';
    }

});

</script>

</body>
</html>