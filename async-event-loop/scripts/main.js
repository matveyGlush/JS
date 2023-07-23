import { showPreloader } from './preloader.js';

const cssPromises = {};
const URL_FILM = 'https://swapi.dev/api/films/';


function loadResource(src) {
  if (src.endsWith('.js')) return import(src);
  if (src.endsWith('.css')) {
    if (!cssPromises[src]) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = src;
      link.id = src;
      cssPromises[src] = new Promise(resolve => {
        link.addEventListener('load', () => resolve());
      });
      document.head.append(link);
    }
    return cssPromises[src];
  }
  return fetch(src).then((res) => res.json());
}

const appContainer = document.getElementById('app');
const searchParams = new URLSearchParams(location.search);
const filmNumber = searchParams.get('filmNumber');

function renderPage(moduleName, apiUrl, css) {
  loadResource('../style/preloader.css');
  appContainer.append(showPreloader());
  Promise.all([moduleName, apiUrl, css].map(src => loadResource(src)))
    .then(async ([pageModule, data]) => {
      appContainer.innerHTML = '';
      appContainer.append(await pageModule.render(data));
      document.querySelectorAll('a, .button-more')
        .forEach((elem) => {
          elem.addEventListener('click', (event) => {
            event.preventDefault();
            const url = new URL(window.location);
            url.searchParams.set('filmNumber', elem.dataset.film);
            window.history.pushState({ filmNumber: elem.dataset.film }, '', url);
            window.dispatchEvent(new Event('popstate'));
          });
        });
    });
}

if (filmNumber) {
  renderPage(
    './film-details.js',
    `${URL_FILM}${filmNumber}`,
    '../style/episode-info.css',
  );
} else {
  renderPage(
    './film-list.js',
    URL_FILM,
    '../style/style.css',
  );
}

window.addEventListener('popstate', () => {
  const url = new URL(window.location);
  if (url.searchParams.has('filmNumber')) {
    renderPage(
      './film-details.js',
      `${URL_FILM}${url.searchParams.get('filmNumber')}`,
      '../style/episode-info.css',
    );
  } else {
    renderPage(
      './film-list.js',
      URL_FILM,
      '../style/style.css',
    );
  }

});
