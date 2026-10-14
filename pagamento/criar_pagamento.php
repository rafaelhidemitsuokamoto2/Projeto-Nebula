<?php
// criar_pagamento.php

require_once __DIR__ . '/vendor/autoload.php';

header('Content-Type: application/json');

// ⚠️ Seu Access Token DE TESTE
MercadoPago\SDK::setAccessToken('APP_USR-3483076778539461-092716-f3eedc51fb57631bf5a96b350a9acaed-3717764333');

try {
    // Cria o objeto de preferência (versão 2 do SDK)
    $preference = new MercadoPago\Preference();

    // Cria o item que está sendo cobrado
    $item = new MercadoPago\Item();
    $item->title = "Taxa de Inscrição - Vestibular Nebula";
    $item->quantity = 1;
    $item->unit_price = 90.00;
    $item->currency_id = "BRL";

    $preference->items = [$item];

    $preference->back_urls = [
        "success" => "http://localhost/matheus/aaaaaaaaaaaaa/Nebula/carregamento_vestibular.html",
        "failure" => "http://localhost/matheus/aaaaaaaaaaaaa/Nebula/inscricao.html",
        "pending" => "http://localhost/matheus/aaaaaaaaaaaaa/Nebula/inscricao.html"
    ];

   /* $preference->auto_return = "approved"; - Removido temporariamente, precisa do site hospedado para funcionar e retornar para meu site 
    Este código é de uma versão mais antiga do composer pq meu xampp é antigo */

    // Envia pra API do Mercado Pago
    $preference->save();

    echo json_encode([
        "sucesso" => true,
        "link_pagamento" => $preference->init_point
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "sucesso" => false,
        "erro" => $e->getMessage()
    ]);
}