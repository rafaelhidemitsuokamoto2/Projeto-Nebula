<?php
header("Content-type: application/json;charset=utf-8");

include_once(__DIR__ . "/../connect_nebula.php");

// Tamanho mínimo da senha (ajuste se quiser)
const SENHA_MINIMA = 6;

// Sempre inclui "campo" (nome/email/senha/confirmar_Senha) quando o erro é
// de um campo específico. O JS usa isso pra mostrar a mensagem no lugar certo.
function responderErro($mensagem, $campo = null) {
    echo json_encode(["sucesso" => false, "erro" => $mensagem, "campo" => $campo]);
    exit;
}

$nome      = trim($_POST['nome'] ?? '');
$email     = trim($_POST['email'] ?? '');
$senha     = $_POST['senha'] ?? '';
$confirmar = $_POST['confirmar_Senha'] ?? '';

// ----- Validações no servidor (o JS do front já valida, mas nunca confie só nele) -----
if ($nome === '' || $email === '' || $senha === '' || $confirmar === '') {
    responderErro("Preencha todos os campos!");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responderErro("E-mail inválido!", "email");
}

if (strlen($senha) < SENHA_MINIMA) {
    responderErro("A senha precisa ter pelo menos " . SENHA_MINIMA . " caracteres!", "senha");
}

if ($senha !== $confirmar) {
    responderErro("As senhas não conferem!", "confirmar_Senha");
}

// ----- E-mail já cadastrado? -----
// NOVO: confere também as tabelas de professores e do suporte. Assim ninguém consegue
// se cadastrar como aluno usando o e-mail de um professor/suporte (nem "reservar" um
// e-mail que o suporte ainda vai cadastrar). A mensagem é a mesma nos três casos, para
// não revelar quais e-mails pertencem à equipe.
$stmt = mysqli_prepare($link, "
    SELECT 1 FROM usuarios WHERE email = ?
    UNION
    SELECT 1 FROM prof_login WHERE email = ?
    UNION
    SELECT 1 FROM suporte_login WHERE email = ?
");
mysqli_stmt_bind_param($stmt, "sss", $email, $email, $email);
mysqli_stmt_execute($stmt);
mysqli_stmt_store_result($stmt);
$jaExiste = mysqli_stmt_num_rows($stmt) > 0;
mysqli_stmt_close($stmt);

if ($jaExiste) {
    responderErro("Este e-mail já está cadastrado!", "email");
}

// ----- Grava com a senha protegida por hash (nunca em texto puro) -----
$hash = password_hash($senha, PASSWORD_DEFAULT);

// Prepared statement: nome/e-mail digitados nunca viram parte do SQL
$stmt = mysqli_prepare($link, "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
mysqli_stmt_bind_param($stmt, "sss", $nome, $email, $hash);

if (mysqli_stmt_execute($stmt)) {
    mysqli_stmt_close($stmt);
    echo json_encode(["sucesso" => true]);
    exit;
}

error_log("Erro ao cadastrar: " . mysqli_stmt_error($stmt));
mysqli_stmt_close($stmt);
responderErro("Erro ao cadastrar. Tente novamente.");