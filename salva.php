<?php
session_start();
$input = file_get_contents('php://input');
$input = json_decode($input);
$_SESSION['livello'] = $input->liv;


echo 'ok';