const characterInput = document.querySelector('.name-input')
const characterSearchButton = document.querySelector('.name-search-button')
characterSearchButton.addEventListener('click', charSearch)
const searchClearButton = document.querySelector('.clear-search-button')
searchClearButton.addEventListener('click', clearSearch)

const charName = document.querySelector('.char-name')
const charGender = document.querySelector('.char-gender')
const charHeight = document.querySelector('.char-height')
const charMass = document.querySelector('.char-mass')
const charHomeworld = document.querySelector('.char-homeworld')
const charSection = document.querySelector('.char-section')

let searchedChar
let char
let characters = []

function charSearch() {
    searchedChar = characterInput.value
    getCharData(searchedChar)
}

async function getCharData(searchedChar) {
    const baseUrl = 'https://swapi.dev/api/people/?search=' +searchedChar
    const response = await fetch(baseUrl)
    const data = await response.json()
    const fCharHomeworldUrl = data.results[0].homeworld
   
    const fCharName = data.results[0].name
    const fCharGender = data.results[0].gender
    const fCharHeight = data.results[0].height
    const fCharMass = data.results[0].mass
    const fCharHomeWorld = await getCharPlanet(fCharHomeworldUrl)
        
    async function getCharPlanet(fCharHomeworldUrl) {
        const baseUrlWorld = fCharHomeworldUrl
        const responseWorld = await fetch(baseUrlWorld)
        const dataWorld = await responseWorld.json()
        const getCharPlanetName = dataWorld.name
        return getCharPlanetName
    }

//Skapar ett objekt med karaktärsdata...
char = {
    name: fCharName,
    gender: fCharGender,
    height: fCharHeight,
    mass: fCharMass,
    homeWorld: fCharHomeWorld
    };    

//Lägger till char i en lista, om char inte redan finns där.
let exists = false;

for (let i = 0; i < characters.length; i++) {
    if (characters[i].name === char.name) {
        exists = true;
        break;
    }
}

if (!exists) {
    characters.push(char);
    addDiv()
} else {
    console.log("Karaktären finns redan i listan!");
}
}

//Skapar div:ar med egenskaper från objektet char
function addDiv() {
    
    const div = document.createElement("div");
    div.classList.add("char");
  
    const h2 = document.createElement("h2");
    h2.classList.add("char-name");
    h2.textContent = char.name;
  
    const genderP = document.createElement("p");
    genderP.classList.add("char-gender");
    genderP.textContent = "Gender: " + char.gender;
  
    const heightP = document.createElement("p");
    heightP.classList.add("char-height");
    heightP.textContent = "Height: " + char.height + " cm";
  
    const massP = document.createElement("p");
    massP.classList.add("char-mass");
    massP.textContent = "Mass: " + char.mass + " kg";
  
    const homeWorldP = document.createElement("p");
    homeWorldP.classList.add("char-homeworld");
    homeWorldP.textContent = "Homeworld: " + char.homeWorld;
  
    div.appendChild(h2);
    div.appendChild(genderP);
    div.appendChild(heightP);
    div.appendChild(massP);
    div.appendChild(homeWorldP);
  
    charSection.appendChild(div);

}

//Rensar listorna
function clearSearch() {
    characters.length = 0
    charSection.innerHTML = ""
}
