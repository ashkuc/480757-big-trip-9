import {createElement} from './utils.js';

export class EventsList {
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
    return `<ul class="trip-events__list">
    </ul>`.trim();
  }
}