const apiKey = "7fabf80c7ad1f705d26be69991bb3d6f"; // Reemplaza con tu clave de API de Marvel
const apiUrl = "https://gateway.marvel.com/v1/public/";
const favoritos = new Set();

function cargarSuperheroes() {
	const superheroesEndpoint = `${apiUrl}characters?apikey=${apiKey}&limit=10`;
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

function cargarComics() {
	const comicsEndpoint = `${apiUrl}comics?apikey=${apiKey}&limit=10`;
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

function mostrarSuperheroes(superheroes) {
	const superheroesContainer = document.querySelector(".superheroes-container");
	superheroes.forEach((superheroe) => {
		const superheroeCard = document.createElement("div");
		superheroeCard.classList.add("superhero-card");

		const name = document.createElement("h2");
		name.textContent = superheroe.name;

		if (
			superheroe.thumbnail &&
			superheroe.thumbnail.path &&
			superheroe.thumbnail.extension
		) {
			const imageUrl = `${superheroe.thumbnail.path}.${superheroe.thumbnail.extension}`;
			const image = document.createElement("img");
			image.src = imageUrl;
			superheroeCard.appendChild(image);
		}

		superheroeCard.appendChild(name);

		const description = document.createElement("p");
		description.textContent =
			superheroe.description || "Sin descripción disponible";
		superheroeCard.appendChild(description);

		const addButton = document.createElement("button");
		addButton.textContent = "Agregar a Favoritos";
		addButton.classList.add("btn-favorito");
		addButton.style.display = "block"; // Mostrar el botón "Agregar a Favoritos" por defecto
		addButton.addEventListener("click", () => {
			toggleFavorito(superheroe, superheroeCard);
		});
		superheroeCard.appendChild(addButton);

		const removeButton = document.createElement("button");
		removeButton.textContent = "Eliminar de Favoritos";
		removeButton.classList.add("btn-remove-favorito");
		removeButton.style.display = "none"; // Ocultar el botón "Eliminar de Favoritos" inicialmente
		removeButton.addEventListener("click", () => {
			toggleFavorito(superheroe, superheroeCard);
		});
		superheroeCard.appendChild(removeButton);

		superheroesContainer.appendChild(superheroeCard);
	});
}

function mostrarComics(comics) {
	const comicsContainer = document.querySelector(".comics-container");
	comics.forEach((comic) => {
		const comicCard = document.createElement("div");
		comicCard.classList.add("comic-card");

		const title = document.createElement("h2");
		title.textContent = comic.title;

		if (comic.thumbnail && comic.thumbnail.path && comic.thumbnail.extension) {
			const imageUrl = `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
			const image = document.createElement("img");
			image.src = imageUrl;
			comicCard.appendChild(image);
		}

		comicCard.appendChild(title);

		const addButton = document.createElement("button");
		addButton.textContent = "Agregar a Favoritos";
		addButton.classList.add("btn-favorito");
        addButton.style.display = 'block';
		addButton.addEventListener("click", () => {
			toggleFavorito(comic, comicCard);
		});
		comicCard.appendChild(addButton);

		comicsContainer.appendChild(comicCard);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar de Favoritos';
        removeButton.classList.add('btn-remove-favorito');
        removeButton.style.display = 'none'; // Ocultar el botón "Eliminar de Favoritos" inicialmente
        removeButton.addEventListener('click', () => {
            toggleFavorito(comic, comicCard);
        });
        comicCard.appendChild(removeButton);

        comicsContainer.appendChild(comicCard);
	});
    
}




function mostrarFavoritos() {
    const favoritosContainer = document.querySelector(".favoritos-container");
    favoritosContainer.innerHTML = "";

    let tarjetasLimitadas = 0;
    favoritos.forEach((superheroe) => {
        if (tarjetasLimitadas < 3) {
            const superheroeCard = document.createElement("div");
            superheroeCard.classList.add("superhero-card", "favorito");

            const name = document.createElement("h2");
            name.textContent = superheroe.name;

            if (
                superheroe.thumbnail &&
                superheroe.thumbnail.path &&
                superheroe.thumbnail.extension
            ) {
                const imageUrl = `${superheroe.thumbnail.path}.${superheroe.thumbnail.extension}`;
                const image = document.createElement("img");
                image.src = imageUrl;
                superheroeCard.appendChild(image);
            }

            superheroeCard.appendChild(name);

            const removeButton = document.createElement("button");
            removeButton.textContent = "Quitar de Favoritos";
            removeButton.classList.add("btn-remove-favorito");
            removeButton.addEventListener("click", () => {
                toggleFavorito(superheroe, superheroeCard);
            });
            superheroeCard.appendChild(removeButton);

            favoritosContainer.appendChild(superheroeCard);
            tarjetasLimitadas++;
        }
    });
}


let notificationTimeout; // Variable para controlar el tiempo de la notificación

function mostrarNotificacion(mensaje, tipo) {
    // Eliminar notificación anterior (si existe)
    const notificacionExistente = document.querySelector('.notificacion');
    if (notificacionExistente) {
        notificacionExistente.remove();
        clearTimeout(notificationTimeout); // Limpiar el temporizador anterior
    }

    const notificacion = document.createElement('div');
    notificacion.classList.add('notificacion');
    notificacion.style.backgroundColor = tipo === 'agregado' ? '#1a3814' : '#242425'; // Cambia el color de fondo según el tipo
    notificacion.style.opacity = '0'; // Inicialmente, la notificación estará oculta
    notificacion.style.transition = 'opacity 0.5s ease-in-out'; // Agrega una transición suave de opacidad
    notificacion.innerHTML = `
        <span class="icono">${tipo === 'agregado' ? '✅' : '❌'}</span>
        <span class="texto">${mensaje}</span>
    `;

    document.body.appendChild(notificacion);

    // Mostrar la notificación después de un breve retraso para permitir la animación
    setTimeout(() => {
        notificacion.style.opacity = '1';
    }, 10);

    // Ocultar la notificación después de 3 segundos
    notificationTimeout = setTimeout(() => {
        notificacion.style.opacity = '0';
        setTimeout(() => {
            notificacion.remove();
        }, 500); // Espera 0.5 segundos antes de eliminar la notificación
    }, 3000);
}


function toggleFavorito(elemento, elementoCard) {
	const addButton = elementoCard.querySelector(".btn-favorito");
	const removeButton = elementoCard.querySelector(".btn-remove-favorito");

	if (favoritos.has(elemento)) {
		favoritos.delete(elemento);
		addButton.style.display = "block"; // Muestra el botón "Agregar a Favoritos"
		removeButton.style.display = "none"; // Oculta el botón "Eliminar de Favoritos"
		mostrarNotificacion('Eliminado de favoritos', 'eliminado'); // Especifica 'eliminado' como el segundo parámetro

	} else {
		favoritos.add(elemento);
		addButton.style.display = "none"; // Oculta el botón "Agregar a Favoritos"
		removeButton.style.display = "block"; // Muestra el botón "Eliminar de Favoritos"
		mostrarNotificacion("Agregado a favoritos", 'agregado'); // Especifica 'agregado' como el segundo parámetro
	}
}



const btnFavoritos = document.getElementById("btn-favoritos");
btnFavoritos.addEventListener("click", () => {
	const modalFavoritos = document.getElementById("modal-favoritos");
	const modalBg = document.getElementById("modal-bg");
	modalFavoritos.style.display = "block";
	modalBg.style.display = "block";
	mostrarFavoritos();
});

const btnCloseModal = document.getElementById("btn-close-modal");
btnCloseModal.addEventListener("click", () => {
	const modalFavoritos = document.getElementById("modal-favoritos");
	const modalBg = document.getElementById("modal-bg");
	modalFavoritos.style.display = "none";
	modalBg.style.display = "none";
});

// Cargar superhéroes y cómics al cargar la página
window.addEventListener("DOMContentLoaded", () => {
	cargarSuperheroes();
	cargarComics();
});
