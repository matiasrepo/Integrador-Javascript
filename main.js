const apiKey = '7fabf80c7ad1f705d26be69991bb3d6f'; // Reemplaza con tu clave de API de Marvel

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

// ...

function mostrarSuperheroes(superheroes) {
    const superheroesContainer = document.querySelector('.superheroes-container');
    superheroes.forEach(superheroe => {
        const superheroeCard = document.createElement('div');
        superheroeCard.classList.add('superhero-card');
        
        const name = document.createElement('h2');
        name.textContent = superheroe.name;

        if (superheroe.thumbnail && superheroe.thumbnail.path && superheroe.thumbnail.extension) {
            const imageUrl = `${superheroe.thumbnail.path}.${superheroe.thumbnail.extension}`;
            const image = document.createElement('img');
            image.src = imageUrl;
            superheroeCard.appendChild(image);
        }
        
        superheroeCard.appendChild(name);
        superheroesContainer.appendChild(superheroeCard);
    });
}

function mostrarComics(comics) {
    const comicsContainer = document.querySelector('.comics-container');
    comics.forEach(comic => {
        const comicCard = document.createElement('div');
        comicCard.classList.add('comic-card');

        const title = document.createElement('h2');
        title.textContent = comic.title;

        if (comic.thumbnail && comic.thumbnail.path && comic.thumbnail.extension) {
            const imageUrl = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
            const image = document.createElement('img');
            image.src = imageUrl;
            comicCard.appendChild(image);
        }

        comicCard.appendChild(title);
        comicsContainer.appendChild(comicCard);
    });
}

// ... (código previo)

// Variables para llevar un registro de los favoritos
const favoritos = new Set(); // Usamos un conjunto para evitar duplicados

// Función para agregar o quitar un superhéroe como favorito
function toggleFavorito(superheroe) {
    if (favoritos.has(superheroe)) {
        favoritos.delete(superheroe);
    } else {
        favoritos.add(superheroe);
    }
}

// Función para mostrar los favoritos en el pop-up
function mostrarFavoritos() {
    const favoritosContainer = document.querySelector('.favoritos-container');
    favoritosContainer.innerHTML = ''; // Limpiar el contenido anterior

    favoritos.forEach(superheroe => {
        const superheroeCard = document.createElement('div');
        superheroeCard.classList.add('superhero-card');
        
        const name = document.createElement('h2');
        name.textContent = superheroe.name;

        if (superheroe.thumbnail && superheroe.thumbnail.path && superheroe.thumbnail.extension) {
            const imageUrl = `${superheroe.thumbnail.path}.${superheroe.thumbnail.extension}`;
            const image = document.createElement('img');
            image.src = imageUrl;
            superheroeCard.appendChild(image);
        }
        
        superheroeCard.appendChild(name);

        // Botón para quitar de favoritos
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Quitar de Favoritos';
        removeButton.classList.add('btn-remove-favorito');
        removeButton.addEventListener('click', () => {
            toggleFavorito(superheroe); // Quitar de favoritos
            mostrarFavoritos(); // Actualizar la lista de favoritos
        });
        superheroeCard.appendChild(removeButton);

        favoritosContainer.appendChild(superheroeCard);
    });
}

// Mostrar el pop-up de Favoritos al hacer clic en el botón "Favoritos"
const btnFavoritos = document.getElementById('btn-favoritos');
btnFavoritos.addEventListener('click', () => {
    const modalFavoritos = document.getElementById('modal-favoritos');
    modalFavoritos.style.display = 'block';
    mostrarFavoritos();
});

// Cerrar el pop-up de Favoritos al hacer clic en la "X"
const btnCloseModal = document.getElementById('btn-close-modal');
btnCloseModal.addEventListener('click', () => {
    const modalFavoritos = document.getElementById('modal-favoritos');
    modalFavoritos.style.display = 'none';
});

// Cargar superhéroes y cómics al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    cargarSuperheroes();
    cargarComics();
});

