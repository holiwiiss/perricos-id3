import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { getFirestore, collection, getDoc, doc, setDoc, getDocs } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

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

const perricosNombres = []; //esto era const
const selector = document.getElementById("perrico-breed");
const btnCerrarSesion = document.getElementById("cerrar-sesion");
const allBreeds = []

let userid = ''



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
      
  } else {
      window.location.replace("../login.html");
  }
});

btnCerrarSesion.addEventListener('click', async () => {
  try {
    await signOut(auth);
    window.location.replace("../login.html");
  } catch (error) {
    console.error('Sign out error:', error.message);
  }
});


//----------------------------------------------------------------------------------------------------------------------------------------------------
//
//    Visualizar los perricos
//
//----------------------------------------------------------------------------------------------------------------------------------------------------

async function renderPerricoArray() {
  const dogList = document.querySelector('#dog-list');
  dogList.innerHTML = '';

  const querySnapshot = await getDocs(collection(db, "perretes"));
  querySnapshot.forEach((doc) => {
    const perro = doc.data();

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${perro.img}" alt="Perro" />
      <h2>${perro.nombre}</h2>
      <h3>Raza: ${perro.raza}</h3>
      <p>${perro.likes} ❤️</p>
    `;

    const btn = document.createElement('button');
    btn.textContent = 'Preciosísimo';
    btn.addEventListener('click', () => likePerrico(doc.id));

    card.appendChild(btn);
    dogList.appendChild(card);

  });
  
}

renderPerricoArray();

async function likePerrico(idPerrico){

  const userRef = doc(db, "users", userid);
  const userSnap = await getDoc(userRef);
  
  if (!userSnap.exists()) {
    console.log("No such document!");
    return
  }

  const usuario = userSnap.data()

  if(!usuario.likedDogs.includes(idPerrico)){
    usuario.likedDogs.push(idPerrico)
    await setDoc(userRef, usuario);

    const perricoRef = doc(db, "perretes", idPerrico);
    const perricoSnap = await getDoc(perricoRef);

    if (perricoSnap.exists()) {
      const perrico = perricoSnap.data();
      const likesActuales = perrico.likes || 0;
      await setDoc(perricoRef, {
        ...perrico,
        likes: likesActuales + 1
      });
    }
  }else{

    let indexPerrete = usuario.likedDogs.indexOf(idPerrico)
    usuario.likedDogs.splice(indexPerrete, 1);
    await setDoc(userRef, usuario)

    const perricoRef = doc(db, "perretes", idPerrico);
    const perricoSnap = await getDoc(perricoRef);

    if (perricoSnap.exists()) {
      const perrico = perricoSnap.data();
      const likesActuales = perrico.likes;
      await setDoc(perricoRef, {
        ...perrico,
        likes: likesActuales - 1
      });
    }

  }
  renderPerricoArray()
}

    

/*
async function renderSelector(){
  const breeds = await getRazas()
  
  breeds.forEach(breed => {
    const option = document.createElement("option");
    option.value = breed;
    option.textContent = breed;
    selector.appendChild(option);
  }); 
}

renderSelector()

document.querySelector('#buscador').addEventListener('input',function (e) {
  const palabra = e.target.value;
  if(palabra === ''){
    renderPerricoArray(perricosArray)
  }
  const arrayPerricosToShow = perricosArray.filter(function (dog){
    return dog.perricoName.includes(palabra)
  })
  renderPerricoArray(arrayPerricosToShow)

})*/