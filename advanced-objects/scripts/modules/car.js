class Details {
  constructor(name, price, country) {
    this.name = name;
    this.price = price;
    this.country = country;
  }
  showInfo() {
    console.log(`${this.name} - ${this.price} - ${this.country}`);
  }
  showText(txt) {
    return txt;
  }
}

class EngineElem extends Details {
  constructor (bestBefore) {
    super();
    this.bestBefore = bestBefore;
  }
  get start() {
    return `Brrrrr!`;
  }
  get stop() {
    return `... silence`;
  }
}

export default class Pipe extends EngineElem {
  constructor () {
    super();
  }
}
