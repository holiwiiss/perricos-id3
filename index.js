const perricosArray = []; //esto era const
const namePerricosArray = ["Princesita", "Ramon", "Mierdon", "Cuqui", "Turron"]

//----------------------------------------------------------------------------------------------------------------------------------------------------
//
//    Visualizar los perricos
//
//----------------------------------------------------------------------------------------------------------------------------------------------------

function renderPerricoArray(perricosList) {
  const dogList = document.querySelector('#dog-list');
  dogList.innerHTML = '';

  perricosList.forEach((dog, index) => {
    const htmlAdd = `<div class="card">
      <img src="${dog.perricoImg}" alt="Perro" />
      <h2>${dog.perricoName}</h2>
      <br />
      <p>${dog.like}❤️ ${dog.dislike}🤮</p>
      <div>
      <button class="${dog.initialLike !== dog.like ? 'btn-like' : 'btn-unselected'}" onClick="likePerrico(${index})">Preciosísimo</button> 
      <button class="${dog.initialDislike !== dog.dislike ? 'btn-dislike' : 'btn-unselected'}" onClick="dislikePerrico(${index})">Feísisimo</button>
      </div>
    </div>`;
    console.log(dog.initialLike)
    console.log(dog.like)
    //console.log('innerHtml posición', index, dogList.innerHTML);

    dogList.innerHTML += htmlAdd;
  });
}

renderPerricoArray(perricosArray);

//----------------------------------------------------------------------------------------------------------------------------------------------------
//
//    Añadir un perrico
//
//----------------------------------------------------------------------------------------------------------------------------------------------------

const addPerrico = async () => {
  const perricoImg = await getRandomDogImage();

  const randomNumber = Math.floor(Math.random() * 5)
  const perricoName = namePerricosArray[randomNumber]

  const randomNumber2 = Math.floor(Math.random() * 10)
  const randomNumber3 = Math.floor(Math.random() * 10)

  perricosArray.push({perricoImg, perricoName, isLiked:false, initialLike:randomNumber2, like:randomNumber2, isDisliked:false, initialDislike:randomNumber3, dislike:randomNumber3});

  console.log(perricoImg)
  console.log(perricoName)
  console.log(perricosArray)

  renderPerricoArray(perricosArray);
};

//----------------------------------------------------------------------------------------------------------------------------------------------------
//
//    Añadir cinco perricos
//
//----------------------------------------------------------------------------------------------------------------------------------------------------

const addCincoPerrico = async () => {
  let cont = 0

  while(cont<=4){

    const perricoImg = await getRandomDogImage();

    const randomNumber = Math.floor(Math.random() * 5)
    const perricoName = namePerricosArray[randomNumber]

    const randomNumber2 = Math.floor(Math.random() * 10)
    const randomNumber3 = Math.floor(Math.random() * 10)

    perricosArray.push({perricoImg, perricoName,  isLiked:false, initialLike:randomNumber2, like:randomNumber2, isDisliked:false, initialDislike:randomNumber3, dislike:randomNumber3});

    cont ++
  }
  
  renderPerricoArray(perricosArray);
};

//----------------------------------------------------------------------------------------------------------------------------------------------------
//
//    Seleccionar el perrico
//
//----------------------------------------------------------------------------------------------------------------------------------------------------

let selectedPerrico=null

function onlyOnePerrico(name){
  console.log(name)
  
  if(selectedPerrico === name){
    selectedPerrico = null
    renderPerricoArray(perricosArray)
  }else{
    selectedPerrico = name
    listOnlyPerrico = perricosArray.filter(function(perrico){
      return perrico.perricoName.includes(name)
    })
    console.log(listOnlyPerrico)
    renderPerricoArray(listOnlyPerrico)
  }
}

//----------------------------------------------------------------------------------------------------------------------------------------------------
//
//    Likear y Dislikear perricos
//
//----------------------------------------------------------------------------------------------------------------------------------------------------

function likePerrico(index){

  if(perricosArray[index].isLiked){
    perricosArray[index].isLiked = false
    perricosArray[index].like -= 1 
  }else{
    perricosArray[index].isLiked = true
    perricosArray[index].like += 1 
  }

  renderPerricoArray(perricosArray)
  console.log(perricosArray[index])
  console.log(perricosArray[index].like)
}

function dislikePerrico(index){

  if(perricosArray[index].isDisliked){
    perricosArray[index].isDisliked = false
    perricosArray[index].dislike -= 1 
  }else{
    perricosArray[index].isDisliked = true
    perricosArray[index].dislike += 1
  }
  renderPerricoArray(perricosArray)
}

//----------------------------------------------------------------------------------------------------------------------------------------------------
//
//    Asinagión de botones
//
//----------------------------------------------------------------------------------------------------------------------------------------------------

document.querySelector('#add-1-perrico').addEventListener('click', function () {
  addPerrico();
});

document.querySelector('#add-5-perrico').addEventListener('click', function () {
  addCincoPerrico();
});

const btnLucas = document.querySelector('#perrico-lucas')
const btnMierdon = document.querySelector('#perrico-mierdon')
const btnRamon = document.querySelector('#perrico-ramon')
const btnCuqui = document.querySelector('#perrico-cuqui')
const btnTurron = document.querySelector('#perrico-turron')

btnLucas.addEventListener('click', function () {
  onlyOnePerrico(this.innerText);
  if(perricosArray.length){
    btnLucas.classList.toggle('btn-selected')
    btnMierdon.classList.remove('btn-selected')
    btnRamon.classList.remove('btn-selected')
    btnCuqui.classList.remove('btn-selected')
    btnTurron.classList.remove('btn-selected')
  }
});

btnMierdon.addEventListener('click', function () {
  onlyOnePerrico(this.innerText);
  if(perricosArray.length){
    btnLucas.classList.remove('btn-selected')
    btnMierdon.classList.toggle('btn-selected')
    btnRamon.classList.remove('btn-selected')
    btnCuqui.classList.remove('btn-selected')
    btnTurron.classList.remove('btn-selected')
  }
});

btnRamon.addEventListener('click', function () {
  onlyOnePerrico(this.innerText);
  if(perricosArray.length){
    btnLucas.classList.remove('btn-selected')
    btnMierdon.classList.remove('btn-selected')
    btnRamon.classList.toggle('btn-selected')
    btnCuqui.classList.remove('btn-selected')
    btnTurron.classList.remove('btn-selected')
  }
});

btnCuqui.addEventListener('click', function () {
  onlyOnePerrico(this.innerText);
  if(perricosArray.length){
    btnLucas.classList.remove('btn-selected')
    btnMierdon.classList.remove('btn-selected')
    btnRamon.classList.remove('btn-selected')
    btnCuqui.classList.toggle('btn-selected')
    btnTurron.classList.remove('btn-selected')
  }
});

btnTurron.addEventListener('click', function () {
  onlyOnePerrico(this.innerText);
  if(perricosArray.length){
    btnLucas.classList.remove('btn-selected')
    btnMierdon.classList.remove('btn-selected')
    btnRamon.classList.remove('btn-selected')
    btnCuqui.classList.remove('btn-selected')
    btnTurron.classList.toggle('btn-selected')
  }
});
