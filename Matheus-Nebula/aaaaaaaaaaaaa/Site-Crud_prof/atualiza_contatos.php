<?php
header("Content-type: text/html; charset=utf-8");
include_once("connect.php");
$id = isset($_POST['id']) ? (int) $_POST['id'] : 0;
$nome = isset($_POST['nome']) ? trim($_POST['nome']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$status = isset($_POST['status']) ? (int) $_POST['status'] : 0;
$dataCriacao = isset($_POST['dataCriacao']) ? trim($_POST['dataCriacao']) : '';
if ($nome === '' || $email === '' || $dataCriacao === '') {
    echo '<script>
        alert("Preencha todos os campos obrigatórios.");
        history.back();
          </script>';
          exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo '<script>
        alert("Informe um endereço de e-mail válido.");
        history.back();
          </script>';
          exit;
}
$status = $status === 1 ? 1 : 0;
if ($id > 0) {
    $sql = "UPDATE `cad_contato`
            SET `nome` = ?, `email` = ?, `status` =?, `dataCriacao` = ?
            WHERE `id` = ?";
    $stmt =  mysqli_prepare($link,$sql);
    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "ssisi", $nome, $email, $status, $dataCriacao, $id);
        $resultado = mysqli_stmt_execute($stmt);
    } else {
        $resultado = false;
    }
    $mensagemSucesso = "Contato atualizado com sucesso!";
    $mensagemErro = "Falha ao atualizar o contato.";
} else {
    $sql = "INSERT INTO `cad_contato` (`nome`, `email`, `status`, `dataCriacao`)
            VALUES (?, ?, ?, ?)";
    $stmt = mysqli_prepare($link, $sql);
    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "ssis", $nome, $email, $status, $dataCriacao);
        $resultado = mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
    } else {
        $resultado = false;
    }

    $mensagemSucesso = "Contato inserido com sucesso!";
    $mensagemErro = "Falha ao inserir o contato.";
}

if ($resultado) {
    echo '<script>
        alert(' .json_encode($mensagemSucesso, JSON_UNESCAPED_UNICODE) . ');
        window.location.href = "cad_contatos.php";
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