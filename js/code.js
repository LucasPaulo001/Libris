  
// Função para buscar o livro na API
function searchBook() {
    const apiKey = "AIzaSyCnJynmT8SU_yjMTJ8uHFycA8Eb7O06t50";
    const query = document.getElementById("search-input").value;  // Pegando o valor da busca
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const book = data.items[0].volumeInfo;  // Pegando o primeiro livro da busca
                displayBook(book);  // Função para exibir os dados do livro na tela
            } else {
                alert("Nenhum livro encontrado.");
            }
        })
        .catch(error => console.error("Erro ao buscar livro:", error));
}

// Função para exibir os dados do livro na tela
function displayBook(book) {
    const bookDetails = document.getElementById("book-details");
    bookDetails.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Autor:</strong> ${book.authors ? book.authors.join(', ') : 'Desconhecido'}</p>
        <p><strong>Publicado em:</strong> ${book.publishedDate}</p>
        <p><strong>Descrição:</strong> ${book.description || 'Sem descrição disponível.'}</p>
        <img src="${book.imageLinks ? book.imageLinks.thumbnail : 'https://via.placeholder.com/128x200'}" alt="${book.title}">
        <br>
        <button onclick="addFavorite('${book.title}', '${book.authors ? book.authors.join(', ') : 'Desconhecido'}')">Favoritar</button>
    `;
}

// Função para salvar o livro como favorito no Local Storage
function addFavorite(title, authors) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.some(book => book.title === title)) {
        alert("Este livro já está nos favoritos!");
        return;
    }

    favorites.push({ title, authors });
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert(`"${title}" foi adicionado aos favoritos!`);
    displayFavorites();  // Atualizar a lista de favoritos
}

// Função para exibir a lista de livros favoritos
function displayFavorites() {
    const favoritesList = document.getElementById("favorites-list");
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favoritesList.innerHTML = "";
    favorites.forEach(book => {
        const listItem = document.createElement("li");
        const description = document.createElement('div')
        const local = document.getElementById('localDes')
        listItem.classList.add("book");
        listItem.innerHTML = `<h3>${book.title} - Autor(es): ${book.authors}<span class="material-symbols-outlined drop" id="drop" onclick="openDrop()">
        arrow_drop_down
        </span></h3>`;
        description.innerHTML = `aqui terá a descrição do livro`
        description.setAttribute('id', 'des')
        favoritesList.appendChild(listItem);
        local.appendChild(description)
    });
}

// Atualizar favoritos ao carregar a página
document.addEventListener("DOMContentLoaded", displayFavorites);


//funcionalidades da página
function openDrop(){
    const des = document.getElementById('des')
    const drop = document.getElementById('drop')
    des.classList.toggle('ativeDrop')
}
// drop.addEventListener('click', () => {
//     des.classList.remove('ativeDrop')
// })

