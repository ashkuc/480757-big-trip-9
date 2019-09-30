import FilterContainer from '../filter-container.js';
import FilterItem from '../filter-item.js';
import {getFilterItems} from "../../data-info/sample-data";
import {Position, render} from '../utils.js';

export default class FilterController {
  constructor(previousElement, events) {
    this._previousElement = previousElement;
    this._events = events;
    this._filterItems = getFilterItems();
    this._filterContainer = new FilterContainer();
  }

  init() {
    const renderFilterItem = (filterItemInfo) => {
      const filterItem = new FilterItem(filterItemInfo);
      render(this._filterContainer.getElement().querySelector(`button[type="submit"]`), filterItem.getElement(), Position.BEFORE);
    }
    
    this._filterItems.forEach((filterItemInfo) => renderFilterItem(filterItemInfo));

    render(this._previousElement, this._filterContainer.getElement(), Position.AFTER);
  }
}