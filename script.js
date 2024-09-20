function exibirSenha() { 
    const passwordInput = document.getElementById('password');
    passwordInput.type = (passwordInput.type === 'password') ? 'text' : 'password';
}

document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === 'ADM@gmail.com' && password === '123456789') {
        alert('Login bem-sucedido!');

        const url = window.location.origin + '/index.html'
        window.location.href = url 
    } else {
        alert('Credenciais inválidas. Tente novamente.');
    }
});

function logout() {
    window.location.href = '/components/login.html'
    alert('Você foi desconectado.');
}

function searchMovie() {
    const searchTitle = document.getElementById('searchTitle').value;
    const apiKey = 'b3904bfb3f89cb18c2456466a94bdcd5';

    if (searchTitle === '') {
        alert('Digite o nome de um filme para buscar');
        return;
    }

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTitle)}`;

    axios.get(url)
        .then(response => {
            const data = response.data;
            if (data.results && data.results.length > 0) {
                const movie = data.results[0]; 
                document.getElementById('title').value = movie.title;
                document.getElementById('director').value = 'Desconhecido'; 
                document.getElementById('rating').value = movie.vote_average; 
            } else {
                alert('Filme não encontrado!');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar filme:', error);
            alert('Erro ao buscar filme. Tente novamente mais tarde.');
        });
}

document.getElementById('cadastroForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const director = document.getElementById('director').value;
    const rating = document.getElementById('rating').value;

    const movie = { title, director, rating };
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    movies.push(movie);
    localStorage.setItem('movies', JSON.stringify(movies));

    alert('Filme cadastrado com sucesso!');
    const url = window.location.origin + '/index.html'
    window.location.href = url 
});

window.onload = function() {
    const movies = JSON.parse(localStorage.getItem('movies')) || [];
    const moviesTable = document.querySelector('#moviesTable tbody');
    
    if (moviesTable) {
        moviesTable.innerHTML = ''; 

        movies.forEach(function(movie) {
            const row = moviesTable.insertRow();
            row.insertCell(0).textContent = movie.title;
            row.insertCell(1).textContent = movie.director;
            row.insertCell(2).textContent = movie.rating;
        });
    }

    document.getElementById('filterInput')?.addEventListener('input', function() {
        const filterValue = this.value.toLowerCase();
        const rows = moviesTable.getElementsByTagName('tr');

        for (let i = 0; i < rows.length; i++) {
            const titleCell = rows[i].getElementsByTagName('td')[0];
            if (titleCell) {
                const titleText = titleCell.textContent || titleCell.innerText;
                rows[i].style.display = titleText.toLowerCase().includes(filterValue) ? '' : 'none';
            }
        }
    });

    // Limpar Tabela
    document.getElementById('clearTableButton')?.addEventListener('click', function() {
        localStorage.removeItem('movies');
        moviesTable.innerHTML = '';
        alert('Tabela limpa com sucesso!');
    });
};
