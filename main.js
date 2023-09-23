const apiKey = "7fabf80c7ad1f705d26be69991bb3d6f"; // Reemplaza con tu clave de API de Marvel
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

// ...

let currentPageSuperheroes = 1; // Inicializar contador de página para superhéroes
let currentPageComics = 1; // Inicializar contador de página para cómics

// Manejadores de eventos para los botones de paginación
// ...

// Crear elementos HTML para los botones de paginación de superhéroes
const btnPrevSuperheroes = document.createElement("button");
btnPrevSuperheroes.textContent = "Página Anterior";
btnPrevSuperheroes.classList.add("btn-prev-superheroes");
const btnNextSuperheroes = document.createElement("button");
btnNextSuperheroes.textContent = "Página Siguiente";
btnNextSuperheroes.classList.add("btn-next-superheroes");

// Agregar los botones de paginación a la página
const superheroesPagination = document.querySelector(".superheroes-pagination");
superheroesPagination.appendChild(btnPrevSuperheroes);
superheroesPagination.appendChild(btnNextSuperheroes);

// Crear elementos HTML para los botones de paginación de cómics
const btnPrevComics = document.createElement("button");
btnPrevComics.textContent = "Página Anterior";
btnPrevComics.classList.add("btn-prev-comics");
const btnNextComics = document.createElement("button");
btnNextComics.textContent = "Página Siguiente";
btnNextComics.classList.add("btn-next-comics");

// Agregar los botones de paginación a la página
const comicsPagination = document.querySelector(".comics-pagination");
comicsPagination.appendChild(btnPrevComics);
comicsPagination.appendChild(btnNextComics);

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

// ...

// Cargar superhéroes y cómics al cargar la página inicialmente
cargarSuperheroes(currentPageSuperheroes);
cargarComics(currentPageComics);
