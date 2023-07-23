import { showPreloader } from './preloader';

function loadDetails(list) {
  return Promise.all(list.map((src) => fetch(src).then((res) => res.json())))
    .then((resList) => resList);
}

function createDomStructure(species, planets, starships, characters, data) {
  const buttonBack = document.createElement('button');
  buttonBack.classList.add('button-back');
  buttonBack.textContent = 'back to episodes';
  buttonBack.addEventListener('click', () => {
    window.history.back();
  });

  const episodeName = document.createElement('h1');
  episodeName.textContent = data.title;
  episodeName.style.display = 'block';
  const description = document.createElement('p');
  description.textContent = data.opening_crawl;
  const container = document.createElement('div');
  container.classList.add('film-details-container');
  const ulWrapper = document.createElement('div');
  ulWrapper.classList.add('ul-wrap');
  const speciesList = document.createElement('ul');
  speciesList.ariaLabel = 'SPECIES:';
  const planetsList = document.createElement('ul');
  planetsList.ariaLabel = 'PLANETS:';
  const starshipsList = document.createElement('ul');
  starshipsList.ariaLabel = 'STARSHIPS:';
  const charactersList = document.createElement('ul');
  charactersList.ariaLabel = 'CHARACTERS:';
  species.forEach((elem) => {
    const item = document.createElement('li');
    item.textContent = elem.name;
    speciesList.append(item);
  });
  planets.forEach((elem) => {
    const item = document.createElement('li');
    item.textContent = elem.name;
    planetsList.append(item);
  });
  starships.forEach((elem) => {
    const item = document.createElement('li');
    item.textContent = elem.name;
    starshipsList.append(item);
  });
  characters.forEach((elem) => {
    const item = document.createElement('li');
    item.textContent = elem.name;
    charactersList.append(item);
  });
  ulWrapper.append(charactersList, starshipsList, speciesList, planetsList);
  container.append(buttonBack, episodeName, description, ulWrapper);
  return container;
}

export function render(data) {
  document.getElementById('app').innerHTML = '';
  document.getElementById('app').append(showPreloader());
  return Promise.all([data.species, data.planets, data.starships, data.characters]
    .map((list) => loadDetails(list)))
    .then(([species, planets, starships, characters]) => createDomStructure(
      species, planets, starships, characters, data,
    ));
}
