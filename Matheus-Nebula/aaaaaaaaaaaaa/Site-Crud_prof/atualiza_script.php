<?php
header("Content-type: text/html; charset=utf-8");
include_once("connect.php");
 
// 1. Recebimento e sanitização dos dados
$id          = isset($_POST['id']) ? (int) $_POST['id'] : 0;
$nome        = isset($_POST['nome']) ? trim($_POST['nome']) : '';
$descricao   = isset($_POST['descricao']) ? trim($_POST['descricao']) : '';
$script      = isset($_POST['script']) ? trim($_POST['script']) : '';
$status      = isset($_POST['status']) ? (int) $_POST['status'] : 0;
$dataCriacao = isset($_POST['dataCriacao']) ? trim($_POST['dataCriacao']) : '';
 
// 2. Validação dos campos obrigatórios
if ($nome === '' || $descricao === '' || $script === '') {
    echo '<script>
        alert("Preencha todos os campos obrigatórios.");
        history.back();
    </script>';
    exit;
}
 
$status = ($status === 1) ? 1 : 0;
 
// 3. UPDATE ou INSERT
if ($id > 0) {
    // ---- ATUALIZAR ----
    $sql = "UPDATE `script`
            SET `nome` = ?, `descricao` = ?, `script` = ?, `status` = ?, `dataCriacao` = ?
            WHERE `id` = ?";
           
    $stmt = mysqli_prepare($link, $sql);
   
    if ($stmt) {
        // "sssisi" -> 3x string, 1x int (status), 1x string (data), 1x int (id) = TOTAL 6
        mysqli_stmt_bind_param($stmt, "sssisi", $nome, $descricao, $script, $status, $dataCriacao, $id);
        $resultado = mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt); // Adicionado o fechamento
    } else {
        $resultado = false;
    }
 
    $mensagemSucesso = "Postagem atualizada com sucesso!";
    $mensagemErro    = "Falha ao atualizar a postagem.";
 
} else {
    // ---- INSERIR ----
    // Removida a vírgula sobressalente antes de fechar o parêntese
    $sql = "INSERT INTO `script` (`nome`, `descricao`, `script`, `status`, `dataCriacao`)
            VALUES (?, ?, ?, ?, ?)";
           
    $stmt = mysqli_prepare($link, $sql);
   
    if ($stmt) {
        // Removida a vírgula sobressalente do final dos parâmetros
        mysqli_stmt_bind_param($stmt, "sssis", $nome, $descricao, $script, $status, $dataCriacao);
        $resultado = mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
    } else {
        $resultado = false;
    }
 
    $mensagemSucesso = "Script cadastrado com sucesso!";
    $mensagemErro    = "Falha ao cadastrar o script.";
}
 
// 4. Feedback do resultado
if ($resultado) {
    echo '<script>
        alert(' . json_encode($mensagemSucesso, JSON_UNESCAPED_UNICODE) . ');
        window.location.href = "cadScript.php";
    </script>';
} else {
    $erro = mysqli_error($link);
 
    echo '<script>
        alert(' . json_encode($mensagemErro . " Erro: " . $erro, JSON_UNESCAPED_UNICODE) . ');
        history.back();
    </script>';
}
 
mysqli_close($link);
?>
 