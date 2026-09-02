<?php
header("Content-type: text/html; charset=utf-8");
include_once("connect.php");
$id = isset($_POST['id']) ? (int) $_POST['id'] : 0;
$nome = isset($_POST['nome']) ? trim($_POST['nome']) : '';
$descricao = isset($_POST['descricao']) ? trim($_POST['descricao']) : '';
$status = isset($_POST['status']) ? (int) $_POST['status'] : 0;
$dataCriacao = isset($_POST['dataCriacao']) ? trim($_POST['dataCriacao']) : '';

$imagem = '';

if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] === 0) {

    $nomeImagem = basename($_FILES['imagem']['name']);

    $pasta = "imagens/";

    if (!is_dir($pasta)) {
        mkdir($pasta, 0777, true);
    }

    $caminho = $pasta . $nomeImagem;

    if (move_uploaded_file($_FILES['imagem']['tmp_name'], $caminho)) {
        $imagem = $caminho;
    }
}

if ($nome === '' || $descricao === '' || $dataCriacao === '') {
    echo '<script>
        alert("Preencha todos os campos obrigatórios.");
        history.back();
    </script>';
    exit;
}

$status = $status === 1 ? 1 : 0;
if ($id > 0) {
    $sql = "UPDATE `postagens`
            SET `nome` = ?, `descricao` = ?, `imagem` = ?, `status` = ?, `dataCriacao` = ?
            WHERE `id` = ?";
    $stmt =  mysqli_prepare($link,$sql);
    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "sssisi", $nome, $descricao, $imagem, $status, $dataCriacao, $id);
        $resultado = mysqli_stmt_execute($stmt);
    } else {
        $resultado = false;
    }
    $mensagemSucesso = "Contato atualizado com sucesso!";
    $mensagemErro = "Falha ao atualizar o contato.";
} else {
    $sql = "INSERT INTO `postagens` (`nome`, `descricao`, `imagem`, `status`, `dataCriacao`)
            VALUES (?, ?, ?, ?, ?)";
    $stmt = mysqli_prepare($link, $sql);
    if ($stmt) {
        mysqli_stmt_bind_param($stmt, "sssis", $nome, $descricao, $imagem, $status, $dataCriacao);
        $resultado = mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
    } else {
        $resultado = false;
    }

    $mensagemSucesso = "Postagem inserida com sucesso!";
    $mensagemErro = "Falha ao inserir a postagem.";
}

if ($resultado) {
    echo '<script>
        alert(' .json_encode($mensagemSucesso, JSON_UNESCAPED_UNICODE) . ');
        window.location.href = "cadPostagens.php";
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