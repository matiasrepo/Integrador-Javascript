const apiKey = "02f07ccab23a7bb1dd2e6466cccdd320641f9ad8"; // Reemplaza con tu clave de API de Marvel
const apiUrl = "https://gateway.marvel.com/v1/public/";

// Realizar solicitud de superhéroes
function cargarSuperheroes(page) {
    const offset = (page - 1) * 10; // Calcular el desplazamiento para paginación
    const superheroesEndpoint = `${apiUrl}characters?apikey=${apiKey}&limit=10&offset=${offset}`;
    fetch(superheroesEndpoint)
        .then((response) => response.json())
        .then((data) => {
            if (data.data && data.data.results) {
                mostrarSuperheroes(data.data.results);
            }
        })
        .catch((error) => {
            console.error("Error al cargar superhéroes:", error);
        });
}

// Realizar solicitud de cómics
function cargarComics(page) {
    const offset = (page - 1) * 10; // Calcular el desplazamiento para paginación
    const comicsEndpoint = `${apiUrl}comics?apikey=${apiKey}&limit=10&offset=${offset}`;
    fetch(comicsEndpoint)
        .then((response) => response.json())
        .then((data) => {
            if (data.data && data.data.results) {
                mostrarComics(data.data.results);
            }
        })
        .catch((error) => {
            console.error("Error al cargar cómics:", error);
        });
}

// ...

// Añade el siguiente código para eliminar elementos anteriores
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

// ...

// Manejadores de eventos para los botones de paginación
btnPrevSuperheroes.addEventListener("click", () => {
    if (currentPageSuperheroes > 1) {
        currentPageSuperheroes--;
        eliminarSuperheroesAnteriores(); // Eliminar superhéroes anteriores
        cargarSuperheroes(currentPageSuperheroes);
    }
});

btnNextSuperheroes.addEventListener("click", () => {
    currentPageSuperheroes++;
    eliminarSuperheroesAnteriores(); // Eliminar superhéroes anteriores
    cargarSuperheroes(currentPageSuperheroes);
});

btnPrevComics.addEventListener("click", () => {
    if (currentPageComics > 1) {
        currentPageComics--;
        eliminarComicsAnteriores(); // Eliminar cómics anteriores
        cargarComics(currentPageComics);
    }
});

btnNextComics.addEventListener("click", () => {
    currentPageComics++;
    eliminarComicsAnteriores(); // Eliminar cómics anteriores
    cargarComics(currentPageComics);
});

// ...
