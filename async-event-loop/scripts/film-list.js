export function render(data) {
  const list = document.createElement('ul');
  list.classList.add('film-list');
  for (let i = 0; i < data.count; i++) {
    const item = document.createElement('li');
    item.innerHTML = `
      <a class="item-link" data-film="${i + 1}">
        <h2>${i > 10 ? i + 1 : `0${i + 1}`}</h2>
        <h3>${data.results[i].title}</h3>
        <p>
          ${data.results[i].opening_crawl}
        </p>
        <button class="button-more" data-film="${i + 1}">Read more</button>
      </a>
    `;
    list.append(item);
  }
  return list;
}
