import {createElement} from './utils.js';

export class MenuContainer {
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
    return `<nav class="trip-controls__trip-tabs trip-tabs">
    </nav>`.trim();
  }
}
