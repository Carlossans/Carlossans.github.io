// Autenticación y UI para Joyería
// Requiere Firebase Auth (compat) cargado en index.html

// 1) Configura tu proyecto Firebase (sustituye las X por tus valores de consola Firebase)
// Crea un proyecto en https://console.firebase.google.com, habilita el método Email/Contraseña y Google en Authentication
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDJJftNZRYrCu3DKrv3uCTz6kMwev-qcT8",
  authDomain: "joyeriashop-7e05c.firebaseapp.com",
  projectId: "joyeriashop-7e05c",
  storageBucket: "joyeriashop-7e05c.firebasestorage.app",
  messagingSenderId: "1095717647512",
  appId: "1:1095717647512:web:6854c34c0ba7c0f812cced",
  measurementId: "G-0LC1RQ5SZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Evitar múltiples inicializaciones si se carga varias veces
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Elementos del DOM
const openLoginBtn = document.getElementById('openLogin');
const openRegisterBtn = document.getElementById('openRegister');
const userMenu = document.getElementById('userMenu');
const userDisplayName = document.getElementById('userDisplayName');
const logoutBtn = document.getElementById('logoutBtn');

const authModal = document.getElementById('authModal');
const authModalTitle = document.getElementById('authModalTitle');
const loginTab = document.getElementById('loginTab');
const registerTab = document.getElementById('registerTab');
const authAlert = document.getElementById('authAlert');

const loginForm = document.getElementById('loginForm');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');

const registerForm = document.getElementById('registerForm');
const regName = document.getElementById('regName');
const regEmail = document.getElementById('regEmail');
const regPassword = document.getElementById('regPassword');
const regConfirm = document.getElementById('regConfirm');

// Utilidad: mostrar errores bonitos
function showError(msg) {
  authAlert.textContent = msg;
  authAlert.classList.remove('d-none');
}
function hideError() {
  authAlert.textContent = '';
  authAlert.classList.add('d-none');
}

// Utilidad: cambiar a pestañas (login/registro)
function activateTab(tab) {
  hideError();
  if (tab === 'login') {
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginForm.classList.remove('d-none');
    registerForm.classList.add('d-none');
    authModalTitle.textContent = 'Iniciar sesión';
  } else {
    loginTab.classList.remove('active');
    registerTab.classList.add('active');
    loginForm.classList.add('d-none');
    registerForm.classList.remove('d-none');
    authModalTitle.textContent = 'Registrarse';
  }
}

if (loginTab && registerTab) {
  loginTab.addEventListener('click', () => activateTab('login'));
  registerTab.addEventListener('click', () => activateTab('register'));
}

// Abrir modal con la pestaña adecuada
if (openLoginBtn) {
  openLoginBtn.addEventListener('click', () => activateTab('login'));
}
if (openRegisterBtn) {
  openRegisterBtn.addEventListener('click', () => activateTab('register'));
}

// Manejar login email/password
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();
    try {
      await auth.signInWithEmailAndPassword(loginEmail.value.trim(), loginPassword.value);
      const modal = bootstrap.Modal.getInstance(authModal) || new bootstrap.Modal(authModal);
      modal.hide();
      loginForm.reset();
    } catch (err) {
      showError(mapFirebaseError(err));
    }
  });
}

// Manejar registro email/password
if (registerForm) {
  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();
    if (regPassword.value !== regConfirm.value) {
      showError('Las contraseñas no coinciden.');
      return;
    }
    try {
      const cred = await auth.createUserWithEmailAndPassword(regEmail.value.trim(), regPassword.value);
      if (regName.value.trim()) {
        await cred.user.updateProfile({ displayName: regName.value.trim() });
      }
      const modal = bootstrap.Modal.getInstance(authModal) || new bootstrap.Modal(authModal);
      modal.hide();
      registerForm.reset();
    } catch (err) {
      showError(mapFirebaseError(err));
    }
  });
}

// Botones Google (en ambos formularios)
function bindGoogleButtons() {
  document.querySelectorAll('.btn-google').forEach((btn) => {
    btn.addEventListener('click', async () => {
      hideError();
      try {
        await auth.signInWithPopup(googleProvider);
        const modal = bootstrap.Modal.getInstance(authModal) || new bootstrap.Modal(authModal);
        modal.hide();
      } catch (err) {
        showError(mapFirebaseError(err));
      }
    });
  });
}

bindGoogleButtons();

// Cerrar sesión
if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error(err);
    }
  });
}

// React a cambios de sesión
auth.onAuthStateChanged((user) => {
  const loginBtnVisible = openLoginBtn && openLoginBtn.classList;
  const registerBtnVisible = openRegisterBtn && openRegisterBtn.classList;
  const userMenuVisible = userMenu && userMenu.classList;

  if (user) {
    // Mostrar icono de cuenta y ocultar botones
    if (loginBtnVisible) openLoginBtn.classList.add('d-none');
    if (registerBtnVisible) openRegisterBtn.classList.add('d-none');
    if (userMenuVisible) userMenu.classList.remove('d-none');

    // Nombre del usuario en el menú
    if (userDisplayName) {
      const name = user.displayName || user.email || 'Mi cuenta';
      userDisplayName.textContent = name;
    }
  } else {
    // Usuario no autenticado
    if (loginBtnVisible) openLoginBtn.classList.remove('d-none');
    if (registerBtnVisible) openRegisterBtn.classList.remove('d-none');
    if (userMenuVisible) userMenu.classList.add('d-none');
  }
});

// Mapeo de errores de Firebase a mensajes en español
function mapFirebaseError(err) {
  const code = err && err.code ? err.code : '';
  switch (code) {
    case 'auth/invalid-email':
      return 'Email no válido.';
    case 'auth/user-disabled':
      return 'Esta cuenta ha sido deshabilitada.';
    case 'auth/user-not-found':
      return 'Usuario no encontrado.';
    case 'auth/wrong-password':
      return 'Contraseña incorrecta.';
    case 'auth/email-already-in-use':
      return 'El email ya está en uso.';
    case 'auth/weak-password':
      return 'La contraseña es demasiado débil.';
    case 'auth/popup-closed-by-user':
      return 'Has cerrado la ventana de Google sin completar el acceso.';
    case 'auth/cancelled-popup-request':
      return 'Se ha cancelado la ventana emergente anterior.';
    default:
      return 'Ha ocurrido un error. Inténtalo de nuevo.';
  }
}
