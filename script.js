
// ---------------------------------------------
// IMPORTS DE FIREBASE (DEBEN SER type="module")
// ---------------------------------------------
import { auth } from "./firebaseConfig.js";
import { signInWithEmailAndPassword } 
  from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// Esperar a que el DOM cargue
document.addEventListener('DOMContentLoaded', () => {

  // ================================
  // LOGIN CON FIREBASE AUTH
  // ================================
  const loginForm = document.getElementById('loginForm');

  if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
          e.preventDefault();

          const email = document.getElementById('user').value.trim();
          const password = document.getElementById('pass').value.trim();

          if (!email || !password) {
              alert('Ingrese usuario y contraseña');
              return;
          }

          try {
              // Inicio de sesión REAL con Firebase Auth
              await signInWithEmailAndPassword(auth, email, password);

              alert("Inicio de sesión exitoso");

              // Guardar usuario en localStorage
              localStorage.setItem('user', email);

              // Redirigir a la siguiente pantalla
              window.location.href = "pantalla2.html";

          } catch (error) {
              alert("Correo o contraseña incorrectos");
              console.error("Error Firebase:", error);
          }
      });
  }

  // ================================
  // MARCAR LINK ACTIVO DEL NAV
  // ================================
  const navlinks = document.querySelectorAll('.nav a');
  navlinks.forEach(a => {
      if (
          a.href === location.href ||
          location.pathname.endsWith(a.getAttribute('data-page'))
      ) {
          a.classList.add('active');
      }
  });

  // ================================
  // DEMO DE SENSORES
  // ================================
  const sensorBtn = document.getElementById('startSensors');

  if (sensorBtn) {
      sensorBtn.addEventListener('click', async () => {
          const out = document.getElementById('sensorOutput');
          out.textContent = 'Solicitando permisos y eventos...';

          try {
              // iOS requiere permisos
              if (typeof DeviceMotionEvent !== 'undefined' &&
                  typeof DeviceMotionEvent.requestPermission === 'function') {
                  
                  const res = await DeviceMotionEvent.requestPermission();
                  if (res !== 'granted') {
                      out.textContent = 'Permiso denegado para DeviceMotion';
                      return;
                  }
              }

              window.addEventListener('devicemotion', ev => {
                  const a = ev.accelerationIncludingGravity || ev.acceleration || {};
                  out.textContent = 
                    `Aceleración ≈ x:${a.x?.toFixed(2)} y:${a.y?.toFixed(2)} z:${a.z?.toFixed(2)}`;
              }, { passive: true });

              out.textContent = 'Escuchando eventos de movimiento...';

          } catch (err) {
              out.textContent = 'Error al iniciar sensores: ' + err.message;
          }
      });
  }

  // ================================
  // MOSTRAR USUARIO LOGUEADO
  // ================================
  const who = document.getElementById('whoami');

  if (who) {
      who.textContent = localStorage.getItem('user') || 'Invitado';
  }

});
