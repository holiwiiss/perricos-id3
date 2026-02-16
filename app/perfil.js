import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { getFirestore, collection, getDoc, doc, setDoc, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

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
const db = getFirestore(app);

let userid = ''
const btnCerrarSesion = document.getElementById("cerrar-sesion");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    userid = user.uid;
    console.log('Hola: ' + userid)
    
    let isUserExist = false;

    const todosUser = await getDocs(collection(db, "users"));
    todosUser.forEach((docSnap) => {
      if (docSnap.id === userid) {
        isUserExist = true;
      }
    });

  if(!isUserExist){
    await setDoc(doc(db, "users", userid), {
      likedDogs: [],
      email: user.email,
  });
}
    showUserLikedDogs(userid)

  } else {
    window.location.replace("../login.html");
  }
});


async function showUserLikedDogs(user){
  
    const userRef = doc(db, "users", userid);
    const userSnap = await getDoc(userRef);
    const swiperWrapper = document.querySelector(".swiper-wrapper")

    if (!userSnap.exists()) {
      console.log("No such document!");
      return
    }
  
    const usuario = userSnap.data()
    const perretesLiked = [...usuario.likedDogs];

    perretesLiked.forEach(async function (perrete){
      const perricoRef = doc(db, "perretes", perrete);
      const perricoSnap = await getDoc(perricoRef);

      if(!perricoSnap.exists()){
        console.log('No existe el perrito')
      }
      const perrico = perricoSnap.data();

      const swiperSlide = document.createElement("div");
      swiperSlide.classList.add("swiper-slide");
      const imgPerrete = document.createElement("img");
      imgPerrete.src = perrico.img;
      swiperSlide.appendChild(imgPerrete);
      swiperWrapper.appendChild(swiperSlide);
      
    })

  swiper.update();
}

btnCerrarSesion.addEventListener('click', async () => {
  try {
    await signOut(auth);
    window.location.replace("../login.html");
  } catch (error) {
    console.error('Sign out error:', error.message);
  }
});


const swiper = new Swiper('.swiper', {
  // Optional parameters
    direction: 'horizontal',
    loop: true,

  // Navigation arrows
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },

});

