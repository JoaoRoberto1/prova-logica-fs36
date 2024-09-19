function exibirSenha() {
    const passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

// Função pro login
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email === 'ADM@gmail.com' && password === '123h5#123') {
        alert('Login bem-sucedido!');
        window.location.href = 'index.html';
    } else {
        alert('Credenciais inválidas. Tente novamente.');
    }
});

function logout() {
    alert('Você foi desconectado.');
}
