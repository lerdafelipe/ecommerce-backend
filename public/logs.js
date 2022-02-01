const loginBtn = document.getElementById('Login');
const errorTxt = document.getElementById('text-error');
const usernameLogin = document.getElementById('usernameLogin');
const passwordLogin = document.getElementById('passwordLogin');

loginBtn.addEventListener('click', ()=>{
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: usernameLogin.value, password: passwordLogin.value})
    }).then(data=>{data.json();})
    .then((datos)=>{
        console.log(datos);
        location.href = '../index.html';
    })
});

fetch('/log')
        .then(data => data.json())
        .then(datos => {
            if(datos.log === true){
                location.href = "../index.html";
            }
        });