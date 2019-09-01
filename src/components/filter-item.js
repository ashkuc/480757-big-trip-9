import AbstractComponent from './abstract-component.js';
import {toCapitalize} from './utils.js';

export default class extends AbstractComponent {
  constructor(filterItem) {
    super();
    this._name = filterItem.name;
    this._isChecked = filterItem.isChecked;
  }

  getTemplate() {
    return `<div class="trip-filters__filter">
      <input id="filter-${this._name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${this._name}"${this._isChecked ? ` checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${this._name}">${toCapitalize(this._name)}</label>
    </div>`.trim();
  }
}
