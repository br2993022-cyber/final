// Mostrar el registro
function showRegister() {
    document.querySelector(".card").style.display = "none";
    document.getElementById("registerCard").style.display = "block";
}

// Mostrar login
function showLogin() {
    document.querySelector(".card").style.display = "block";
    document.getElementById("registerCard").style.display = "none";
}

// Registrar usuario
function register() {
    let name = document.getElementById("regName").value;
    let email = document.getElementById("regEmail").value;
    let pass = document.getElementById("regPass").value;

    if (!name || !email || !pass) {
        alert("Completa todos los campos");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let exists = users.find(u => u.email === email);
    if (exists) {
        alert("El correo ya está registrado");
        return;
    }

    users.push({ name, email, pass });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Usuario registrado");
    showLogin();
}

// Login
function login() {
    let email = document.getElementById("loginEmail").value;
    let pass = document.getElementById("loginPass").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(u => u.email === email && u.pass === pass);

    if (user) {
    alert("Bienvenido " + user.name);
    window.location.href = "pantalla2.html";  
} else {
    alert("Correo o contraseña incorrectos");
}
}