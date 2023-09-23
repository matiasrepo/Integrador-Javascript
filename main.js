const apiKey = '02f07ccab23a7bb1dd2e6466cccdd320641f9ad8'; // Reemplaza con tu clave de API de Marvel
// URL base de la API de Marvel
const apiUrl = 'https://gateway.marvel.com/v1/public/';

// Realizar solicitud de superhéroes
function cargarSuperheroes() {
    const superheroesEndpoint = `${apiUrl}characters?apikey=${apiKey}&limit=10`;
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
function cargarComics() {
    const comicsEndpoint = `${apiUrl}comics?apikey=${apiKey}&limit=10`;
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

function mostrarSuperheroes(superheroes) {
    const superheroesContainer = document.querySelector('.superheroes-container');
    superheroes.forEach(superheroe => {
        const superheroeCard = document.createElement('div');
        superheroeCard.classList.add('superhero-card');
        superheroeCard.textContent = superheroe.name;
        superheroesContainer.appendChild(superheroeCard);
    });
}

function mostrarComics(comics) {
    const comicsContainer = document.querySelector('.comics-container');
    comics.forEach(comic => {
        const comicCard = document.createElement('div');
        comicCard.classList.add('comic-card');
        comicCard.textContent = comic.title;
        comicsContainer.appendChild(comicCard);
    });
}

// Cargar superhéroes y cómics al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    cargarSuperheroes();
    cargarComics();
});
