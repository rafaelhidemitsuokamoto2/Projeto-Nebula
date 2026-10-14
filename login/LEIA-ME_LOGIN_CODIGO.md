# Login por código (e-mail) — instalação

## ATENÇÃO antes de qualquer coisa
O `enviar.php` que você tinha continha uma senha de app do Gmail em texto puro
(`kwtu smdn qthz thjp`). Essa senha foi colada no chat, então considere-a
comprometida. Revogue-a em myaccount.google.com/apppasswords e gere uma nova
ANTES de configurar o `config_email.php` abaixo.

## 1) Banco de dados
Rode `sql/02_login_por_codigo.sql` no phpMyAdmin (cria a tabela `login_codigos`).

## 2) PHPMailer
Este pacote assume que a pasta `PHPMailer/` (com PHPMailer.php, SMTP.php,
Exception.php) já está na raiz do projeto, do jeito que o `enviar.php`
esperava. Se não estiver, copie a pasta pra lá.

## 3) Configurar o e-mail
Copie `config_email.EXEMPLO.php` para `config_email.php` (sem o .EXEMPLO) e
preencha com o seu e-mail e a SENHA DE APP NOVA (não a antiga). Este arquivo
NUNCA deve ir pro Git.

## 4) Copiar os arquivos
Copie para a pasta do projeto (substituindo os que já existem):

| Arquivo | Situação |
|---|---|
| `mailer.php` | novo |
| `solicitar_codigo.php` | novo |
| `verificar_codigo.php` | novo |
| `config_email.php` (a partir do EXEMPLO) | novo |
| `login-acao-nebula.php` | substitui o antigo (agora responde em JSON) |
| `login.html` | substitui o `login.php` (apague o .php antigo) |

Não precisa mexer em mais nada (cadastro, histórico, cookies continuam iguais).

## 5) Testar
1. Abrir `login.html`, digitar um e-mail que EXISTE no banco e clicar em
   "Receber código por E-mail". Deve chegar um e-mail com um código de 6 dígitos.
2. Digitar o código: deve logar e cair no portal.
3. Testar com e-mail que NÃO existe: a mensagem é a mesma ("se este e-mail
   estiver cadastrado..."), e nenhum e-mail chega — isso é proposital.
4. Clicar em "Reenviar código" antes de 60s: deve mostrar a contagem regressiva.
5. Digitar um código errado 5 vezes: a 6ª tentativa deve dizer "peça um novo".
6. Esperar 10 minutos (ou editar a validade no banco) e tentar um código velho:
   deve dizer que expirou.
7. Login normal com senha: continua funcionando como antes.

## Observações
- O `login-acao-nebula.php` agora responde em JSON e não navega mais para
  outra página. Se algo do seu fluxo antigo dependia do redirecionamento por
  `meta refresh`, isso mudou: o redirecionamento agora é feito pelo
  JavaScript, depois de mostrar o toast de sucesso.
- O e-mail com o código usa `htmlspecialchars($usuario['nome'])` para evitar
  que um nome de usuário com caracteres especiais quebre o HTML do e-mail.
- Limite de 5 tentativas por código e 60s entre pedidos — ajuste as constantes
  `CODIGO_MAX_TENTATIVAS`, `CODIGO_VALIDADE_MINUTOS` e
  `CODIGO_INTERVALO_SEGUNDOS` se quiser outros valores.
