import {Position, render, unrender} from '../utils.js';
import {getSortItems} from '../../data-info/sample-data.js';
import DaysList from '../days-list.js';
import Day from '../day.js';
import EventsList from '../events-list.js';
import SortContainer from '../sort-container.js';
import SortItem from '../sort-item.js';
import NoEvents from '../no-events.js';
import EventController from './event';

export default class {
  constructor(container, events) {
    this._container = container;
    this._events = events;
    this._eventsForRender = new Array(...this._events);
    this._daysList = new DaysList();
    this._sortItems = getSortItems();
    this._sortContainer = new SortContainer();
    this._noEvents = new NoEvents();
    this._onSortItemClick = this._onSortItemClick.bind(this);
    this._totalSum = 0;
    this._tripTotalCost = document.querySelector(`.trip-info__cost-value`);
    this._currentSortType = `event`;

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
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
      unrender(this._daysList.getElement());
      this._daysList.removeElement();
      this._currentSortType = evt.target.getAttribute(`data-sort-type`);
      this._reRenderDaysList();
    }
  }

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

  _renderEvent(eventsList, eventInfo, index) {
    const eventController = new EventController(eventsList, eventInfo, index, this._onDataChange, this._onChangeView);
    this._subscriptions.push(eventController.setDefaultView.bind(eventController));
  }

  _renderEvents(day, eventsList, eventsInfo) {
    eventsInfo.forEach((eventInfo, index) => this._renderEvent(eventsList, eventInfo, index + 1));
    render(day.getElement(), eventsList.getElement(), Position.BEFOREEND);
  }

  _renderDay(dayDate, currentDayNumber) {
    const day = new Day(dayDate, currentDayNumber);
    const eventsList = new EventsList();
    const eventsForRender = this._eventsForRender.filter((event) => Math.floor(new Date(event.dateFrom).getTime() / 1000 / 60 / 60 / 24) === dayDate);

    this._renderEvents(day, eventsList, eventsForRender);

    render(this._daysList.getElement(), day.getElement(), Position.BEFOREEND);
  }

  _renderDaysList() {
    const eventDays = Array.from(new Set(this._events.slice().sort((a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()).map((event) => Math.floor(new Date(event.dateFrom).getTime() / 1000 / 60 / 60 / 24))));
    let currentDayNumber = 1;

    eventDays.forEach((dayDate, index, days) => {
      // Определяем сколько дней между днями событий
      if (index > 0) {
        currentDayNumber += dayDate - days[index - 1];
      }
      this._renderDay(dayDate, currentDayNumber);
    });

    render(this._container, this._daysList.getElement(), Position.BEFOREEND);
  }

  _reRenderDaysList() {
    this._sortEvents();
    if (this._currentSortType === `event`) {
      this._renderDaysList();
    } else {
      this._renderSortedEvents();
    }
  }

  _renderSortedEvents() {
    const day = new Day();
    const eventsList = new EventsList();

    this._renderEvents(day, eventsList, this._eventsForRender);
    render(this._daysList.getElement(), day.getElement(), Position.BEFOREEND);
    render(this._container, this._daysList.getElement(), Position.BEFOREEND);
  }

  _onDataChange(newData, oldData) {
    this._events[this._events.findIndex((item) => item === oldData)] = newData;
    unrender(this._daysList.getElement());
    this._daysList.removeElement();
    this._reRenderDaysList();
    this._updateTotalSum();
  }

  _onChangeView() {
    this._subscriptions.forEach((subscription) => subscription());
  }

  _updateTotalSum() {
    if (this._events.length > 0) {
      this._totalSum = this._events.map((event) => Number(event.basePrice)).reduce((a, b) => a + b);
      this._tripTotalCost.textContent = this._totalSum;
    }
  }

  _renderMainContent() {
    if (this._events.length === 0) {
      render(this._container, this._noEvents.getElement(), Position.BEFOREEND);
    } else {
      this._renderSort();
      this._renderDaysList();
      this._updateTotalSum();
    }
  }

  init() {
    this._renderMainContent();
  }
}
