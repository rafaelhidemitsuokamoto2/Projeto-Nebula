<?php
// ==========================================================
// callback_google.php
// O Google traz o visitante de volta pra cá depois que ele escolhe
// a conta. Troca o "code" por dados da conta e loga (ou cadastra
// automaticamente, se for a primeira vez).
// ==========================================================

session_set_cookie_params([
    'lifetime' => 0,
    'path'     => '/',
    'httponly' => true,
    'samesite' => 'Lax'
]);
session_start();

include_once(__DIR__ . "/config_google.php");
include_once(__DIR__ . "/../connect_nebula.php");

// Manda de volta pro login com um aviso, e registra o motivo real no log
// (o visitante não precisa ver detalhe técnico)
function falharLogin($motivo) {
    error_log("Login com Google falhou: " . $motivo);
    header('Location: ../login.html?erro=google');
    exit;
}

$codigo         = $_GET['code'] ?? null;
$estadoRecebido = $_GET['state'] ?? null;

// Confere o "code" e o "state" (proteção contra CSRF)
if (!$codigo || !$estadoRecebido
    || !isset($_SESSION['estado_google'])
    || !hash_equals($_SESSION['estado_google'], $estadoRecebido)) {
    falharLogin("state ausente ou não confere");
}

unset($_SESSION['estado_google']); // um "state" só serve uma vez

// ----- Troca o "code" por um access_token (servidor a servidor; o
// client_secret nunca passa pelo navegador do visitante) -----
$ch = curl_init('https://oauth2.googleapis.com/token');
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
    'code'          => $codigo,
    'client_id'     => GOOGLE_CLIENT_ID,
    'client_secret' => GOOGLE_CLIENT_SECRET,
    'redirect_uri'  => GOOGLE_REDIRECT_URI,
    'grant_type'    => 'authorization_code'
]));
curl_setopt($ch, CURLOPT_TIMEOUT, 15);
$respostaToken = curl_exec($ch);
$erroCurl = curl_error($ch);
curl_close($ch);

if ($erroCurl || !$respostaToken) {
    falharLogin("erro de conexão ao trocar o code: " . $erroCurl);
}

$dadosToken  = json_decode($respostaToken, true);
$accessToken = $dadosToken['access_token'] ?? null;

if (!$accessToken) {
    falharLogin("resposta sem access_token: " . $respostaToken);
}

// ----- Busca nome e e-mail da conta Google com o access_token -----
$ch = curl_init('https://www.googleapis.com/oauth2/v3/userinfo');
curl_setopt($ch, CURLOPT_HTTPHEADER, ["Authorization: Bearer {$accessToken}"]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 15);
$respostaPerfil = curl_exec($ch);
curl_close($ch);

$perfil = json_decode($respostaPerfil, true);

$email           = $perfil['email'] ?? null;
$emailVerificado = $perfil['email_verified'] ?? false;
$nome            = $perfil['name'] ?? 'Aluno';
$googleId        = $perfil['sub'] ?? null;

// email_verified=false significa que o próprio Google não confirma que esse
// e-mail pertence à pessoa. Sem isso, não dá pra confiar no e-mail recebido.
if (!$email || !$emailVerificado || !$googleId) {
    falharLogin("perfil incompleto ou e-mail não verificado");
}

// ----- NOVO: e-mail de professor ou do suporte NÃO entra pelo Google -----
// Este arquivo cadastra automaticamente quem ainda não existe em "usuarios". Sem esta
// checagem, o e-mail de um professor/suporte ganharia também uma conta de aluno.
// Professores e suporte entram só pelo e-mail e senha (login-acao-nebula.php).
$stmt = mysqli_prepare($link, "
    SELECT 1 FROM prof_login WHERE email = ?
    UNION
    SELECT 1 FROM suporte_login WHERE email = ?
");
mysqli_stmt_bind_param($stmt, "ss", $email, $email);
mysqli_stmt_execute($stmt);
mysqli_stmt_store_result($stmt);
$ehEquipe = mysqli_stmt_num_rows($stmt) > 0;
mysqli_stmt_close($stmt);

if ($ehEquipe) {
    // O motivo real vai só para o log; o visitante vê o aviso genérico de erro do Google
    falharLogin("e-mail de professor/suporte não pode usar o login do Google");
}

// A conta já existe (por e-mail, ou já logou com esse Google antes)?
$stmt = mysqli_prepare($link, "SELECT id_usuarios, nome FROM usuarios WHERE email = ? OR google_sub = ?");
mysqli_stmt_bind_param($stmt, "ss", $email, $googleId);
mysqli_stmt_execute($stmt);
$usuario = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));
mysqli_stmt_close($stmt);

if ($usuario) {

    // Conta já existia. Garante o google_sub salvo, pra próxima vez ser direto.
    $stmt = mysqli_prepare($link, "UPDATE usuarios SET google_sub = ? WHERE id_usuarios = ?");
    mysqli_stmt_bind_param($stmt, "si", $googleId, $usuario['id_usuarios']);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    $idUsuario = $usuario['id_usuarios'];
    $nomeFinal = $usuario['nome'];

} else {

    // Conta nova: cadastro automático. Como o login sempre será pelo Google,
    // grava um hash aleatório impossível de adivinhar, só pra respeitar a
    // coluna "senha" (que é NOT NULL na tabela).
    $senhaAleatoria = password_hash(bin2hex(random_bytes(32)), PASSWORD_DEFAULT);

    $stmt = mysqli_prepare($link, "
        INSERT INTO usuarios (nome, email, senha, google_sub) VALUES (?, ?, ?, ?)
    ");
    mysqli_stmt_bind_param($stmt, "ssss", $nome, $email, $senhaAleatoria, $googleId);
    mysqli_stmt_execute($stmt);
    $idUsuario = mysqli_insert_id($link);
    mysqli_stmt_close($stmt);

    $nomeFinal = $nome;

}

session_regenerate_id(true);
$_SESSION['nome']        = $nomeFinal;
$_SESSION['logado']      = true;
$_SESSION['id_usuarios'] = $idUsuario;

// NOVO: marca o tipo da conta (quem entra pelo Google é sempre aluno).
// As páginas restritas passam a conferir $_SESSION['tipo'].
$_SESSION['tipo']        = 'aluno';

// NOVO: passa 2 segundos pela tela de carregamento e depois vai para o início do aluno.
// "../" sobe da pasta entrar_google/ até a raiz, onde está a tela de carregamento;
// o "destino" é relativo a ela (a raiz), por isso é só o nome do arquivo.
// (Antes: header('Location: ../portal_aluno.php');)
header('Location: ../tela-de-carregamento.html?destino=' . urlencode('aluno_inicio.html'));
exit;