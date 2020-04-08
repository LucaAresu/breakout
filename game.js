document.addEventListener('DOMContentLoaded', evt => {
    let gioco = () => {
        disegnaPalla();
        disegnaBarra();
        disegnaBlocchi();
        controllaCollisioniConLaBarra();
        controllaCollisioniConIBlocchi();
        mostraPunteggio();

        gestisciPotenziamenti();
        gestisciProiettili();


        muoviPalla();
    };

    let disegnaPalla = () => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.raggio(), 0 ,Math.PI*2, false);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.closePath();
    };
    let disegnaBarra =() => {
        ctx.beginPath();
        ctx.rect(barra.posX, barra.posY, barra.lunghezza(), barra.altezza);
        ctx.fillStyle = barra.color;
        ctx.fill();
        ctx.closePath();
    };
    let muoviPalla = () => {
        if(ball.x + ball.spoX() + ball.raggio() > canvas.width || ball.x + ball.spoX() < ball.raggio())
            ball.dirX = -ball.dirX;
        if(ball.y + ball.spoY() < ball.raggio())
            ball.dirY = -ball.dirY;
        ball.x += ball.spoX();
        ball.y += ball.spoY();
        if(ball.y - ball.raggio()>= canvas.height) { //fuori campo
            ball.x = canvas.width/2;
            ball.dirX = 0;
            ball.dirY = 4;
            ball.y = canvas.height/2;
        }

    };

    let muoviBarra = x => {
        let pos = x-barra.lunghezza()/2;
        pos = pos < 0 ? 0 : pos;
        pos = pos + barra.lunghezza() > canvas.width? canvas.width - barra.lunghezza() : pos;
        return pos;
    };
    let controllaCollisioniConLaBarra = () => {
        if(ball.y+ ball.raggio() >= barra.posY) {
            if (ball.x >= barra.posX && ball.x <= barra.posX + barra.lunghezza()) { //se colpisce la barra
                let parte = barra.lunghezza()/11;
                if(ball.x >= barra.posX  && ball.x < barra.posX+parte) {
                    ball.dirY = 1;
                    ball.dirX = -5;
                }
                else if(ball.x >= barra.posX +parte && ball.x < barra.posX + (parte*2)) {
                    ball.dirY = 1;
                    ball.dirX = -4;
                }
                else if(ball.x >= barra.posX +(parte*2) && ball.x < barra.posX + (parte*3)) {
                    ball.dirY = 2;
                    ball.dirX = -3;
                }
                else if(ball.x >= barra.posX +(parte*3) && ball.x < barra.posX + (parte*4)) {
                    ball.dirY = 3;
                    ball.dirX = -2;
                }
                else if(ball.x >= barra.posX +(parte*4) && ball.x < barra.posX + (parte*5)) {
                    ball.dirY = 3;
                    ball.dirX = -1;
                }
                else if(ball.x >= barra.posX +(parte*5) && ball.x < barra.posX + (parte*6)) {
                    ball.dirY = 4;
                    ball.dirX = 0;
                }
                else if(ball.x >= barra.posX +(parte*6) && ball.x < barra.posX + (parte*7)) {
                    ball.dirY = 3;
                    ball.dirX = 1;
                }
                else if(ball.x >= barra.posX +(parte*7) && ball.x < barra.posX + (parte*8)) {
                    ball.dirY = 3;
                    ball.dirX = 2;
                }
                else if(ball.x >= barra.posX +(parte*8) && ball.x < barra.posX + (parte*9)) {
                    ball.dirY = 2;
                    ball.dirX = 3;
                }
                else if(ball.x >= barra.posX +(parte*9) && ball.x < barra.posX + (parte*10)) {
                    ball.dirY = 1;
                    ball.dirX = 4;
                }
                else if(ball.x >= barra.posX +(parte*10) && ball.x < barra.posX + (parte*11)) {
                    ball.dirY = 1;
                    ball.dirX = 5;
                }
                if(ball.dirY > 0 && ball.y < barra.posY+barra.altezza )
                    ball.dirY = -ball.dirY;

            }
        }
    };
    let disegnaBlocchi = () => {
        numeroBlocchi=0;
        let disegnaBlocco = val => {
            if(val) {
                ctx.beginPath();
                ctx.rect(blocco.marginX+(colonna*blocco.lunghezza+blocco.margin*colonna), blocco.marginY+(riga*blocco.altezza+blocco.margin*riga), blocco.lunghezza, blocco.altezza);
                ctx.fillStyle = blocco.colori[arrBlocchi[riga][colonna]-1];
                ctx.strokeStyle = 'black';
                ctx.fill();
                if(val !== 6)
                    ctx.stroke();
                ctx.closePath();
                numeroBlocchi++;
            }
        }
        let riga,colonna;
      for(riga in arrBlocchi)
          for (colonna in arrBlocchi[riga]) {
              disegnaBlocco(arrBlocchi[riga][colonna]);
          }
    };

    let controllaCollisioniConIBlocchi = () => {
        for(let riga in arrBlocchi)
            for (let colonna in arrBlocchi[riga]) {
                if(arrBlocchi[riga][colonna]) {
                    let inizioX = blocco.marginX + (colonna * blocco.lunghezza + blocco.margin * colonna);
                    let inizioY = blocco.marginY + (riga * blocco.altezza + blocco.margin * riga)
                    if (ball.x + ball.spoX() + ball.raggio() >= inizioX && ball.x + ball.spoX()  <= inizioX + blocco.lunghezza + ball.raggio())
                        if (ball.y  +ball.spoY() + ball.raggio() >= inizioY && ball.y + ball.spoY() <= inizioY + blocco.altezza + ball.raggio()) {
                            arrBlocchi[riga][colonna]--;
                            if(!objPotenziamento)
                                spawnaPotenziamento(inizioX,inizioY,potenziamenti[Math.floor(Math.random()*potenziamenti.length)]);
                            if(!colpito) {
                                colpito = true;
                                let x = ball.x;
                                let y = ball.y;
                                let iterazioniX = 0;
                                let iterazioniY = 0;
                                let continua= true;
                                while (y  < canvas.height && y > 0 && continua) {
                                    if(y  >=  inizioY && y <= inizioY+blocco.altezza + ball.raggio())
                                        continua = false;
                                    else {
                                        y+= ball.dirY;
                                        iterazioniY++;
                                    }
                                }
                                continua = true;
                                while (x  < canvas.width && x > 0 && continua && ball.dirX != 0) {
                                    if(x >= inizioX && x <= inizioX + blocco.lunghezza + ball.raggio()) {
                                        continua = false;
                                    }
                                    else {
                                        x += ball.dirX;
                                        iterazioniX++;
                                    }
                                }
                                if(iterazioniX === iterazioniY){
                                    ball.dirY = -ball.dirY;
                                    ball.dirX = -ball.dirX;
                                }else if(iterazioniX > iterazioniY) {
                                    ball.dirX = -ball.dirX;
                                }
                                else {
                                    ball.dirY = -ball.dirY;
                                }
                                colpito = false;
                            }

                        }
                }
            }

    };
    let mostraPunteggio = () => {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#000000";
        ctx.textAlign = 'start';
        ctx.fillText("BLOCCHI RIMASTI: "+numeroBlocchi+'                Premere ESC per pausa', 8, 20);
    };
    let schermataPausa = () => {

        for(let vocePausa of vociPausa) {
            if (mouseX > vocePausa.x && mouseX < vocePausa.x + vocePausa.lunghezza && mouseY > vocePausa.y && mouseY < vocePausa.y + vocePausa.altezza) {
                vocePausa.coloreSfondo = coloreSfondoEvidenziato;
                if(mouseClick) {
                    vocePausa.click();
                    mouseClick = false;
                }
            } else
                vocePausa.coloreSfondo = coloreSfondoNormale;
            vocePausa.draw();
        }
    };

    let nuovaPartita = () => {
        arrBlocchi= JSON.parse(livelloBaseJson);
        pausa= false;
        ball.x = canvas.width/2;
        ball.y = canvas.height/2;
        ball.dirX = 0
        ball.dirY = 4;
        ball.speed=4;
        ball.size = 3;
        ball.color= 'black';
        objPotenziamento = null;
        barra.size = 3;
        colpito = false;
        intervalProiettili.forEach(ele => {
            clearInterval(ele);
        });
        intervalProiettili = [];
        proiettili = [];
    };

    let spawnaPotenziamento = (x,y,potenziamento) => {
        objPotenziamento = {
            x: x,
            y: y,
            potenziamento: potenziamento,
        }

    };
    let disegnaPotenziamento = () => {
        let colore = objPotenziamento.potenziamento.isBonus? 'green':'red';
        ctx.beginPath();
        ctx.rect(objPotenziamento.x, objPotenziamento.y, 75, 30);
        ctx.fillStyle = colore;
        ctx.strokeStyle = '#000000';
        ctx.fill();
        ctx.stroke();
        ctx.font = "28px Arial";
        ctx.fillStyle = "#000000";
        ctx.textAlign = 'center';
        ctx.fillText(objPotenziamento.potenziamento.scritta, objPotenziamento.x+37, objPotenziamento.y+28);
        ctx.closePath();
    };
    let muoviPotenziamento = () => {
        if(objPotenziamento) {
            if (objPotenziamento.y < canvas.height)
                objPotenziamento.y += 7;
            else
                objPotenziamento = null;
        }
    };
    let gestisciPotenziamenti = () => {
        if(objPotenziamento) {
            disegnaPotenziamento();
            controllaCollisioniConIPotenziamenti();
            muoviPotenziamento();
        }
    }

    let controllaCollisioniConIPotenziamenti = ()  => {
        if(objPotenziamento.x >= barra.posX && objPotenziamento.x <= barra.posX+barra.lunghezza()
            && objPotenziamento.y > barra.posY && objPotenziamento.y <= barra.posY + barra.altezza) {
            objPotenziamento.potenziamento.funzione();
            objPotenziamento =null;
        }
    };

    let creaProiettile = () => {
        proiettili[proiettili.length] = new Proiettile(barra.posX);
        proiettili[proiettili.length] = new Proiettile(barra.posX+barra.lunghezza());
    };

    let gestisciProiettili = () => {
        if(proiettili) {
            let newArray = [];
            if (proiettili.length) {
                proiettili.forEach(proiettile => {
                    proiettile.draw();
                    proiettile.move();
                    proiettile.controlloCollisioni();
                    if (!proiettile.selfDestroy)
                        newArray[newArray.length] = proiettile;

                });
            }
            proiettili = null;
            if (newArray)
                proiettili = newArray;
        }
    };






    document.addEventListener('mousemove', evt => {
        mouseX = evt.clientX;
        mouseY = evt.clientY;
        barra.posX = muoviBarra(evt.clientX);
    });
    document.addEventListener('keyup', evt => {
        if(evt.key === 'Escape')
            pausa = !pausa;
    });

    document.addEventListener('click', evt => {
        mouseClick = true;
    });





    class VoceMenu {
        constructor(frase, y, coloreSfondo, funzione) {
            this.lunghezza = 300;
            this.altezza = 50;
            this.frase = frase;
            this.x = canvas.width/2- this.lunghezza/2;
            this.y = y;
            this.coloreSfondo = coloreSfondo;
            this.click = funzione;
            this.draw = () => {
                ctx.beginPath();
                ctx.rect(this.x, this.y, this.lunghezza, this.altezza);
                ctx.fillStyle = this.coloreSfondo;
                ctx.strokeStyle = '#000000';
                ctx.fill();
                ctx.stroke();
                ctx.font = "36px Arial";
                ctx.fillStyle = "#000000";
                ctx.textAlign = 'center';
                ctx.fillText(this.frase, this.x+this.lunghezza/2, this.y+this.altezza- this.altezza/4);
                ctx.closePath();

            }
        }
    }
    class Potenziamento {
        constructor(scritta, isBonus,funzione) {
            this.scritta = scritta;
            this.isBonus = isBonus;
            this.funzione = funzione;
        }

    }

    class Proiettile {
        constructor(x) {
            this.selfDestroy = false;
            this.x = x;
            this.y = barra.posY;
            this.draw = () => {
                ctx.beginPath();
                ctx.rect(this.x, this.y, 3, 10);
                ctx.fillStyle = 'black';
                ctx.fill();
                ctx.closePath();
            };
            this.move = () => {
                if(this.y < 0 )
                    this.selfDestroy= true;
                else
                    this.y -= 10;
            };
            this.controlloCollisioni = () => {
                for(let riga in arrBlocchi)
                    for (let colonna in arrBlocchi[riga]) {
                        if (arrBlocchi[riga][colonna]) {
                            let inizioX = blocco.marginX + (colonna * blocco.lunghezza + blocco.margin * colonna);
                            let inizioY = blocco.marginY + (riga * blocco.altezza + blocco.margin * riga)
                            if (this.x >= inizioX && this.x <= inizioX + blocco.lunghezza)
                                if (this.y >= inizioY && this.y <= inizioY + blocco.altezza) {
                                    arrBlocchi[riga][colonna]--;
                                    this.selfDestroy = true;
                                }
                        }
                    }
            }

        }
    }







    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 1920;
    canvas.height = 900;
    ctx.scale(1, 1);
    let mouseX = 0;
    let mouseY = 0;
    let mouseClick = false;

    let potenziamenti = [
        new Potenziamento('< >',true, () => barra.setSize(barra.size+1)),
        new Potenziamento('> <',false, () => barra.setSize(barra.size-1)),
        new Potenziamento(' O ',true, () => ball.setSize(ball.size+1)),
        new Potenziamento(' o ',false, () => ball.setSize(ball.size-1)),
        new Potenziamento('>>>', false, () => ball.increseSpeed()),
        new Potenziamento('<<<', true, () => ball.lowerSpeed()),
        new Potenziamento( '---',true, () => {
            colpito=true;
            ball.color = 'red';
            setTimeout(()=> {
                colpito = false;
                ball.color='black';
            }, 10000);}),
        new Potenziamento('|||', true, () => {
            intervalProiettili[intervalProiettili.length] = setInterval(creaProiettile, 100);
            setTimeout(() => clearInterval(intervalProiettili.shift()), 10000);
        })
    ];
    let intervalProiettili = [];
    let objPotenziamento = null;
    let proiettili = [];
    let coloreSfondoNormale = '#ffffff';
    let coloreSfondoEvidenziato = '#226666';
    let vociPausa = [
        new VoceMenu('RIPRENDI',200,coloreSfondoNormale, () => pausa=false),
        new VoceMenu('NUOVA PARTITA',300,coloreSfondoNormale, nuovaPartita),
    ];
    let pausa = true;
    let ball = {
        color: '#000000',
        size: 3,
        x : canvas.width/2,
        y : canvas.height/2,
        dirX: 0,
        dirY: 4, // se è a 0 per troppo tempo aggiungere check
        speed: 4,
    };
    ball.raggio = () => ball.size*5;
    ball.spoX = () => ball.dirX * ball.speed;
    ball.spoY = () => ball.dirY * ball.speed;
    ball.setSize = size => {
        if(size > 5)
            ball.size = 5;
        else if (size< 1)
            ball.size =1;
        else ball.size = size;
    };
    ball.increseSpeed = () => {
        if(ball.speed+2<10) {
            ball.speed +=2;
        }else ball.speed = 10;
    };
    ball.lowerSpeed = () => {
        if(ball.speed-2 > 4)
            ball.speed -=2;
        else if(ball.speed-1 >0)
            ball.speed -=1;
    };
    let colpito = false;

    let barra = {
        size: 3,
        passo : 11,
        altezza: 30,
        color: '#000000',
    };

    barra.lunghezza = () => barra.passo*barra.size*10;
    barra.posX =  canvas.width/2 - barra.lunghezza()/2;
    barra.posY = canvas.height-barra.altezza-50;
    barra.setSize = newSize => {
        if(newSize > 6)
            barra.size = 6;
        else if(newSize < 1)
            barra.size = 1;
        else barra.size = newSize
    };

    let numeroBlocchi = 0;
    let livelloBase = [];
    livelloBase [0] = [1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1];
    livelloBase [1] = [1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1];
    livelloBase [2] = [1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1];
    livelloBase [3] = [1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1];
    livelloBase [4] = [1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1,1,0,1,1,6,6,6,6];

    let livelloBaseJson = JSON.stringify(livelloBase);
    let arrBlocchi = JSON.parse(livelloBaseJson);
    let blocco = {
        lunghezza: 50,
        altezza: 25,
        margin: 0,
        marginX: 100,
        marginY: 150,
        colori: ['green','yellow','red','blue','black','white'],
    }

    let frame = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if(!pausa) {
            gioco();
        }else {
            mostraPunteggio();
            schermataPausa();
        }

        mouseClick = false;
        requestAnimationFrame(frame);
    };
    frame();
});