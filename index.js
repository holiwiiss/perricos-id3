const perricosArray = []; //esto era const
const namePerricosArray = [{name:"Princesita", isSelected:false}, {name:"Ramon", isSelected: false}, {name:"Mierdon", isSelected:false}, {name:"Cuqui", isSelected:false}, {name:"Turron", isSelected: false}]
const perricosFiltrados = []
const selector = document.getElementById("perrico-breed");
const allBreeds = []
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
      <h3>Raza: ${dog.perricoBreed} </h3>
      <br />
      <p>${dog.like}❤️ ${dog.dislike}🤮</p>
      <div>
      <button class="${dog.isLiked ? 'btn-like' : 'btn-unselected'}" onClick="likePerrico(${index})">Preciosísimo</button> 
      <button class="${dog.isDisliked ? 'btn-dislike' : 'btn-unselected'}" onClick="dislikePerrico(${index})">Feísisimo</button>
      </div>
    </div>`;
    //console.log('innerHtml posición', index, dogList.innerHTML);

    dogList.innerHTML += htmlAdd;
  });
}

renderPerricoArray(perricosArray);

function renderBotonesPerricos(){
  const buttons = document.querySelector('.name-perricos');
  buttons.innerHTML = '';

  namePerricosArray.forEach((nombre,index)=>{
    const htmlAdd = `<button class="${nombre.isSelected ? 'btn-selected' : 'btn-perricos'}" onclick="onlyOnePerrico(${index})">${nombre.name}</button>`

    buttons.innerHTML += htmlAdd;
  });
}

//----------------------------------------------------------------------------------------------------------------------------------------------------
//
//    Get un perrico
//
//----------------------------------------------------------------------------------------------------------------------------------------------------

const getPerrico = async () => {

  const perricoImg = await getRandomDogImage();

  const randomNumber = Math.floor(Math.random() * 5)
  const perricoName = namePerricosArray[randomNumber].name

  const randomNumber2 = Math.floor(Math.random() * 10)
  const randomNumber3 = Math.floor(Math.random() * 10)

  let perricoBreed = ''
  selector.value != 'random' ? perricoBreed = selector.value : perricoBreed= allBreeds[Math.floor(Math.random() * 164)]

  perricosArray.push({perricoImg, perricoName, perricoBreed, isLiked:false, like:randomNumber2, isDisliked:false, dislike:randomNumber3});
};

const getRazas= async () => {
  const breeds= await getAllBreeds()
  
  Object.keys(breeds).forEach(breed => {
    const subreed = breeds[breed];

    if(subreed.length === 0){
      allBreeds.push(breed)
    }else {
      subreed.forEach(sub => {
        allBreeds.push(breed + ' ' + sub)
      });
    }
  });
  return allBreeds;
};

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
//----------------------------------------------------------------------------------------------------------------------------------------------------
//
//    Añadir un perrico
//
//----------------------------------------------------------------------------------------------------------------------------------------------------

const addPerrico = async () => {
  await getPerrico()
  renderBotonesPerricos()
  renderPerricoArray(perricosArray);
};

//----------------------------------------------------------------------------------------------------------------------------------------------------
//
//    Añadir cinco perricos
//
//----------------------------------------------------------------------------------------------------------------------------------------------------

const addCincoPerrico = async () => {
  
  for(let i= 0; i<5; i++){
    await getPerrico()
  }
  renderBotonesPerricos()
  renderPerricoArray(perricosArray);
};

//----------------------------------------------------------------------------------------------------------------------------------------------------
//
//    Seleccionar el perrico
//
//----------------------------------------------------------------------------------------------------------------------------------------------------

function onlyOnePerrico(index){
  
  namePerricosArray[index].isSelected = !namePerricosArray[index].isSelected

  const selectedPerricosNames = namePerricosArray.filter(boton => boton.isSelected).map(boton => boton.name)

  if(selectedPerricosNames.length ===0){
    renderBotonesPerricos()
    renderPerricoArray(perricosArray)
    return
  }

  const arrayPerricosToShow = perricosArray.filter(function (dog){
    return selectedPerricosNames.includes(dog.perricoName)
  })

  renderBotonesPerricos()
  renderPerricoArray(arrayPerricosToShow)
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

/*function enableAllButtons(){
  document.querySelectorAll('.btn-perricos').addEventListener('click',  function () {
    this.disabled = false
  })
}
function disableAllButtons(){
  document.querySelectorAll('.btn-perricos').addEventListener('click',  function () {
    this.disabled = true
  })
}*/


document.querySelector('#add-1-perrico').addEventListener('click', async function () {
  //disableAllButtons()
  await addPerrico();
  //enableAllButtons()
});

document.querySelector('#add-5-perrico').addEventListener('click', async function () {
  //disableAllButtons()
  await addCincoPerrico();
  //enableAllButtons()
});

document.querySelector('#buscador').addEventListener('input',function (e) {
  const palabra = e.target.value;
  if(palabra === ''){
    renderPerricoArray(perricosArray)
  }
  const arrayPerricosToShow = perricosArray.filter(function (dog){
    return dog.perricoName.includes(palabra)
  })
  renderPerricoArray(arrayPerricosToShow)

})