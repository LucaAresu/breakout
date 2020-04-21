<?php
require_once 'config.php';
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Level Editor</title>
    <script src="leveleditor.js"></script>
    <script>
        let colonneMax = <?=$colonneMax?>;
        let righeMax = <?=$righeMax?>;
    </script>
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
        #output {
            text-align: center;
        }
        select {
            height: 2rem;
            width: 3rem;
            padding: 0.2rem;
        }

        .divoutputsave {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
        }
        .salva {
            margin: 2rem;
            display: flex;
            justify-content: space-between;
        }
    </style>
</head>
<body>
<form>
<?php
for($i=0 ; $i<$righeMax; $i++) {
    for ($j = 0; $j < $colonneMax; $j++) : ?>
        <select id="<?= "$i-$j" ?>">
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
        </select>
    <?php
    endfor;
    echo '<br>';
}
?>
</form>
<div class="content">
    <canvas></canvas>
    <div class="divoutputsave">
        <div id="output">
        </div>
        <div  class="salva">
            <div>
                <button onclick="confirmReset()">Reset</button>
                <script>
                    function confirmReset() {
                        let con = window.confirm('Vuoi resettare?');
                        if(con) {
                            let selects = document.querySelectorAll('select');
                            selects.forEach( ele => { ele.value='0'});
                            location.reload();
                        }
                    }
                </script>

                <button id="personale">Salva come personale</button>
                <button id="carica">Carica livello personale</button>

            </div>
            <div>
                Salva livelli nel <a href="visualizza.php">Database</a>
                <input type="text" id="utentext" placeholder="Inserisci il nome">
                <button id="utentebutton">Salva nel DB</button>
            </div>
        </div>
    </div>


</div>

</body>
</html>




