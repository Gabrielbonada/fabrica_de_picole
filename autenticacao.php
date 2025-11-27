<?php
session_start();

$server = "localhost";
$usuario = "root";
$senha = "";
$banco = "meusistema";

$conn = new mysqli($server, $usuario, $senha, $banco);

if ($conn->connect_error) {
    die("Falha ao se comunicar com o banco de dados: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $email = $_POST['email'];
    $senhadigitada = $_POST['senha'];
    $tipodecolaboradorescolhido = $_POST['colaborador'];

    $stmt = $conn->prepare("SELECT senha, tipodecolaborador FROM cadastros WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $resultado = $stmt->get_result();

    if ($resultado->num_rows == 1) {

        $row = $resultado->fetch_assoc();
        $senhaDoBanco = $row["senha"];
        $perfilDoBanco = $row["tipodecolaborador"];

        // Verifica a senha
        if (password_verify($senhadigitada, $senhaDoBanco)) {

            // Salvar sessão
            $_SESSION['usuario_email'] = $email;
            $_SESSION['usuario_perfil'] = $perfilDoBanco;

            if ($perfilDoBanco === "venda") {
                header("Location: indexvendedor.html");
                exit();

            } elseif ($perfilDoBanco === "logistica") {
                header("Location: indexlogistica.html");
                exit();

            } elseif ($perfilDoBanco === "usuario_producao") {
                header("Location: indexusuario.html");
                exit();

            } else {
                echo "Perfil de colaborador inválido ou não configurado.";
            }

        } else {
            echo "Senha incorreta.";
        }

    } else {
        echo "Usuário não encontrado.";
    }

    $stmt->close();
}

$conn->close();
?>
