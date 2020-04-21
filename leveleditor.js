document.addEventListener('DOMContentLoaded', evt => {
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
    document.querySelector('#utentebutton').addEventListener('click', evt => {
        let headers = new Headers();
        let nome = document.querySelector('#utentext').value;
        let init = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                liv: arr,
                nome: nome,
            })
        };
        let request = new Request('livellidb.php',init);
        fetch(request).then(resp => {
            if(resp.ok)
                return resp.text();
            throw new Error('Errore');
        }).then(resp => {
            if(resp)
                alert(resp);
            else throw new Error('fail');
        }).catch(err => {
            alert('Errore');
        });
    });

    document.querySelector('#carica').addEventListener('click', evt => {
        let headers = new Headers();
        let init = {
            method: 'POST',
            headers: headers,
            body : JSON.stringify({
                diff: 'personale',
            }),
        } ;
        let request = new Request('level.php',init);
        fetch(request).then( resp => {
            if(resp.ok)
                return resp.json();
        }).then(resp => {
            if(resp) {
                arr = resp;
                aggiornaSelect();
                document.querySelector('#output').innerHTML = JSON.stringify(arr);
            }
        }).catch();
    });

    let aggiornaSelect = () => {
        let c = 0;
        for(let i = 0; i < righeMax; i++)
            for(let j = 0; j < colonneMax; j++) {
                selects[c].value = arr[i][j];
                if(parseInt(selects[c].value))
                    selects[c].style.backgroundColor = blocco.colori[parseInt(selects[c].value)-1];
                else
                    selects[c].style.backgroundColor = 'white';
                c++;
            }
    };


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
    let count = 0;
    let selects = document.querySelectorAll('select');
    for(let i = 0; i < righeMax; i++)
        for(let j = 0; j < colonneMax; j++) {
            selects[count].addEventListener('change', evt =>  {
                arr[i][j] = parseInt(evt.target.value);
                if(parseInt(evt.target.value))
                    evt.target.style.backgroundColor = blocco.colori[parseInt(evt.target.value)-1];
                else
                    evt.target.style.backgroundColor = 'white';
                document.querySelector('#output').innerHTML = JSON.stringify(arr)
            });
            if(parseInt(selects[count].value))
                selects[count].style.backgroundColor = blocco.colori[parseInt(selects[count].value)-1];
            else
                selects[count].style.backgroundColor = 'white';
            arr[i][j] = parseInt(selects[count++].value);
        }
    document.querySelector('#output').innerHTML = JSON.stringify(arr);
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