function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  return map;
}

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
  const endpoint = "https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json"
  const request = await fetch(endpoint)t
  const cities = await request.json()

  function findMatches(wordToMatch, cities){
      return cities.filter(place => {

          const regex = new RegExp(wordToMatch, 'gi'); //looks through string matching lower/uppercase
          return place.category.match(regex)  //checks if city or state matches
      });
  }

  function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  //called when someone changes value
  function displayMatches(event){
      const matchArray = findMatches(event.target.value, cities);
      const html = matchArray.map(place => {
          return `
              <li class="box gradient">
                  <p class="rest-name">${place.name.toLowerCase()}</p>
                  <p class="category">${place.category}</p>
                  <p class="address">${place.address_line_1}</p>
                  <p class="name">${place.city}, ${place.state}</p>
                  <p class="address">${place.zip}</p>
              </li>
          `;
      }).join('');
      suggestions.innerHTML = html;
  }

  const searchInput = document.querySelector('.input');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => {displayMatches(evt)});
}

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
}

window.onload = windowActions;