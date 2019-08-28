import {createElement} from './utils.js';

export class MenuContainer {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
  }

  getTemplate() {
    return `<nav class="trip-controls__trip-tabs trip-tabs">
    </nav>`;
  }
}

// export const getMenu = (menu) => `<nav class="trip-controls__trip-tabs  trip-tabs">
//   ${menu.map((element) => `<a class="trip-tabs__btn${element.isActive ? ` trip-tabs__btn--active` : ``}" href="#">${toCapitalize(element.name)}</a>`.trim()).join(``)}
// </nav>`;
