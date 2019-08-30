import {createElement, toCapitalize} from './utils.js';

export class MenuItem {
  constructor(menuItem) {
    this._name = menuItem.name;
    this._isActive = menuItem.isActive;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<a class="trip-tabs__btn${this._isActive ? ` trip-tabs__btn--active` : ``}" href="#">${toCapitalize(this._name)}</a>`;
  }
}
