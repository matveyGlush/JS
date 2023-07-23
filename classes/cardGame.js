// import Card from './CardClass.js';
import AmazingCard from './AmazingCardClass.js';

function newGame(container, cardsCount) {
  let timerId;

  function stopTimer() {
    clearInterval(timerId);
  }
  stopTimer();

  document.getElementById('timer__value').textContent = '60';

  // eslint-disable-next-line no-use-before-define
  timerId = setInterval(timer, 1000);
  let cardsNumberArray = [];
  let firstCard = null;
  let secondCard = null;

  for (let i = 1; i <= cardsCount / 2; i++) {
    cardsNumberArray.push(i);
    cardsNumberArray.push(i);
  }

  function flip(card) {
    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number !== secondCard.number) {
        firstCard.open = false;
        secondCard.open = false;
        firstCard = null;
        secondCard = null;
      }
    }

    if (firstCard == null) {
      firstCard = card;
    } else if (secondCard == null) {
      secondCard = card;
    }

    if (firstCard !== null && secondCard !== null) {
      if (firstCard.number === secondCard.number) {
        firstCard.success = true;
        secondCard.success = true;
        firstCard = null;
        secondCard = null;
      }
    }

    if (document.querySelectorAll('.card.success').length === cardsNumberArray.length) {
      setTimeout(() => {
        alert('Victory');
        container.innerHTML = '';
        cardsNumberArray = [];
        firstCard = null;
        secondCard = null;
        newGame(document.getElementById('game'), 4);
      }, 150);
    }
  }

  cardsNumberArray = cardsNumberArray.sort(() => Math.random() - 0.5);
  for (const cardNumber of cardsNumberArray) {
    // eslint-disable-next-line no-new
    new AmazingCard(container, cardNumber, flip);
  }

  function timer() {
    const time = document.getElementById('timer__value');
    time.textContent = `${time.textContent - 1}`;
    if (time.textContent === '0') {
      stopTimer();
      time.textContent = '60';
      alert('Busted');
      container.innerHTML = '';
      cardsNumberArray = [];
      firstCard = null;
      secondCard = null;
      newGame(document.getElementById('game'), 4);
    }
  }
}

newGame(document.getElementById('game'), 4);
