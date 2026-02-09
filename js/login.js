import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

// Config Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBhhhR5vG6LyAbZ1afLjyh4kluNQgzzgmI",
    authDomain: "login-test-master.firebaseapp.com",
    projectId: "login-test-master",
    storageBucket: "login-test-master.firebasestorage.app",
    messagingSenderId: "787134045837",
    appId: "1:787134045837:web:0b476c1d4aeaaae64f4cc4",
    measurementId: "G-SPPF1V9YLB"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Inputs
const userName = document.getElementById("email_user");
const userPassword = document.getElementById("password_user");
const emailSignInBtn = document.getElementById('email-signin-btn');
const emailSignUpBtn = document.getElementById('email-signup-btn');
//const anyade = document.getElementById('anyadir')

emailSignInBtn.addEventListener('click', async () => {
    const email = userName.value;
    const password = userPassword.value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in with email:', userCredential.user.email);
        //window.location.replace("../app/home.html");
    } catch (error) {
        console.error('Email sign in error:', error.message);
    }
});

emailSignUpBtn.addEventListener('click', async () => {
    const email = userName.value;
    const password = userPassword.value;

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User signed in with email:', userCredential.user.email);
        //window.location.replace("../app/home.html");
    } catch (error) {
        console.error('Email sign in error:', error.message);
    }
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log('usuario: ' + uid)
        window.location.replace("./app/home.html");
        
    } else {
        console.log('usuario no registrado')
    }
});