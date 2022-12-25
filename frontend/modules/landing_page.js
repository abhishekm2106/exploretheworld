import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
 
}

//Implementation of fetch call
async function fetchCities() {
  try{
    let response =  await fetch(config.backendEndpoint+"/cities")
    return await response.json()
  } catch(e){
    console.log(e.message)
    return null
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  console.log(city)
  let card = document.createElement('a')
  card.className = "tile col-3"
  card.id = id
  card.href=`pages/adventures/?city=${id}`
  card.innerHTML = `<img src="${image}" alt="">
  <div class="tile-text">
      <p >${city}</p>
      <p >${description}</p>
  </div>`
let data = document.getElementById('data')

data.innerHTML += card.outerHTML;
}

export { init, fetchCities, addCityToDOM };
