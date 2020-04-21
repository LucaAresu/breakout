<?php
$pdo = null;
try {
    require 'config/connection.php';
}catch(Exception $e) {
    echo 'PROBLEMI DI CONNESSIONE AL DB';
}
if($pdo) {
    $input = file_get_contents('php://input');
    $input = json_decode($input);
    if(!$input->nome)
        $nome = 'Nessun nome';
    else
        $nome = $input->nome;
    $stmt = $pdo->prepare('insert into breakout_livelli_utente (nome,livello) values(:nome, :livello)');
    $stmt->execute([
        'nome' => $nome,
        'livello' => json_encode($input->liv),
    ]);
    echo 'ok';

}


