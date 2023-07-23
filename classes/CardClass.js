export default class Card {
  _open = false;
  _success = false;
  _number;

  constructor(container, number, action) {
    this._number = number;
    this.createElement(container, action)
  }

  createElement(container, action) {
    this.card = document.createElement('div');
    this.card.classList.add('card');
    this.card.textContent = this.number;
    this.card.addEventListener('click', () => {
      if (this.open === false && this.success === false) {
        this.card.classList.add('open');
        this.open = true;
        action(this);
      }
    });
    container.append(this.card);
  }

  set open(value) {
    this._open = value;
    value ? this.card.classList.add('open') : this.card.classList.remove('open');
  }
  get open() {
    return this._open;
  }
  set success(value) {
    this._success = value;
    value ? this.card.classList.add('success') : this.card.classList.remove('success');
  }
  get success() {
    return this._success;
  }
  set number(value) {
    this._number = value;
  }
  get number() {
    return this._number;
  }
}
