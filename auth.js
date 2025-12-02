// auth.js - simple Firebase Auth sign-in for email/password
import { auth } from "./firebaseConfig.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const form = document.getElementById("loginForm");
if(form){
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = document.getElementById("user").value;
    const pass = document.getElementById("pass").value;
    try {
      const login = await signInWithEmailAndPassword(auth, user, pass);
      window.location.href = "pantalla2.html";
    } catch (error) {
      alert("Error de inicio de sesión: " + error.message);
      console.error(error);
    }
  });
} else {
  console.warn("No se encontró el formulario #loginForm en la página.");
}
