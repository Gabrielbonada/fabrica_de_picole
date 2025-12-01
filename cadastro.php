<?php
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

    $nome  = $_POST['nome'] ?? '';
    $email = $_POST['email'] ?? '';
    $senha = $_POST['senha'] ?? '';
    $tipodecolaborador = $_POST['colaborador'] ?? '';
    $tipodecolaborador = strtolower($tipodecolaborador); 
    $tipodecolaborador = str_replace('á', 'a', $tipodecolaborador);
$tipodecolaborador = str_replace('é', 'e', $tipodecolaborador);
$tipodecolaborador = str_replace('í', 'i', $tipodecolaborador);
$tipodecolaborador = str_replace('ó', 'o', $tipodecolaborador);
$tipodecolaborador = str_replace('ú', 'u', $tipodecolaborador);
$tipodecolaborador = str_replace('ã', 'a', $tipodecolaborador);
$tipodecolaborador = str_replace('õ', 'o', $tipodecolaborador);
$tipodecolaborador = str_replace('ç', 'c', $tipodecolaborador);
$tipodecolaborador = str_replace('â', 'a', $tipodecolaborador);
$tipodecolaborador = str_replace('ê', 'e', $tipodecolaborador);
$tipodecolaborador = str_replace('ô', 'o', $tipodecolaborador);
// Para o seu caso, se for apenas 'Usuário', o principal é:
$tipodecolaborador = str_replace('uário', 'uario', $tipodecolaborador); // Simplificação
$tipodecolaborador = str_replace('á', 'a', $tipodecolaborador); // Se for 'Usuário'

    // criptografa a senha
    $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

    // data e hora atuais
    $data = date('Y-m-d');
    $hora = date('H:i:s');

    // prepara o comando SQL
    $stmt = $conn->prepare(
        'INSERT INTO cadastros (nome, email, senha, tipodecolaborador, `data`, `hora`) 
        VALUES (?, ?, ?, ?, ?, ?)'
    );

    $stmt->bind_param("ssssss", $nome, $email, $senhaHash, $tipodecolaborador, $data, $hora);

    if ($stmt->execute()) {

        // redireciona após cadastrar com sucesso
        header("Location: obrigado.html");
        exit();
    } else {
        echo "Erro ao cadastrar: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>
