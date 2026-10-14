<?php
header("Content-type: application/json;charset=utf-8");

// Cookie da sessão (PHPSESSID) mais protegido. Precisa vir ANTES do session_start()
session_set_cookie_params([
    'lifetime' => 0,
    'path'     => '/',
    'httponly' => true,
    'samesite' => 'Lax'
]);
session_start();

include_once(__DIR__ . "/../connect_nebula.php");

function responderErro($mensagem, $campo = null) {
    echo json_encode(["sucesso" => false, "erro" => $mensagem, "campo" => $campo]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    responderErro("Método inválido");
}

$email = trim($_POST['usuario'] ?? '');
$senha = $_POST['senha'] ?? '';

if ($email === '' || $senha === '') {
    responderErro("Preencha e-mail e senha.");
}

// ==========================================================
// NOVO: os três tipos de conta que podem entrar por aqui.
// Esta lista é fixa (não vem do visitante), por isso é seguro usar os
// nomes de tabela/coluna dela dentro do SQL.
//   - destino: página para onde o login.html manda a pessoa (relativa à raiz)
//   - legado:  aceita senha antiga em texto puro e converte para hash
//              (só existe nos alunos; professor/suporte já nascem com hash)
//   - tem_ativo: a tabela tem a coluna "ativo" (conta desativada não entra)
// ==========================================================
$TIPOS_DE_CONTA = [
    ['tabela' => 'usuarios',      'coluna_id' => 'id_usuarios', 'tipo' => 'aluno',     'destino' => 'aluno_inicio.html',   'legado' => true,  'tem_ativo' => false],
    ['tabela' => 'prof_login',    'coluna_id' => 'id_prof',     'tipo' => 'professor', 'destino' => 'professor_inicio.html',    'legado' => false, 'tem_ativo' => true],
    ['tabela' => 'suporte_login', 'coluna_id' => 'id_suporte',  'tipo' => 'suporte',   'destino' => 'suporte_inicio.html', 'legado' => false, 'tem_ativo' => true],
];

$contaEncontrada = null;
$dadosConta      = null;

foreach ($TIPOS_DE_CONTA as $conta) {

    $colunaAtivo = $conta['tem_ativo'] ? ", ativo" : "";

    // Prepared statement: o e-mail digitado nunca vira parte do SQL
    $stmt = mysqli_prepare($link, "SELECT {$conta['coluna_id']} AS id, nome, senha{$colunaAtivo} FROM {$conta['tabela']} WHERE email = ?");
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
    $linha = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));
    mysqli_stmt_close($stmt);

    if (!$linha) continue;                                   // e-mail não existe nesta tabela
    if ($conta['tem_ativo'] && !$linha['ativo']) continue;   // conta desativada: trata como inexistente

    $senhaSalva = $linha['senha'];
    $autenticado = false;

    if (password_verify($senha, $senhaSalva)) {

        // Senha correta, já guardada com hash
        $autenticado = true;

    } elseif ($conta['legado'] && empty(password_get_info($senhaSalva)['algo']) && hash_equals($senhaSalva, $senha)) {

        // Conta antiga, com senha em texto puro (só vale se o valor salvo NÃO for um hash).
        // Entra desta vez e já é convertida para hash logo abaixo.
        $autenticado = true;

    }

    if (!$autenticado) continue;

    // Converte para hash (texto puro -> hash) ou atualiza hash antigo
    if (password_needs_rehash($senhaSalva, PASSWORD_DEFAULT)) {

        $novoHash = password_hash($senha, PASSWORD_DEFAULT);

        $stmt = mysqli_prepare($link, "UPDATE {$conta['tabela']} SET senha = ? WHERE {$conta['coluna_id']} = ?");
        mysqli_stmt_bind_param($stmt, "si", $novoHash, $linha['id']);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);

    }

    $contaEncontrada = $conta;
    $dadosConta      = $linha;
    break;

}

if (!$contaEncontrada) {
    // Mensagem genérica: não diz se foi o e-mail ou a senha que errou
    responderErro("Usuário ou senha incorretos, tente novamente!");
}

// Novo ID de sessão ao logar (evita "session fixation")
session_regenerate_id(true);

$_SESSION['logado'] = true;
$_SESSION['nome']   = $dadosConta['nome'];
$_SESSION['tipo']   = $contaEncontrada['tipo'];   // NOVO: 'aluno', 'professor' ou 'suporte'

// Cada tipo guarda o próprio id (as páginas do aluno continuam usando id_usuarios)
if ($contaEncontrada['tipo'] === 'aluno')     $_SESSION['id_usuarios'] = $dadosConta['id'];
if ($contaEncontrada['tipo'] === 'professor') $_SESSION['id_prof']     = $dadosConta['id'];
if ($contaEncontrada['tipo'] === 'suporte')   $_SESSION['id_suporte']  = $dadosConta['id'];

// NOVO: devolve também o destino, para o login.html saber pra onde mandar
echo json_encode(["sucesso" => true, "destino" => $contaEncontrada['destino']]);