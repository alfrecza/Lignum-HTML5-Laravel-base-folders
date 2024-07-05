const boton = document.querySelector('.button');
const boton2 = document.querySelector('.button2');

const config = {
    method: "GET",
    url: "https://api.chucknorris.io/jokes/random"
};


addEventListeners();
function addEventListeners () {
    boton.addEventListener('click', fetchApiChuck);
    boton2.addEventListener('click', async () => {
        try {
            const resultado = await llamadaAjax(config);
            chuckNorrisRender(JSON.parse(resultado));
        } catch (error){
            chuckNorrisRender({ error: 'Ocurrió un error al obtener los datos' });
        }
    });
};

const touchButton = () => {
    alert("Tocaste el boton!");
};

async function fetchApiChuck () {
    const respuesta = await fetch('https://api.chucknorris.io/jokes/random');
    const resultado = await respuesta.json();

    chuckNorrisRender(resultado);
};

function llamadaAjax(config) {

    const {method, url} = config;

    const respuesta = new Promise((resolve, reject) => {

        const oReq = new XMLHttpRequest;
        oReq.open(method, url);
        oReq.onreadystatechange = function() {
            if(this.status == 200 && this.readyState == 4) {
                resolve(this.response);
            } else if(this.status !== 200 && this.readyState !== 4) {
                reject('error');
            }
        }
        oReq.send();
    })
    return respuesta;
    
};

async function chuckNorrisRender (data) {
    const sectionRender = document.querySelector('#chuckNorris');
    const isError = Object.keys(data).includes('error');
    if(isError) {
        sectionRender.classList.add('chuckNorrisFail');
    } else {
        sectionRender.classList.add('chuckNorris');
        sectionRender.classList.remove('chuckNorrisFail');
    }
    sectionRender.innerHTML = `
        <img src="${isError ? '' : data.icon_url}" alt="${isError ? 'Icono no disponible' : "icono chuck norris"}"/>
        <p>${isError ? data.error : data.value}</p>
        
    `
    
};







