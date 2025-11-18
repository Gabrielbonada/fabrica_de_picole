<?php
// Iniciar a sessão é importante para o próximo passo (manter o usuário logado)
session_start();

$server = "localhost";
$usuario = "root";
$senha = "";
$banco = "meusistema";

// cria a conexão
$conn = new mysqli($server, $usuario, $senha, $banco);

// verifica conexão
if ($conn->connect_error) {
    die("Falha ao se comunicar com o banco de dados: " . $conn->connect_error);
}

// verifica se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] === "POST") {

    $email = $_POST['email'];
    $senhadigitada = $_POST['senha'];
    // 1. CAPTURAR o tipo de colaborador que o usuário selecionou no formulário de login
    $tipodecolaboradorescolhido = $_POST['colaborador'];

    // 2. AJUSTAR A CONSULTA SQL para buscar a senha E o tipo de colaborador
    $stmt = $conn->prepare("SELECT senha, tipodecolaborador FROM cadastros WHERE email = ?");
    
    $stmt->bind_param("s", $email);
    $stmt->execute();

    $resultado = $stmt->get_result();

    if ($resultado->num_rows == 1) {
        $row = $resultado->fetch_assoc();
        $senhaDoBanco = $row["senha"];
        // 3. OBTER o tipo de colaborador que está salvo no banco de dados
        $perfilDoBanco = $row["tipodecolaborador"];

        // Primeiro, verifica a senha
        if (password_verify($senhadigitada, $senhaDoBanco)) {
            
            // 4. COMPARAR o perfil escolhido no login com o perfil salvo no banco
            if ($tipodecolaboradorescolhido === $perfilDoBanco) {
                // SUCESSO! Email, senha e perfil estão corretos.
                
                // (Opcional, mas recomendado) Salvar informações na sessão
                $_SESSION['usuario_email'] = $email;
                $_SESSION['usuario_perfil'] = $perfilDoBanco;

                // Redireciona para a página principal
                if($perfilDoBanco == $tipodecolaboradorescolhido){
                    header("location: indexvendedor.html");
                    exit();
                }


            } else {
                // Senha está correta, mas o perfil está errado
                echo "Você selecionou um perfil de usuário incorreto. Tente novamente.";
            }

        } else {
            // Senha incorreta
            echo "Sua senha está errada";
        }
    } else {
        // Usuário não encontrado
        echo "Usuário não encontrado";
    }

    $stmt->close();
}

$conn->close();
?>
