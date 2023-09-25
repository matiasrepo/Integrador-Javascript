const apiKey = "7fabf80c7ad1f705d26be69991bb3d6f";
const apiUrl = "https://gateway.marvel.com/v1/public/";
const favoritos = new Set();

// Elementos del DOM
const btnFavoritos = document.getElementById("btn-favoritos");
const modalFavoritos = document.getElementById("modal-favoritos");
const modalBg = document.getElementById("modal-bg");
const btnCloseModal = document.getElementById("btn-close-modal");

const loginButton = document.getElementById("btn-login");
const loginForm = document.getElementById("login-form");
const closeButton = document.getElementById("btn-close-login");
const errorMessage = document.getElementById("error-message");
const loginFormElement = document.querySelector("#login-form form");

function openModal() {
    modalFavoritos.style.display = "block";
    modalBg.style.display = "block";
    mostrarFavoritos();
}

function closeModal() {
    modalFavoritos.style.display = "none";
    modalBg.style.display = "none";
}

function mostrarFavoritos() {
    const favoritosLista = document.querySelector(".favoritos-lista");
    favoritosLista.innerHTML = "";

    if (favoritos.size === 0) {
        mostrarNotificacion("Sin favoritos agregados!");
    } else {
        favoritos.forEach((superheroe) => {
            const listItem = document.createElement("li");
            listItem.classList.add("favorito");

            const image = document.createElement("img");
            image.src = superheroe.thumbnail.path + "." + superheroe.thumbnail.extension;

            const name = document.createElement("span");
            name.textContent = superheroe.name;

            const removeButton = document.createElement("button");
            removeButton.textContent = "Quitar de Favoritos";
            removeButton.classList.add("btn-remove-favorito");
            removeButton.addEventListener("click", () => {
                toggleFavorito(superheroe, listItem);
            });

            listItem.appendChild(image);
            listItem.appendChild(name);
            listItem.appendChild(removeButton);

            favoritosLista.appendChild(listItem);
        });
    }
}

function toggleFavorito(elemento, elementoCard) {
    const addButton = elementoCard.querySelector(".btn-favorito");
    const removeButton = elementoCard.querySelector(".btn-remove-favorito");

    if (favoritos.has(elemento)) {
        favoritos.delete(elemento);
        addButton.style.display = "block";
        removeButton.style.display = "none";
        mostrarNotificacion('Eliminado de favoritos', 'eliminado');

    } else {
        favoritos.add(elemento);
        addButton.style.display = "none";
        removeButton.style.display = "block";
        mostrarNotificacion("Agregado a favoritos", 'agregado');
    }
}

function mostrarNotificacion(mensaje, tipo) {
    const notificacionExistente = document.querySelector('.notificacion');
    if (notificacionExistente) {
        notificacionExistente.remove();
    }

    const notificacion = document.createElement('div');
    notificacion.classList.add('notificacion');
    notificacion.style.backgroundColor = tipo === 'agregado' ? '#1a3814' : '#242425';
    notificacion.innerHTML = `
        <span class="icono">${tipo === 'agregado' ? '✅' : '❌'}</span>
        <span class="texto">${mensaje}</span>
    `;

    document.body.appendChild(notificacion);

    setTimeout(() => {
        notificacion.remove();
    }, 3000);
}

function openLoginForm() {
    loginForm.style.display = "block";
    errorMessage.textContent = "";
}

function closeLoginForm() {
    loginForm.style.display = "none";
    loginFormElement.reset();
    errorMessage.textContent = "";
}

function verificarCredenciales(username, password) {
    if (username === "usuario" && password === "contraseña") {
        return true;
    } else {
        return false;
    }
}

loginButton.addEventListener("click", openLoginForm);
closeButton.addEventListener("click", closeLoginForm);

loginFormElement.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        errorMessage.textContent = "Por favor, completa todos los campos.";
    } else {
        verificarCredenciales(username, password);
    }
});

btnFavoritos.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);

window.addEventListener("DOMContentLoaded", () => {
    cargarSuperheroes();
    cargarComics();
});

document.getElementById('abrir-popup').addEventListener('click', function () {
    const favoritosLista = document.querySelector('.favoritos-lista');

    if (favoritosLista.children.length === 0) {
        mostrarNotificacion("Sin favoritos agregados!");
    } else {
        openModal();
    }
});

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
        addButton.style.display = "block";
        addButton.addEventListener("click", () => {
            toggleFavorito(superheroe, superheroeCard);
        });
        superheroeCard.appendChild(addButton);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Eliminar de Favoritos";
        removeButton.classList.add("btn-remove-favorito");
        removeButton.style.display = "none";
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
        removeButton.style.display = 'none';
        removeButton.addEventListener('click', () => {
            toggleFavorito(comic, comicCard);
        });
        comicCard.appendChild(removeButton);

        comicsContainer.appendChild(comicCard);
    });
}


// Función para abrir el formulario de inicio de sesión
function openLoginForm() {
    document.getElementById("login-form").style.display = "block";
}

// Función para cerrar el formulario de inicio de sesión
function closeLoginForm() {
    document.getElementById("login-form").style.display = "none";
}

// Función para abrir el pop-up de favoritos
function openFavoritos() {
    document.getElementById("modal-favoritos").style.display = "block";
    document.getElementById("modal-bg").style.display = "block";
}

// Función para cerrar el pop-up de favoritos
function closeFavoritos() {
    document.getElementById("modal-favoritos").style.display = "none";
    document.getElementById("modal-bg").style.display = "none";
}

// Agregar evento al botón "Iniciar sesión" para abrir el formulario
document.getElementById("btn-login").addEventListener("click", openLoginForm);

// Agregar evento al botón "Cerrar" del formulario para cerrarlo
document.getElementById("btn-close-login").addEventListener("click", closeLoginForm);

// Agregar evento al fondo oscuro del formulario para cerrarlo
document.getElementById("login-form").addEventListener("click", function(event) {
    if (event.target === document.getElementById("login-form")) {
        closeLoginForm();
    }
});

// Agregar evento al botón "Favoritos" para abrir el pop-up de favoritos
document.getElementById("btn-favoritos").addEventListener("click", openFavoritos);

// Agregar evento al botón "Cerrar" del pop-up de favoritos para cerrarlo
document.getElementById("btn-close-modal").addEventListener("click", closeFavoritos);

// Agregar evento al fondo oscuro del pop-up de favoritos para cerrarlo
document.getElementById("modal-bg").addEventListener("click", function(event) {
    if (event.target === document.getElementById("modal-bg")) {
        closeFavoritos();
    }
});
