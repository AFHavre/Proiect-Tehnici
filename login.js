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

    let newDest={
        id: username,
        password: password
    };
    fetch("http://localhost:3000/login", 
    {method: 'post', 
     headers: 
     {
         'Content-Type' : 'application/json'
     },
     body:  JSON.stringify(newDest)
    }).then(function(response){
        console.log(response); 
        if( response.status == 200) { 
            alert('user valid');
        }
        if( response.status == 450) {
            alert('user invalid');
        }
        if( response.status != 200 && response.status != 450) {
            alert(`response error : ${response.status}`);
        }
    });
});
