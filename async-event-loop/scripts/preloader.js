export function showPreloader() {
  const container = document.createElement('div');
  container.classList.add('preloader');
  container.innerHTML = `
    <div class="lds-ripple"><div></div><div></div></div>
  `;
  return container;
}
