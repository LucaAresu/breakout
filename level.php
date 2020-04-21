<?php
session_start();
require_once 'config.php';
function creaLivello($primaRiga,$ultimaRiga, $primaColonna,$ultimaColonna,$minBlocco, $maxBlocco) {
    global $colonneMax,$righeMax;
    $arr = [];
    for($i = 0; $i < $righeMax; $i++)
        for($j = 0; $j < $colonneMax; $j++ )
            $arr[$i][$j]=0;

    for($i=0 ; $i < $righeMax; $i++) {
        if($i >= $primaRiga && $i < $ultimaRiga)
            for($j=0; $j < $colonneMax; $j++){
                if($j>= $primaColonna && $j < $ultimaColonna)
                    $arr[$i][$j] = mt_rand($minBlocco,$maxBlocco);
            }
    }
    return $arr;
}
function livelloFastidio() {
    global $colonneMax,$righeMax;
    $arr = [];
    for($i=0 ; $i<$righeMax; $i++)
        for($j=0; $j<$colonneMax; $j++) {
            $n = mt_rand(0,2);
            $n = $n ? 6 : 0;
            $arr[$i][$j] = $n;

        }

    return $arr;
}
function massimo() {
    global $colonneMax,$righeMax;
    $arr = [];
    for($i=0 ; $i<$righeMax; $i++)
        for($j=0; $j<$colonneMax; $j++)
            $arr[$i][$j] = 6;

    return $arr;
}

$input = file_get_contents('php://input');
$input = json_decode($input);
$arr = [];
switch($input->diff) {
    case 'facile':
            $arr = creaLivello(5,10, 10,20, 0,3);
        break;
    case 'normale':
            $arr = creaLivello(5,15, 8, 25,0,5);
        break;
    case 'difficile':
            $arr = creaLivello(0,15,0,35,1,6);
        break;
    case 'fastidio':
        $arr = livelloFastidio();
        break;
    case 'massimo':
        $arr = massimo();
        break;
    case 'campagna' :
        $arr = require "livelli/campagna/$input->livello.php";
        break;
    case 'personale':
        $arr = $_SESSION['livello'] ?? creaLivello(0,15,0,35,1,6);
        break;
    case 'livelli utente':
        $pdo = null;
        try {
            require 'config/connection.php';
        }catch(Exception $e) {
            return creaLivello(0,15,0,35,1,6);
        }
        $data = $pdo->query('select * from breakout_livelli_utente')->fetchAll();
        $arr =  json_decode($data[mt_rand(0,sizeof($data)-1)]->livello);
        break;
}

Header('Content-type: application/json');
echo json_encode($arr);
//35 colonne 15 righe