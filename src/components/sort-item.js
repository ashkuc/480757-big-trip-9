import {createElement} from './utils.js';

export class SortItem {
  constructor(sortItem) {
    this._name = sortItem.name;
    this._isChecked = sortItem.isChecked;
    this._hasIcon = sortItem.hasIcon;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
  }

  getTemplate() {
    return `<div class="trip-sort__item  trip-sort__item--${this._name}">
      <input id="sort-${this._name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${this._name}"${this._isChecked ? ` checked` : ``}>
      <label class="trip-sort__btn" for="sort-${this._name}">
        ${this._name}
        ${this._hasIcon ? `<svg class="trip-sort__direction-icon" width="8" height="10" viewBox="0 0 8 10">
          <path d="M2.888 4.852V9.694H5.588V4.852L7.91 5.068L4.238 0.00999987L0.548 5.068L2.888 4.852Z"/>
        </svg>`.trim() : ``}
      </label>
    </div>`.trim();
  }
}
