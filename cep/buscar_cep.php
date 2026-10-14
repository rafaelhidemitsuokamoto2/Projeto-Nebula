<?php

header('Content-Type: application/json; charset=utf-8');

if (!isset($_GET['cep'])) {
    http_response_code(400);

    echo json_encode([
        'erro' => true,
        'mensagem' => 'CEP não informado.'
    ]);

    exit;
}

$cep = preg_replace('/\D/', '', $_GET['cep']);

// CEP brasileiro precisa ter exatamente 8 números
if (strlen($cep) !== 8) {
    http_response_code(400);

    echo json_encode([
        'erro' => true,
        'mensagem' => 'CEP inválido.'
    ]);

    exit;
}

// Consulta a API do ViaCEP
$url = "https://viacep.com.br/ws/{$cep}/json/";

$resposta = @file_get_contents($url);

if ($resposta === false) {
    http_response_code(500);

    echo json_encode([
        'erro' => true,
        'mensagem' => 'Não foi possível consultar o CEP.'
    ]);

    exit;
}

$dados = json_decode($resposta, true);

if (!$dados || isset($dados['erro'])) {
    http_response_code(404);

    echo json_encode([
        'erro' => true,
        'mensagem' => 'CEP não encontrado.'
    ]);

    exit;
}

// Retorna somente os dados necessários para o formulário
echo json_encode([
    'erro' => false,
    'cep' => $dados['cep'] ?? '',
    'logradouro' => $dados['logradouro'] ?? '',
    'bairro' => $dados['bairro'] ?? '',
    'cidade' => $dados['localidade'] ?? '',
    'uf' => $dados['uf'] ?? ''
], JSON_UNESCAPED_UNICODE);