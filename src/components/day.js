import {createElement} from './utils.js';

export class Day {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    
    return this._element;
  }

  getTemplate() {
    return `<li class="trip-days__item day">     
    </li>`.trim();
  }
}
