const perricosArray = []; //esto era const
const namePerricosArray = ["Lucas", "Ramon", "Mierdón"]

function renderPerricoArray(perricosList) {
  const dogList = document.querySelector('#dog-list');
  dogList.innerHTML = '';

  perricosList.forEach((dog, index) => {
    const htmlAdd = `<div class="card">
      <img src="${dog.perricoImg}" alt="Perro" />
      <h1>${dog.perricoName}</h1>
      <br />
      <p>❤️ 🤮</p>
      <button>Preciosísimo</button> <button>Feísisimo</button>
    </div>`;

    //console.log('innerHtml posición', index, dogList.innerHTML);

    dogList.innerHTML += htmlAdd;
  });
}

const addPerrico = async () => {
  const perricoImg = await getRandomDogImage();

  const randomNumber = Math.floor(Math.random() * 3)
  const perricoName = namePerricosArray[randomNumber]

  perricosArray.push({perricoImg, perricoName});

  console.log(perricoImg)
  console.log(perricoName)
  console.log(perricosArray)
  renderPerricoArray(perricosArray);
};


const addCincoPerrico = async () => {
  let cont = 0

  while(cont<=4){

    const perricoImg = await getRandomDogImage();

    const randomNumber = Math.floor(Math.random() * 3)
    const perricoName = namePerricosArray[randomNumber]

    perricosArray.push({perricoImg, perricoName});

    cont ++
  }
  
  renderPerricoArray(perricosArray);
};

renderPerricoArray(perricosArray);

selectedPerrico=null

function onlyOnePerrico(name){
  console.log(name)
  
  if(selectedPerrico === name){
    selectedPerrico = null
    renderPerricoArray(perricosArray)
  }else{
    selectedPerrico = name
    listOnlyMierdon = perricosArray.filter(function(perrico){
      return perrico.perricoName.includes(name)
    })
    console.log(listOnlyMierdon)
    renderPerricoArray(listOnlyMierdon)
  }
  
}

document.querySelector('#add-1-perrico').addEventListener('click', function () {
  addPerrico();
});

document.querySelector('#add-5-perrico').addEventListener('click', function () {
  addCincoPerrico();
});

document.querySelector('#perrico-lucas').addEventListener('click', function () {
  onlyOnePerrico(this.innerText);
});
document.querySelector('#perrico-mierdon').addEventListener('click', function () {
  onlyOnePerrico(this.innerText);
});
document.querySelector('#perrico-ramon').addEventListener('click', function () {
  onlyOnePerrico(this.innerText);
});

