import {Position, render} from '../utils';
import {getSortItems} from '../../data-info/sample-data.js';
import SortContainer from '../sort-container.js';
import SortItem from '../sort-item.js';

export default class SortController {
  constructor(container, events, onSortEvents) {
    this._container = container;
    this._events = events;
    this._onSortEvents = onSortEvents;
    this._sortItems = getSortItems();
    this._sortContainer = new SortContainer();
  }

  init() {
    this._renderSort();
  }

  _renderSortItem(sortItemInfo) {
    const sortItem = new SortItem(sortItemInfo);
    render(this._sortContainer.getElement().querySelector(`span:last-child`), sortItem.getElement(), Position.BEFORE);
  }

  _renderSort() {
    this._sortItems.forEach((sortItemInfo) => this._renderSortItem(sortItemInfo));
    this._sortContainer.getElement().addEventListener(`click`, this._onSortItemClick);
    render(this._container.querySelector(`h2`), this._sortContainer.getElement(), Position.AFTER);
  }

  _onSortItemClick(evt) {
    if (evt.target.tagName === `INPUT`) {
      this._onSortEvents(evt.target.getAttribute(`data-sort-type`));
    }
  }

  // _onSortItemClick(evt) {
  //   if (evt.target.tagName === `INPUT`) {
  //     unrender(this._daysList.getElement());
  //     this._daysList.removeElement();
  //     this._subscriptions.forEach((item) => item.destroyFlatpickr());
  //     this._currentSortType = evt.target.getAttribute(`data-sort-type`);
  //     this._reRenderDaysList();
  //   }
  // }

  _sortEvents() {
    switch (this._currentSortType) {
      case `event`:
        this._eventsForRender = new Array(...this._events);
        this._sortContainer.getElement().querySelector(`.trip-sort__item--day`).textContent = `day`;
        break;
      case `time`:
        this._eventsForRender = this._events.slice().sort((a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime());
        this._sortContainer.getElement().querySelector(`.trip-sort__item--day`).textContent = ``;
        break;
      case `price`:
        this._eventsForRender = this._events.slice().sort((a, b) => a.basePrice - b.basePrice);
        this._sortContainer.getElement().querySelector(`.trip-sort__item--day`).textContent = ``;
        break;
    }
  }
}
