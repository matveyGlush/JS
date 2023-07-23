import Card from './CardClass.js';

export default class AmazingCard extends Card {

  constructor(container, number, action) {
    super(container, number, action);
    this.card.textContent = '';
    this.number = number;
  }

  cardsImgArr = [
    './img/Chess_default.png',
    'https://upload.wikimedia.org/wikipedia/commons/a/af/Chess_qdt60.png',
    'https://upload.wikimedia.org/wikipedia/commons/f/f1/Chess_ndt60.png',
  ]

  set number(value) {
    this._number = value;

    const _img = document.createElement('img');
    _img.classList.add('chess-img');
    _img.src = this.cardsImgArr[value]
    _img.onload = () => {
      this.card.append(_img);
    }
    _img.onerror = (event) => {
      console.log(event);
      _img.src = this.cardsImgArr[0];
      this.card.append(_img);
      this.card.append(`${this._number}`);
    }
  }

  get number() {
    return this._number;
  }

  set open(value) {
    this._open = value;
    if(value) {
      this.card.classList.add('open');
      this.card.firstElementChild.classList.add('show-img');
    } else {
      this.card.classList.remove('open');
      this.card.firstElementChild.classList.remove('show-img');
    }
  }

  get open() {
    return this._open;
  }

  set success(value) {
    this._success = value;
    if(value) {
      this.card.classList.add('success');
      this.card.firstElementChild.classList.add('show-img')
    }
  }

  get success() {
    return this._success;
  }
}
