const apiKey = '7fabf80c7ad1f705d26be69991bb3d6f'; // Reemplaza con tu clave de API de Marvel
const apiUrl = 'https://gateway.marvel.com/v1/public/';

// Realizar solicitud de superhéroes
function cargarSuperheroes(page) {
    const offset = (page - 1) * 10; // Calcular el desplazamiento para paginación
    const superheroesEndpoint = `${apiUrl}characters?apikey=${apiKey}&limit=10&offset=${offset}`;
    fetch(superheroesEndpoint)
        .then(response => response.json())
        .then(data => {
            if (data.data && data.data.results) {
                mostrarSuperheroes(data.data.results);
            }
        })
        .catch(error => {
            console.error('Error al cargar superhéroes:', error);
        });
}

// Realizar solicitud de cómics
function cargarComics(page) {
    const offset = (page - 1) * 10; // Calcular el desplazamiento para paginación
    const comicsEndpoint = `${apiUrl}comics?apikey=${apiKey}&limit=10&offset=${offset}`;
    fetch(comicsEndpoint)
        .then(response => response.json())
        .then(data => {
            if (data.data && data.data.results) {
                mostrarComics(data.data.results);
            }
        })
        .catch(error => {
            console.error('Error al cargar cómics:', error);
        });
}

// ...

// ...

let currentPageSuperheroes = 1; // Inicializar contador de página para superhéroes
let currentPageComics = 1; // Inicializar contador de página para cómics

// Manejadores de eventos para los botones de paginación
const btnPrevSuperheroes = document.querySelector('.btn-prev-superheroes');
btnPrevSuperheroes.addEventListener('click', () => {
    if (currentPageSuperheroes > 1) {
        currentPageSuperheroes--;
        eliminarSuperheroesAnteriores(); // Eliminar superhéroes anteriores
        cargarSuperheroes(currentPageSuperheroes);
    }
});

const btnNextSuperheroes = document.querySelector('.btn-next-superheroes');
btnNextSuperheroes.addEventListener('click', () => {
    currentPageSuperheroes++;
    eliminarSuperheroesAnteriores(); // Eliminar superhéroes anteriores
    cargarSuperheroes(currentPageSuperheroes);
});

const btnPrevComics = document.querySelector('.btn-prev-comics');
btnPrevComics.addEventListener('click', () => {
    if (currentPageComics > 1) {
        currentPageComics--;
        eliminarComicsAnteriores(); // Eliminar cómics anteriores
        cargarComics(currentPageComics);
    }
});

const btnNextComics = document.querySelector('.btn-next-comics');
btnNextComics.addEventListener('click', () => {
    currentPageComics++;
    eliminarComicsAnteriores(); // Eliminar cómics anteriores
    cargarComics(currentPageComics);
});

// ...

// ...

function eliminarSuperheroesAnteriores() {
    const superheroesContainer = document.querySelector('.superheroes-container');
    while (superheroesContainer.firstChild) {
        superheroesContainer.removeChild(superheroesContainer.firstChild);
    }
}

function eliminarComicsAnteriores() {
    const comicsContainer = document.querySelector('.comics-container');
    while (comicsContainer.firstChild) {
        comicsContainer.removeChild(comicsContainer.firstChild);
    }
}

// Cargar superhéroes y cómics al cargar la página inicialmente
cargarSuperheroes(currentPageSuperheroes);
cargarComics(currentPageComics);
