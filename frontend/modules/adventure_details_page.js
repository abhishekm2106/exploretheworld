import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let s = new URLSearchParams(search);
  return s.get('adventure')
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  try {
    let response = await fetch(config.backendEndpoint+"/adventures/detail?adventure="+adventureId)
    let r = await response.json()
    return r;
  } catch (error) {
    console.log(error.message)
    return null
  }

}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let name = document.querySelector('#adventure-name')
  name.textContent = adventure.name

  let subTitle = document.querySelector('#adventure-subtitle')
  subTitle.textContent = adventure.subtitle

  let content = document.querySelector('#adventure-content')
  content.textContent = adventure.content

  let pg = document.querySelector("#photo-gallery")

  adventure.images.forEach(item=>{
    let img = document.createElement('div')
    img.style.backgroundImage = `url(${item})`
    img.style.backgroundRepeat = 'no-repeat'
    img.style.backgroundSize = 'cover'
    img.style.backgroundPosition = 'center'
    img.style.backgroundRepeat
    img.className = 'activity-card-image'
    pg.appendChild(img)
  })
  console.log(adventure)

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let pg = document.querySelector("#photo-gallery")
  pg.innerHTML = `<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
</div>
  <div class="carousel-inner">

  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`

let ci = document.querySelector('.carousel-indicators')
for(let i=0;i<images.length;i++){
  ci.innerHTML+= `<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" ${i==0?'class="active" aria-current="true"':''}></button>
  `
}

let cinner = document.querySelector('.carousel-inner')
for(let i=0;i<images.length;i++){
  cinner.innerHTML+= `<div class="carousel-item ">
  <img class="activity-card-image" src="${images[i]}" class="d-block w-100" alt="...">
</div>`
}

let citem = document.querySelector('.carousel-item')
citem.className = "carousel-item active"

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
  document.querySelector('#reservation-panel-sold-out').style.display ='none'
  document.querySelector('#reservation-panel-available').style.display ='block'
  document.querySelector('#reservation-person-cost').innerHTML = adventure.costPerHead
  }else{
    document.querySelector('#reservation-panel-sold-out').style.display ='block'
  document.querySelector('#reservation-panel-available').style.display ='none'

  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.querySelector('#reservation-cost').innerHTML = adventure.costPerHead*persons

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  document.getElementById('myForm').addEventListener('submit',async (e)=>{
    e.preventDefault()
    //let s = new URLSearchParams(window.location.search)
    let body = {
      name:document.getElementsByName("name")[0].value, 
      date:document.getElementsByName("date")[0].value, 
      person:document.getElementsByName("person")[0].value, 
      adventure:adventure.id
    }

    let  response = await fetch(config.backendEndpoint + "/reservations/new", {
      method:"POST",
      headers:{
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify(body)
    })
    if (response.status===200){
      alert("Success!")
    }else{
      alert("Failed!")
    }

  })
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let banner = document.getElementById("reserved-banner")
  adventure.reserved ? banner.style.display = 'block' :  banner.style.display = 'none'

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
