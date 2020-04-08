document.addEventListener('DOMContentLoaded', evt => {
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
        let disegnaBlocco = val => {
            if(val) {
                ctx.beginPath();
                ctx.rect(blocco.marginX+(colonna*blocco.lunghezza+blocco.margin*colonna), blocco.marginY+(riga*blocco.altezza+blocco.margin*riga), blocco.lunghezza, blocco.altezza);
                ctx.fillStyle = blocco.colori[arrBlocchi[riga][colonna]-1];
                ctx.strokeStyle = 'black';
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            }
        }
        let riga,colonna;
      for(riga in arrBlocchi)
          for (colonna in arrBlocchi[riga]) {
              disegnaBlocco(arrBlocchi[riga][colonna]);
          }
    };

    let controllaCollisioniConIBlocchi = () => {
        let colpito = false;
        for(let riga in arrBlocchi)
            for (let colonna in arrBlocchi[riga]) {
                if(arrBlocchi[riga][colonna]) {
                    let inizioX = blocco.marginX + (colonna * blocco.lunghezza + blocco.margin * colonna);
                    let inizioY = blocco.marginY + (riga * blocco.altezza + blocco.margin * riga)
                    if (ball.x + ball.spoX() + ball.raggio() >= inizioX && ball.x + ball.spoX()  <= inizioX + blocco.lunghezza + ball.raggio())
                        if (ball.y  +ball.spoY() + ball.raggio() >= inizioY && ball.y + ball.spoY() <= inizioY + blocco.altezza + ball.raggio()) {
                            arrBlocchi[riga][colonna]--;
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
                                        y+= ball.spoY();
                                        iterazioniY++;
                                    }
                                }
                                continua = true;
                                while (x  < canvas.width && x > 0 && continua) {
                                    if(x >= inizioX && x <= inizioX + blocco.lunghezza + ball.raggio()) {
                                        continua = false

                                    }
                                    else {
                                        x += ball.spoX();
                                        iterazioniX++;
                                    }
                                }
                                if(iterazioniX === iterazioniY){
                                    ball.dirX = -ball.dirX;
                                }else if(iterazioniX > iterazioniY) {
                                    ball.dirX = -ball.dirX;
                                }
                                else {
                                    ball.dirY = -ball.dirY;
                                }

                            }

                        }
                }
            }

    };



    document.addEventListener('mousemove', evt => {
       barra.posX = muoviBarra(evt.clientX);
    });
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 1920;
    canvas.height = 1080;
    ctx.scale(1, 1);
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
    let barra = {
        size: 3,
        passo : 11,
        altezza: 30,
        color: '#000000',
    };
    barra.lunghezza = () => barra.passo*barra.size*10;
    barra.posX =  canvas.width/2 - barra.lunghezza()/2;
    barra.posY = canvas.height-barra.altezza-50;

    let arrBlocchi = [];
    arrBlocchi [0] = [1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1];
    arrBlocchi [1] = [1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1];
    arrBlocchi [2] = [1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1];
    arrBlocchi [3] = [1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1];
    arrBlocchi [4] = [1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1,1,0,1,1,2,3,1,1];
    let blocco = {
        lunghezza: 50,
        altezza: 25,
        margin: 0,
        marginX: 50,
        marginY: 150,
        colori: ['green','yellow','red','blue','black'],
    }

    let frame = () => {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        disegnaPalla();
        disegnaBarra();
        disegnaBlocchi();
        controllaCollisioniConLaBarra();
        controllaCollisioniConIBlocchi();
        muoviPalla();


        requestAnimationFrame(frame);
    }
    frame();
});