<?php
/*if (isset($_FILES['imagem'])) {
    $arquivo = $_FILES['imagem'];
    
    // Verifica se houve erro no envio
    if ($arquivo['error'] !== UPLOAD_ERR_OK) {
        die('Erro ao enviar o arquivo.');
    }
    
    // Define a pasta de destino
    $pastaDestino = 'uploads/';
    
    // Cria a pasta se ela não existir
    if (!is_dir($pastaDestino)) {
        mkdir($pastaDestino, 0755, true);
    }
    
    // Gera um nome único para evitar sobrescrever arquivos
    $nomeOriginal = $arquivo['name'];
    $extensao = strtolower(pathinfo($nomeOriginal, PATHINFO_EXTENSION));
    $novoNome = uniqid() . '.' . $extensao;
    
    $caminhoCompleto = $pastaDestino . $novoNome;
    
    // Move o arquivo da pasta temporária para o destino final
    if (move_uploaded_file($arquivo['tmp_name'], $caminhoCompleto)) {
        echo "Upload realizado com sucesso! Caminho: " . $caminhoCompleto;
    } else {
        echo "Não foi possível mover o arquivo para a pasta.";
    }
} else {
    echo "Nenhum arquivo enviado.";
}*/

include_once("connect.php");
global $link;


/* =====================================================
   DADOS DO FORMULÁRIO
   ===================================================== */

$idPostagem = isset($_POST['id']) ? (int) $_POST['id'] : 0;
$idScript = isset($_POST['id']) ? (int) $_POST['id'] : 0;

$titulo = isset($_POST['titulo']) ? $_POST['titulo'] : '';
$descricao = isset($_POST['descricao']) ? $_POST['descricao'] : '';
$conteudo = isset($_POST['conteudo']) ? $_POST['conteudo'] : '';
$dataCriacao = isset($_POST['dataCriacao']) ? $_POST['dataCriacao'] : '';

$imagem = '';


/* =====================================================
   UPLOAD DA IMAGEM
   ===================================================== */

if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] == UPLOAD_ERR_OK) {

    $arquivo = $_FILES['imagem'];

    $pastaDestino = 'uploads/';

    if (!is_dir($pastaDestino)) {
        mkdir($pastaDestino, 0755, true);
    }

    $nomeOriginal = $arquivo['name'];
    $extensao = strtolower(pathinfo($nomeOriginal, PATHINFO_EXTENSION));

    $novoNome = uniqid() . '.' . $extensao;

    $caminhoCompleto = $pastaDestino . $novoNome;

    if (move_uploaded_file($arquivo['tmp_name'], $caminhoCompleto)) {

        $imagem = $novoNome;

    } else {

        echo "Erro ao salvar a imagem.";
        exit;
    }
}


/* =====================================================
   POSTAGENS
   ===================================================== */

if (isset($_POST['id'])) {

    /* =========================
       NOVA POSTAGEM
       ========================= */

    if ($idPostagem == 0) {

        if ($imagem == '') {
            echo "É necessário enviar uma imagem.";
            exit;
        }

        $sql = "INSERT INTO tb_postagens
                (titulo, img, descricao, dataCriacao)
                VALUES (?, ?, ?, ?)";

        $stmt = mysqli_prepare($link, $sql);

        mysqli_stmt_bind_param(
            $stmt,
            "ssss",
            $titulo,
            $imagem,
            $descricao,
            $dataCriacao
        );

        $resultado = mysqli_stmt_execute($stmt);

        mysqli_stmt_close($stmt);

        if ($resultado) {

            echo '<script>
                    alert("Postagem cadastrada com sucesso!");
                    window.location.href = "cadPostagens.php";
                  </script>';

        } else {

            echo "Erro ao cadastrar postagem: " . mysqli_error($link);
        }


    /* =========================
       ATUALIZAR POSTAGEM
       ========================= */

    } else {

        if ($imagem != '') {

            $sql = "UPDATE tb_postagens
                    SET titulo = ?,
                        img = ?,
                        descricao = ?,
                        dataCriacao = ?
                    WHERE id_postagem = ?";

            $stmt = mysqli_prepare($link, $sql);

            mysqli_stmt_bind_param(
                $stmt,
                "ssssi",
                $titulo,
                $imagem,
                $descricao,
                $data_criacao,
                $idPostagem
            );

        } else {

            $sql = "UPDATE tb_postagens
                    SET titulo = ?,
                        descricao = ?,
                        dataCriacao = ?
                    WHERE id = ?";

            $stmt = mysqli_prepare($link, $sql);

            mysqli_stmt_bind_param(
                $stmt,
                "sssi",
                $titulo,
                $descricao,
                $dataCriacao,
                $id
            );
        }

        $resultado = mysqli_stmt_execute($stmt);

        mysqli_stmt_close($stmt);

        if ($resultado) {

            echo '<script>
                    alert("Postagem atualizada com sucesso!");
                    window.location.href = "cadPostagens.php";
                  </script>';

        } else {

            echo "Erro ao atualizar postagem: " . mysqli_error($link);
        }
    }


/* =====================================================
   SCRIPTS
   ===================================================== */

} elseif (isset($_POST['id'])) {

    /* =========================
       NOVO SCRIPT
       ========================= */

    if ($id == 0) {

        if ($imagem == '') {
            echo "É necessário enviar uma imagem.";
            exit;
        }

        $sql = "INSERT INTO scripts
                (titulo, img, descricao, conteudo, dataCriacao)
                VALUES (?, ?, ?, ?, ?)";

        $stmt = mysqli_prepare($link, $sql);

        mysqli_stmt_bind_param(
            $stmt,
            "sssss",
            $titulo,
            $imagem,
            $descricao,
            $conteudo,
            $data_criacao
        );

        $resultado = mysqli_stmt_execute($stmt);

        mysqli_stmt_close($stmt);

        if ($resultado) {

            echo '<script>
                    alert("Script cadastrado com sucesso!");
                    window.location.href = "cadScripts.php";
                  </script>';

        } else {

            echo "Erro ao cadastrar script: " . mysqli_error($link);
        }


    /* =========================
       ATUALIZAR SCRIPT
       ========================= */

    } else {

        if ($imagem != '') {

            $sql = "UPDATE script
                    SET titulo = ?,
                        img = ?,
                        descricao = ?,
                        conteudo = ?,
                        data_criacao = ?
                    WHERE id = ?";

            $stmt = mysqli_prepare($link, $sql);

            mysqli_stmt_bind_param(
                $stmt,
                "sssssi",
                $titulo,
                $imagem,
                $descricao,
                $conteudo,
                $dataCriacao,
                $id
            );

        } else {

            $sql = "UPDATE tb_scripts
                    SET titulo = ?,
                        descricao = ?,
                        conteudo = ?,
                        dataCriacao = ?
                    WHERE id = ?";

            $stmt = mysqli_prepare($link, $sql);

            mysqli_stmt_bind_param(
                $stmt,
                "ssssi",
                $titulo,
                $descricao,
                $conteudo,
                $datariacao,
                $idScript
            );
        }

        $resultado = mysqli_stmt_execute($stmt);

        mysqli_stmt_close($stmt);

        if ($resultado) {

            echo '<script>
                    alert("Script atualizado com sucesso!");
                    window.location.href = "cadScripts.php";
                  </script>';

        } else {

            echo "Erro ao atualizar script: " . mysqli_error($link);
        }
    }


/* =====================================================
   NENHUM FORMULÁRIO IDENTIFICADO
   ===================================================== */

} else {

    echo "Erro: nenhum cadastro foi identificado.";
}


mysqli_close($link);

?>