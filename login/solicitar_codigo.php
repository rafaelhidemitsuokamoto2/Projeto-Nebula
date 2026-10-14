<?php
header("Content-type: application/json;charset=utf-8");

include_once(__DIR__ . "/../connect_nebula.php");
include_once(__DIR__ . "/../mailer.php");

// Quanto tempo o código vale, e o intervalo mínimo entre dois pedidos
// pro mesmo e-mail (evita spam de envio / abuso do seu Gmail)
const CODIGO_VALIDADE_MINUTOS   = 10;
const CODIGO_INTERVALO_SEGUNDOS = 60;

function responderErro($mensagem, $campo = null) {
    echo json_encode(["sucesso" => false, "erro" => $mensagem, "campo" => $campo]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    responderErro("Método inválido");
}

$email = trim($_POST['email'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    responderErro("Digite um e-mail válido.", "email");
}

// Existe uma conta com esse e-mail? (usado só pra decidir se manda o
// e-mail de verdade; a resposta ao visitante é igual nos dois casos)
$stmt = mysqli_prepare($link, "SELECT id_usuarios, nome FROM usuarios WHERE email = ?");
mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);
$usuario = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));
mysqli_stmt_close($stmt);

// Já pediu um código há pouco tempo?
$stmt = mysqli_prepare($link, "
    SELECT criado_em FROM login_codigos
    WHERE email = ? ORDER BY criado_em DESC LIMIT 1
");
mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);
$ultimoPedido = mysqli_fetch_assoc(mysqli_stmt_get_result($stmt));
mysqli_stmt_close($stmt);

if ($ultimoPedido) {

    $segundosDesdeUltimo = time() - strtotime($ultimoPedido['criado_em']);

    if ($segundosDesdeUltimo < CODIGO_INTERVALO_SEGUNDOS) {
        $espera = CODIGO_INTERVALO_SEGUNDOS - $segundosDesdeUltimo;
        responderErro("Aguarde " . $espera . " segundos antes de pedir outro código.");
    }

}

// Só gera e manda o código se a conta existir de verdade
if ($usuario) {

    $codigo = strval(random_int(100000, 999999));
    $hash   = password_hash($codigo, PASSWORD_DEFAULT);
    $expira = date('Y-m-d H:i:s', time() + 60 * CODIGO_VALIDADE_MINUTOS);

    $stmt = mysqli_prepare($link, "
        INSERT INTO login_codigos (email, codigo_hash, expira_em) VALUES (?, ?, ?)
    ");
    mysqli_stmt_bind_param($stmt, "sss", $email, $hash, $expira);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    $nomeSeguro = htmlspecialchars($usuario['nome']);

    $corpo = "
    <div style='font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #333;'>
        <div style='background:#050912; padding:22px; text-align:center;'>
            <h1 style='color:#E7B6E6; margin:0; font-size:20px; font-family: Arial, sans-serif;'>UCEN</h1>
        </div>
        <div style='padding:26px; border:1px solid #e0e0e0; border-top:none;'>
            <p>Olá, <strong>{$nomeSeguro}</strong>,</p>
            <p>Use o código abaixo para entrar na sua conta:</p>
            <p style='font-size:32px; font-weight:bold; letter-spacing:8px; text-align:center; color:#5b2a86;'>{$codigo}</p>
            <p>Ele vale por " . CODIGO_VALIDADE_MINUTOS . " minutos. Se não foi você quem pediu, é só ignorar este e-mail.</p>
        </div>
    </div>";

    enviarEmail($email, $usuario['nome'], "Seu código de acesso - UCEN", $corpo);

}

// Resposta igual, exista ou não a conta: evita que alguém descubra
// quais e-mails estão cadastrados só tentando pedir códigos
echo json_encode(["sucesso" => true, "mensagem" => "Se este e-mail estiver cadastrado, enviamos um código."]);
