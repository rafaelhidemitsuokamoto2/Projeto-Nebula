<?php
header("Content-type: application/json;charset=utf-8");

// Mesmo cookie protegido do login. Precisa vir ANTES do session_start()
session_set_cookie_params([
    'lifetime' => 0,
    'path'     => '/',
    'httponly' => true,
    'samesite' => 'Lax'
]);
session_start();

// Erros do mysqli viram exceção (capturadas no try/catch lá embaixo)
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

include_once(__DIR__ . "/../connect_nebula.php");
mysqli_set_charset($link, "utf8mb4");

function responderErro($mensagem, $campo = null) {
    echo json_encode(["sucesso" => false, "erro" => $mensagem, "campo" => $campo]);
    exit;
}

// Pega um campo do POST sempre como texto (evita erro se vier um array)
function campoPost($nome) {
    $valor = $_POST[$nome] ?? '';
    return is_string($valor) ? trim($valor) : '';
}

// Valida os dígitos verificadores do CPF
function cpfValido($cpf) {
    if (strlen($cpf) !== 11 || preg_match('/^(\d)\1{10}$/', $cpf)) {
        return false;
    }
    for ($t = 9; $t < 11; $t++) {
        $soma = 0;
        for ($i = 0; $i < $t; $i++) {
            $soma += $cpf[$i] * (($t + 1) - $i);
        }
        if ((int)$cpf[$t] !== ((10 * $soma) % 11) % 10) {
            return false;
        }
    }
    return true;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    responderErro("Método inválido");
}

// Opções aceitas (têm que ser iguais aos value dos radios do HTML)
$cursosValidos = [
    'Astronomia', 'Geofísica', 'Astrofísica', 'Ciências Atmosféricas',
    'Engenharia Aeroespacial', 'Engenharia Elétrica', 'Física', 'Matemática',
    'Ciências da Computação', 'Engenharia de Telecomunicações'
];
$turnosValidos      = ['Matutino', 'Vespertino', 'Noturno'];
$modalidadesValidas = ['Presencial', 'Online'];
$ensinosValidos     = ['Publica', 'Privada Regular', 'Privada Bolsa'];

$etapa = filter_var($_POST['etapa'] ?? '', FILTER_VALIDATE_INT);

// O id da inscrição fica SÓ na sessão: o navegador nunca diz qual linha quer alterar
$idInscricao = $_SESSION['id_inscricao'] ?? null;

