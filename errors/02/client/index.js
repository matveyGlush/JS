(() => {
  window.addEventListener('DOMContentLoaded', () => {
    const URL_PRODUCTS = 'http://localhost:3000/api/products?status=200&json_invalid=false';
    const ERR_EMPTY = 404;
    const ERR_INVALID_JSON = 490;
    const ERR_INTERNET_CONNECTION = 498;
    const ERR_SERVER = 500;

    function render(data) {
      const container = document.getElementById('container');
      container.innerHTML = '';

      data.products.forEach((elem) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.style.width = '18rem';
        card.style.marginBottom = '20px';
        card.innerHTML = `
          <img src="${elem.image}" class="card-img-top" alt="product image">
          <div class="card-body">
            <h5 class="card-title">${elem.name}</h5>
            <p class="card-text">${elem.price}</p>
          </div>
        `;
        container.append(card);
      });
    }

    function pushWarning(code) {
      let message;
      switch (code) {
        case ERR_EMPTY:
          message = 'list of products is empty !!!';
          break;
        case ERR_INVALID_JSON:
          message = 'Invalid JSON just has came from the server, you can do nothing about it, try later';
          break;
        case ERR_INTERNET_CONNECTION:
          message = 'you are offline. check internet connection';
          break;
        case ERR_SERVER:
          message = 'Server error, please try later -_-';
          break;
        default:
          message = 'Check your internet connection or try later :}';
      }

      const warning = document.createElement('div');
      warning.classList.add('toast');
      warning.role = 'alert';
      warning.ariaLive = 'assertive';
      warning.ariaAtomic = 'true';
      warning.style.opacity = '1';
      warning.innerHTML = `
        <div class="toast-body" style="background-color: lightpink;">
          ${message}
        </div>
      `;
      document.querySelector('.toast-container').append(warning);
      setTimeout(() => {
        warning.remove();
      }, 3000);
    }

    let tryCounter = 0;
    async function createList(tryAgain = false) {
      if (tryAgain) {
        tryCounter += 1;
      } else tryCounter = 0;

      try {
        document.getElementById('spinner').style.display = '';
        let response = await fetch(URL_PRODUCTS);
        if (!response.ok) {
          const err = new Error();
          err.code = response.status;
          throw err;
        }
        try {
          response = await response.json();
          render(response);
        } catch (error) {
          error.code = ERR_INVALID_JSON;
          pushWarning(error.code);
        } finally {
          document.getElementById('spinner').style.display = 'none';
        }
      } catch (err) {
        if (err.code === ERR_SERVER && tryCounter < 3) {
          if (tryCounter === 2) {
            pushWarning(ERR_SERVER);
            return;
          }
          await createList(true);
          return;
        }
        pushWarning(err.code);
      } finally {
        console.log('finally');
        document.getElementById('spinner').style.display = 'none';
      }
    }
    createList();

    window.addEventListener('offline', () => pushWarning(ERR_INTERNET_CONNECTION));
  });
})();
