// variables
const formulario = document.querySelector('#formulario')
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// event listeners
eventListeners()

function eventListeners() {
    // cuanod le usuario un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets') || []);
        console.log(tweets);

        crearHTML();
    })
}

// funciones
function agregarTweet(e) {
    e.preventDefault();

    // textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // validacion
    if(tweet === '') {
        mostrarError('Un mensaje no puede ir vacio');
        return; /*evita que se ejecuten mas lineas de codigo*/
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }
    
    // agregar al arreglo de tweet
    tweets = [...tweets, tweetObj];
    
    // una vez agregado vamos a agregar el html
    crearHTML();

    // reiniciar el formulario
    formulario.reset();
}

// mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError); 

    // el mensaje de error solo se muestre tres segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// Muestra un listado delo tweet
function crearHTML() {

    limpiarHTML()
    
    if(tweets.length > 0) {
        tweets.forEach(tweet => {
            // agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // agregar la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // crear el html
            const li = document.createElement('li');

            // agregar el texto
            li.textContent = tweet.tweet;

            // asignar el boton
            li.appendChild(btnEliminar);

            // insertar en el html
            listaTweets.appendChild(li);

        });
    }

    sincronizarStorage();
}

// agrega los tweet a localStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// elimina un tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}

// limpiar el html
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}