try {

    // ==================== ETAPA 1: dados pessoais ====================
    if ($etapa === 1) {

        $nome       = campoPost('nome-completo');
        $cpf        = preg_replace('/\D/', '', campoPost('cpf'));
        $nascimento = campoPost('data-nascimento');
        $email      = campoPost('email');
        $telefone   = preg_replace('/\D/', '', campoPost('telefone'));
        $reserva    = preg_replace('/\D/', '', campoPost('telefone-reserva'));

        if ($nome === '' || mb_strlen($nome) > 120) {
            responderErro("Informe o nome completo (até 120 caracteres).", "nome-completo");
        }
        if (!cpfValido($cpf)) {
            responderErro("CPF inválido.", "cpf");
        }

        $data = DateTime::createFromFormat('Y-m-d', $nascimento);
        if (!$data || $data->format('Y-m-d') !== $nascimento
            || $data > new DateTime('today') || $data < new DateTime('1900-01-01')) {
            responderErro("Data de nascimento inválida.", "data-nascimento");
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || mb_strlen($email) > 120) {
            responderErro("Informe um e-mail válido.", "email");
        }
        if (!preg_match('/^\d{10,11}$/', $telefone)) {
            responderErro("Telefone inválido. Informe DDD + número.", "telefone");
        }

        // Telefone reserva é opcional: vazio vira NULL, preenchido precisa ser válido
        if ($reserva === '') {
            $reserva = null;
        } elseif (!preg_match('/^\d{10,11}$/', $reserva)) {
            responderErro("Telefone reserva inválido. Informe DDD + número.", "telefone-reserva");
        }

        if ($idInscricao) {

            // Candidato voltou da etapa 2 e mudou algo: atualiza a mesma linha
            $stmt = mysqli_prepare($link,
                "UPDATE inscricoes
                    SET nome_completo = ?, cpf = ?, data_nascimento = ?, email = ?, telefone = ?, telefone_reserva = ?
                  WHERE id_inscricoes = ?");
            mysqli_stmt_bind_param($stmt, "ssssssi", $nome, $cpf, $nascimento, $email, $telefone, $reserva, $idInscricao);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_close($stmt);

        } else {

            $stmt = mysqli_prepare($link,
                "INSERT INTO inscricoes (nome_completo, cpf, data_nascimento, email, telefone, telefone_reserva, etapa_atual)
                 VALUES (?, ?, ?, ?, ?, ?, 1)");
            mysqli_stmt_bind_param($stmt, "ssssss", $nome, $cpf, $nascimento, $email, $telefone, $reserva);
            mysqli_stmt_execute($stmt);
            $_SESSION['id_inscricao'] = mysqli_insert_id($link);
            mysqli_stmt_close($stmt);

        }

        echo json_encode(["sucesso" => true]);
        exit;
    }

    // As etapas 2 e 3 só fazem sentido depois da etapa 1
    if (($etapa === 2 || $etapa === 3) && !$idInscricao) {
        responderErro("Sua sessão expirou. Recarregue a página e comece a inscrição novamente.");
    }

    // ==================== ETAPA 2: curso, turno e modalidade ====================
    if ($etapa === 2) {

        $curso1     = campoPost('curso-opcao1');
        $curso2     = campoPost('curso-opcao2');
        $turno1     = campoPost('turno-opcao1');
        $turno2     = campoPost('turno-opcao2');
        $modalidade = campoPost('modalidade');

        if (!in_array($curso1, $cursosValidos, true))        responderErro("Escolha o curso da 1ª opção.", "curso-opcao1");
        if (!in_array($curso2, $cursosValidos, true))        responderErro("Escolha o curso da 2ª opção.", "curso-opcao2");
        if (!in_array($turno1, $turnosValidos, true))        responderErro("Escolha o turno da 1ª opção.", "turno-opcao1");
        if (!in_array($turno2, $turnosValidos, true))        responderErro("Escolha o turno da 2ª opção.", "turno-opcao2");
        if (!in_array($modalidade, $modalidadesValidas, true)) responderErro("Escolha a modalidade.", "modalidade");

        $stmt = mysqli_prepare($link,
            "UPDATE inscricoes
                SET curso_opcao1 = ?, curso_opcao2 = ?, turno_opcao1 = ?, turno_opcao2 = ?, modalidade = ?,
                    etapa_atual = GREATEST(etapa_atual, 2)
              WHERE id_inscricoes = ?");
        mysqli_stmt_bind_param($stmt, "sssssi", $curso1, $curso2, $turno1, $turno2, $modalidade, $idInscricao);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);

        echo json_encode(["sucesso" => true]);
        exit;
    }

    // ==================== ETAPA 3: ensino médio ====================
    if ($etapa === 3) {

        $ensino = campoPost('ensino-medio');

        if (!in_array($ensino, $ensinosValidos, true)) {
            responderErro("Escolha o tipo de instituição do Ensino Médio.", "ensino-medio");
        }

        $stmt = mysqli_prepare($link,
            "UPDATE inscricoes
                SET ensino_medio = ?, etapa_atual = GREATEST(etapa_atual, 3)
              WHERE id_inscricoes = ?");
        mysqli_stmt_bind_param($stmt, "si", $ensino, $idInscricao);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);

        echo json_encode(["sucesso" => true]);
        exit;
    }

    responderErro("Etapa inválida.");

} catch (mysqli_sql_exception $e) {

    // 1062 = valor duplicado (CPF, e-mail e telefone são UNIQUE).
    // O texto do erro do MySQL cita o nome da trava que foi violada.
    if ($e->getCode() === 1062) {

        $detalhe = $e->getMessage();

        if (str_contains($detalhe, 'uq_inscricoes_email')) {
            responderErro("Já existe uma inscrição com este e-mail.", "email");
        }
        if (str_contains($detalhe, 'uq_inscricoes_telefone')) {
            responderErro("Já existe uma inscrição com este telefone.", "telefone");
        }

        responderErro("Já existe uma inscrição com este CPF.", "cpf");
    }

    error_log("salvar inscricao: " . $e->getMessage());
    http_response_code(500);
    responderErro("Não foi possível salvar sua inscrição. Tente novamente.");

}