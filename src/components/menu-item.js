import AbstractComponent from './abstract-component.js';
import {toCapitalize} from './utils.js';

export class MenuItem extends AbstractComponent {
  constructor(menuItem) {
    super();
    this._name = menuItem.name;
    this._isActive = menuItem.isActive;
  }

  getTemplate() {
    return `<a class="trip-tabs__btn${this._isActive ? ` trip-tabs__btn--active` : ``}" href="#">${toCapitalize(this._name)}</a>`;
  }
}
