const boton = document.querySelector('.button');
const boton2 = document.querySelector('.button2');
const formRepo = document.querySelector('.formRepo')

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
    formRepo.addEventListener('submit', (e) => {
        e.preventDefault()
        const error = document.createElement('div')
        if(e.target[0].value.length <= 0) {
            error.innerHTML = `<p class="error">${'Debes ingresar un criterio de busqueda'}</p>`
            formRepo.appendChild(error)
            setTimeout(() => {
                formRepo.removeChild(error)
            }, 3000);
            return
        }
        fetchRepositories(e.target[0].value)
        formRepo.reset()
        
    });
}
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

async function fetchRepositories (data) {
    
    if(document.querySelector('.repositories') !== null) {
        document.querySelector('main').removeChild(document.querySelector('.repositories'));
    }

    const sectionRepositories = document.createElement('section');

    //Crear la seccion para renderizar los elementos
    sectionRepositories.classList.add('repositories');
    document.querySelector('.main').insertBefore(sectionRepositories, document.querySelector('div1'));


    //realizar el req a la api
    const url = `https://api.github.com/search/repositories?q=${data}`;
    const respuesta = await fetch(url);
    const resultado = await respuesta.json();

    //Estructurar el html
    const ul = document.createElement('ul');
    sectionRepositories.appendChild(ul);

    resultado.items.forEach(r => {
        const li = document.createElement('li');
        li.innerHTML = `
            <p>Titulo: ${r.name}</p>
            <p>Descripcion: ${r.description}</p>
            <p>Dueño: ${r.owner.login}</p>
        `
        ul.appendChild(li);
    })

    document.querySelector('.div1').classList.remove('w-100');
    document.querySelector('.div1').classList.add('w-70');
    document.querySelector('.div1').classList.add('mr-2');
    

}

const data = [
    ["Nombre", "Edad", "Ciudad"],
    ["Juan", 25, "Madrid"],
    ["Ana", 30, "Barcelona"],
    ["Luis", 28, "Valencia"]
];


createTable(data)
function createTable(data) {
    const tabla = document.createElement('table');
    tabla.classList.add('table');

    //Head

    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');

    data[0].forEach(d => {
        const th = document.createElement('th');
        const textoTh = document.createTextNode(d);
        th.appendChild(textoTh);
        trHead.appendChild(th);
    })

    thead.appendChild(trHead);
    tabla.appendChild(thead);


    //Table body
    const tbody = document.createElement('tbody');
    
    const tBodyData = data.slice(1)
    tBodyData.forEach(d => {
        const tr = document.createElement('tr')
        d.forEach((bodyData) => {
            const td = document.createElement('td');
            const bodyTableText = document.createTextNode(bodyData);
            td.appendChild(bodyTableText);
            tr.appendChild(td);
        })
        tbody.appendChild(tr);
    })

    tabla.appendChild(tbody);
    tabla.classList.add('tableStyles');
    document.querySelector('.div1').appendChild(tabla);
    
}








