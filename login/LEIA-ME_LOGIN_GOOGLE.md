# Login com Google — instalação

## 1) Banco de dados
Rode `sql/03_login_google.sql` no phpMyAdmin (adiciona a coluna `google_sub`
na tabela `usuarios`).

## 2) Criar as credenciais no Google
1. Acesse https://console.cloud.google.com/apis/credentials
2. Crie um projeto (ou use um existente).
3. "Criar credenciais" → "ID do cliente OAuth" → tipo **Aplicativo da Web**.
4. Em **URIs de redirecionamento autorizados**, cole exatamente:
   `http://localhost/Matheus/aaaaaaaaaaaaa/Nebula/entrar_google/callback_google.php`
   (ajuste se o caminho da sua pasta no XAMPP for diferente).
5. Copie o **Client ID** e o **Client Secret** gerados.

## 3) Configurar
Copie `config_google.EXEMPLO.php` para `config_google.php` (sem o .EXEMPLO)
e cole o Client ID, o Client Secret e confirme o Redirect URI. Nunca suba
esse arquivo pro Git.

## 4) Colocar a pasta no projeto
Esta pasta inteira (`entrar_google/`) vai dentro da pasta principal do
projeto, no mesmo nível do `home.php`, `login.html`, `connect_nebula.php`
etc. Não precisa espalhar arquivo nenhum fora dela.

## 5) Ligar o botão no login.html
No seu `login.html`, troque o botão "Continuar com Google" (que hoje é
`<button type="button">` e não faz nada) por um link para
`entrar_google/iniciar_login_google.php`. Veja o arquivo `login.html` deste
mesmo pacote — já vem com essa troca feita e pronta pra substituir a sua.

## 6) Testar
1. Clicar em "Continuar com Google" deve abrir a tela de escolha de conta do
   Google.
2. Escolher uma conta com e-mail que AINDA NÃO está cadastrado: deve criar a
   conta sozinho e cair logado no portal.
3. Sair e entrar de novo com a mesma conta Google: deve logar direto, sem
   criar outra conta.
4. Cadastrar manualmente (fora do Google) um e-mail que é o MESMO de uma
   conta Google, e depois entrar com o Google usando esse e-mail: deve
   logar na conta já existente (o `google_sub` é salvo nela).
5. Cancelar a tela do Google (botão voltar, ou negar): deve voltar pro
   `login.html` com uma mensagem de erro.

## Observações e limites
- A conta criada automaticamente não tem uma senha "de verdade" (é um hash
  aleatório). Se você quiser permitir que essa pessoa também entre com
  senha depois, vai precisar de uma tela de "criar uma senha" — não incluí
  isso aqui pra não aumentar o escopo sem você pedir.
- `http://localhost` funciona sem HTTPS porque o Google faz essa exceção
  só para desenvolvimento. Quando for hospedar de verdade, o Redirect URI
  muda para o domínio final, com HTTPS obrigatório, e precisa ser atualizado
  tanto no `config_google.php` quanto no Google Cloud Console.
- O `email_verified` do Google é checado antes de logar — sem isso, alguém
  poderia, em tese, usar uma conta Google com um e-mail não confirmado.
