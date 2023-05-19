var loginModal = document.getElementById('loginModal');
var loginForm = document.getElementById('loginForm');

function openLoginModal() {
    loginModal.style.display = 'block';
}

function closeLoginModal() {
    loginModal.style.display = 'none';
}

loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username === 'utilizator' && password === 'parola') {
        alert('Autentificare reușită!');
        closeLoginModal();
    } else {
        alert('Date de autentificare incorecte!');
    }
});
