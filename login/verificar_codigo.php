<?php
header("Content-type: application/json;charset=utf-8");

session_set_cookie_params([
    'lifetime' => 0,
    'path'     => '/',
    'httponly' => true,
    'samesite' => 'Lax'
]);
session_start();

include_once(__DIR__ . "/../connect_nebula.php");

const CODIGO_MAX_TENTATIVAS = 5;

function responderErro($mensagem, $campo = null) {
    echo json_encode(["sucesso" => false, "erro" => $mensagem, "campo" => $campo]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    responderErro("Método inválido");
}

$email  = trim($_POST['email'] ?? '');
$codigo = trim($_POST['codigo'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || $codigo === '') {
    responderErro("Digite o código recebido por e-mail.", "codigo");
}

$stmt = mysqli_prepare($link, "
    SELECT id, codigo_hash, tentativas, expira_em
    FROM login_codigos
    WHERE email = ? AND usado = 0
    ORDER BY criado_em DESC
    LIMIT 1
");
mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);
$registro = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));
mysqli_stmt_close($stmt);

if (!$registro) {
    responderErro("Nenhum código pendente. Peça um novo.", "codigo");
}

if (strtotime($registro['expira_em']) < time()) {
    responderErro("Esse código expirou. Peça um novo.", "codigo");
}

if ($registro['tentativas'] >= CODIGO_MAX_TENTATIVAS) {
    responderErro("Muitas tentativas com esse código. Peça um novo.", "codigo");
}

if (!password_verify($codigo, $registro['codigo_hash'])) {

    $stmt = mysqli_prepare($link, "UPDATE login_codigos SET tentativas = tentativas + 1 WHERE id = ?");
    mysqli_stmt_bind_param($stmt, "i", $registro['id']);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    responderErro("Código incorreto.", "codigo");

}

// Código certo: marca como usado (não dá pra reaproveitar) e loga o visitante
$stmt = mysqli_prepare($link, "UPDATE login_codigos SET usado = 1 WHERE id = ?");
mysqli_stmt_bind_param($stmt, "i", $registro['id']);
mysqli_stmt_execute($stmt);
mysqli_stmt_close($stmt);

// NOTA: o login por código de e-mail continua sendo SÓ para alunos, por isso a busca
// segue apenas na tabela "usuarios". Professores e suporte entram com e-mail e senha
// (login-acao-nebula.php).
$stmt = mysqli_prepare($link, "SELECT id_usuarios, nome FROM usuarios WHERE email = ?");
mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);
$usuario = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));
mysqli_stmt_close($stmt);

if (!$usuario) {
    responderErro("Não foi possível concluir o login.", "codigo");
}

session_regenerate_id(true);
$_SESSION['nome']        = $usuario['nome'];
$_SESSION['logado']      = true;
$_SESSION['id_usuarios'] = $usuario['id_usuarios'];

// NOVO: marca o tipo da conta. As páginas restritas passam a conferir $_SESSION['tipo'],
// então quem entra por código precisa ter esse valor também (aqui é sempre 'aluno').
$_SESSION['tipo']        = 'aluno';

echo json_encode(["sucesso" => true]);