document.addEventListener('DOMContentLoaded', evt => {
    let blocco = {
        lunghezza: 25,
        altezza: 12,
        margin: 0,
        marginX: 50,
        marginY: 25,
        colori: ['green','gold','orangered','dodgerblue','blueviolet','grey'],
    };
    let disegnaBlocchi = () => {
        let disegnaBlocco = val => {
            if(val) {
                ctx.beginPath();
                ctx.rect(blocco.marginX+(colonna*blocco.lunghezza+blocco.margin*colonna), blocco.marginY+(riga*blocco.altezza+blocco.margin*riga), blocco.lunghezza, blocco.altezza);
                ctx.fillStyle = blocco.colori[arr[riga][colonna]-1];
                ctx.strokeStyle = 'black';
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            }
        }
        let riga,colonna;
        for(riga in arr)
            for (colonna in arr[riga]) {
                disegnaBlocco(arr[riga][colonna]);
            }
    };

    let arr = [];
    for(let i = 0; i<righeMax ; i++)
        arr[i] = [];
    for(let i=0; i<righeMax; i++)
        for(let j=0; j<colonneMax; j++)
            arr[i][j] = 0;
    let divs = document.querySelectorAll('#livelli div');
    for(let ele of divs)
        ele.addEventListener('click', evt => {
            let headers = new Headers();
            let init = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    id: ele.id
                })
            };
            let request = new Request('getLivelloUtente.php',init);
            fetch(request).then(resp => {
                if(resp.ok)
                    return resp.json()
            }).then(resp => {
                if(resp)
                    arr = resp;
            }).catch();
        });
    document.querySelector('#personale').addEventListener('click', evt => {
        let headers = new Headers();
        let init = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                liv: arr
            })
        };
        let request = new Request('salva.php',init);
        fetch(request).then(resp => {
            if(resp.ok)
                return resp.text();
            throw new Error('Errore');
        }).then(resp => {
            if(resp)
                alert('Livello salvato');
            else throw new Error('fail');
        }).catch(err => {
            alert('Errore');
        });
    });

    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 960;
    canvas.height = 450;
    ctx.scale(1, 1);

    let frame = () => {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        disegnaBlocchi();
        requestAnimationFrame(frame);
    }
    frame();

});