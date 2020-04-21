<?php

require_once  'config/connection.php';
$input = file_get_contents('php://input');
$input = json_decode($input);

$stmt = $pdo->prepare('select livello from breakout_livelli_utente where id=:id');
$stmt->execute(['id' => $input->id]);
$data = $stmt->fetch();
Header('Content-type: application/json');
echo $data->livello;