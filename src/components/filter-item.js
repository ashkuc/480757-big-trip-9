import {createElement, toCapitalize} from './utils.js';

export class FilterItem {
  constructor(filterItem) {
    this._name = filterItem.name;
    this._isChecked = filterItem.isChecked;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
  }

  getTemplate() {
    return `<div class="trip-filters__filter">
      <input id="filter-${this._name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${this._name}"${this._isChecked ? ` checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${this._name}">${toCapitalize(this._name)}</label>
    </div>`.trim();
  }
}