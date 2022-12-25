
import config from "../conf/index.js";

//Implementation to extract city from query params

function getCityFromURL(search) {
  // 1. Extract the city id from the URL's Query Param and return it
  let s = new URLSearchParams(search);
  return s.get('city')
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // 1. Fetch adventures using the Backend API and return the data

  try {
    let response = await fetch(config.backendEndpoint+"/adventures?city="+city)
    return await response.json()
  } catch (error) {
    console.log(error.message)
    return null
  }
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  console.log(adventures)
  let rowa = document.querySelector("#data")
  adventures.forEach(element => {
    let card = document.createElement('a')
    card.className = 'activity-card col-3'
    card.href = "detail/?adventure="+element.id
    card.id = element.id
    card.innerHTML = `
    <img  src="${element.image}" alt="">
    <p class="category-banner">${element.category}</p>
    <div class="w-100">
        <div class="w-100 d-flex justify-content-between">
            <p>${element.name}</p>
            <p>${element.costPerHead}</p>
        </div>
        <div class="w-100 d-flex justify-content-between">
            <p>duration</p>
            <p>${element.duration}</p>
        </div>
    </div>
    `
    rowa.appendChild(card)
  });
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM


}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(item=>(item.duration>=low && item.duration<=high))


}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter(item=>categoryList.includes(item.category))

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
if (filters.duration.length){
    let d = filters.duration.split("-")
    list = filterByDuration(list,d[0],d[1])
  }
  if (filters.category.length){
    list = filterByCategory(list,filters.category)
  }

  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  localStorage.setItem('filters',JSON.stringify(filters))
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  return JSON.parse(localStorage.getItem('filters'))
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let categoryPillSpace = document.getElementById('category-list')
  categoryPillSpace.innerHTML = ''
  filters.category.forEach(item=>{
    let pill = document.createElement('div')
    pill.className = 'category-filter'
    pill.innerHTML = item
    categoryPillSpace.appendChild(pill)
  })
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
