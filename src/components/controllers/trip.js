import {Position, render, unrender} from '../utils.js';
import {getSortItems} from '../../sample-data.js';
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
    this._sortedEvents = new Array(...this._events);
    this._daysList = new DaysList();
    this._sortItems = getSortItems();
    this._sortContainer = new SortContainer();
    this._noEvents = new NoEvents();
    this._onSortItemClick = this._onSortItemClick.bind(this);

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
      switch (evt.target.getAttribute(`data-sort-type`)) {
        case `event`:
          this._renderDaysList();
          this._sortContainer.getElement().querySelector(`.trip-sort__item--day`).textContent = `day`;
          break;
        case `time`:
          this._sortedEvents = this._events.slice().sort((a, b) => a.timeStart - b.timeStart);
          this._renderSortedEvents();
          this._sortContainer.getElement().querySelector(`.trip-sort__item--day`).textContent = ``;
          break;
        case `price`:
          this._sortedEvents = this._events.slice().sort((a, b) => a.price - b.price);
          this._renderSortedEvents();
          this._sortContainer.getElement().querySelector(`.trip-sort__item--day`).textContent = ``;
          break;
      }
    }
  }

  _renderEvent(eventsList, eventInfo, index) {
    new EventController(eventsList, eventInfo, index, this._onDataChange);
  }

  _renderEvents(day, eventsList, eventsInfo) {
    eventsInfo.forEach((eventInfo, index) => this._renderEvent(eventsList, eventInfo, index + 1));
    render(day.getElement(), eventsList.getElement(), Position.BEFOREEND);
  }

  _renderDay(dayDate, currentDayNumber) {
    const day = new Day(dayDate, currentDayNumber);
    const eventsList = new EventsList();
    const eventsForRender = this._events.filter((event) => Math.floor(event.timeStart / 1000 / 60 / 60 / 24) === dayDate);

    this._renderEvents(day, eventsList, eventsForRender);

    render(this._daysList.getElement(), day.getElement(), Position.BEFOREEND);
  }

  _renderDaysList() {
    const eventDays = Array.from(new Set(this._events.slice().sort((a, b) => a.timeStart - b.timeStart).map((event) => Math.floor(event.timeStart / 1000 / 60 / 60 / 24))));
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

  _renderSortedEvents() {
    const day = new Day();
    const eventsList = new EventsList();

    this._renderEvents(day, eventsList, this._sortedEvents);
    render(this._daysList.getElement(), day.getElement(), Position.BEFOREEND);
    render(this._container, this._daysList.getElement(), Position.BEFOREEND);
  }

  _renderMainContent() {
    if (this._events.length === 0) {
      render(this._container, this._noEvents.getElement(), Position.BEFOREEND);
    } else {
      this._renderSort();
      this._renderDaysList();
    }
  }

  _onDataChange(newData, oldData) {
    this._events[this._events.findIndex((item) => item === oldData)] = newData;
  }

  init() {
    this._renderMainContent();
  }
}
