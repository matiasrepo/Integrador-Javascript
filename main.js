const apiKey = '29993103bd6f4c459f2a845005acd9e3';
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

// Función para cargar las noticias desde la API
// Función para cargar las noticias desde la API
function cargarNoticias() {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener la respuesta de la API.');
            }
            return response.json();
        })
        .then(data => {
            if (data.articles) {
                mostrarNoticias(data.articles);
            } else {
                throw new Error('No se encontraron artículos.');
            }
        })
        .catch(error => {
            console.error('Error al cargar noticias:', error);
        });
}


// Función para mostrar las noticias en tarjetas
function mostrarNoticias(noticias) {
    const newsContainer = document.querySelector('.news-cards');

    noticias.slice(0, 40).forEach(noticia => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');

        const title = document.createElement('h2');
        title.textContent = noticia.title;

        // Comprueba si hay una URL de imagen válida antes de crear la imagen
        if (noticia.urlToImage) {
            const image = document.createElement('img');
            image.src = noticia.urlToImage;
            newsCard.appendChild(image);
        }

        const description = document.createElement('p');
        description.textContent = noticia.description;

        const link = document.createElement('a');
        link.href = noticia.url;
        link.textContent = 'Leer más';

        newsCard.appendChild(title);
        newsCard.appendChild(description);
        newsCard.appendChild(link);

        newsContainer.appendChild(newsCard);
    });
}


// Cargar noticias al cargar la página
window.addEventListener('DOMContentLoaded', cargarNoticias);
