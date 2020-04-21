<?php
require 'config.php';
require 'config/connection.php';
$data = $pdo->query('select id,nome from breakout_livelli_utente order by id desc')->fetchAll();
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Visualizza Livelli</title>
    <style>
        canvas {
            display block;
            width: 960px;
            height: 450px;
            border: 1px solid black;
        }
        .content {
            display: flex;
            justify-content: space-between;
            margin: 1rem;
        }
        #livelli {
            border: 1px solid black;
            align-self: start;
            display: block;
            margin: 0 auto;
            width: 25%;
            overflow: auto;
            height: 40rem;
        }
        #livelli div {
            margin: 1rem;
            padding: 0.5rem;
            border: 1px solid black;
            border-radius: 5px;

        }
        #livelli div:hover {
            background-color: #999999;
        }
        #personale {
            height: 2rem;
        }
    </style>
    <script>
        let colonneMax = <?=$colonneMax?>;
        let righeMax = <?=$righeMax?>;
    </script>
    <script src="visualizza.js"></script>
</head>
<body>
<div class="content">
    <button id="personale">Salva come personale</button>

    <div id="livelli">
        <?php
        foreach($data as $d): ?>
        <div id="<?=$d->id?>">ID: <?=$d->id?> Nome: <?=$d->nome?> </div>
        <?php
        endforeach;;
        ?>
    </div>
    <canvas></canvas>

</div>
</body>
</html>
