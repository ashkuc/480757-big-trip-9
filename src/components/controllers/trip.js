import {Position, render, unrender} from '../utils.js';
import DaysList from '../days-list.js';
import Day from '../day.js';
import EventsList from '../events-list.js';
import NoEvents from '../no-events.js';
import EventController from './event';
import {Mode as EventControllerMode} from './event';
import SortController from '../controllers/sort.js';
import FilterController from '../controllers/filter.js';

export default class TripController {
  constructor(container, events, reRenderRoute, statisticController, filterHeading) {
    this._container = container;
    this._events = events;
    this._eventsForRender = new Array(...this._events);
    this._daysList = new DaysList();
    this._noEvents = new NoEvents();
    this._totalSum = 0;
    this._tripTotalCost = document.querySelector(`.trip-info__cost-value`);
    this._creatingEvent = null;
    this._reRenderRoute = reRenderRoute;
    this._filterHeading = filterHeading;
    this._filterController = new FilterController(this._filterHeading, this._events);
    this._sortController = new SortController(this._container, this._events, this._onSortEvants);
    this._statisticController = statisticController;

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    this._filterController.init();
    this._sortController.init();
    this._renderMainContent();
  }

  hide() {
    this._container.classList.add(`visually-hidden`);
  }

  show() {
    this._container.classList.remove(`visually-hidden`);
  }

  createNewEvent() {
    if (this._creatingEvent) {
      return;
    }

    this._onChangeView();
    const newEventIndex = this._events.length + 1;

    const emptyEvent = {
      basePrice: null,
      dateFrom: null,
      dateTo: null,
      destination: null,
      isFavorite: null,
      offers: null,
      type: `flight`,
    };

    this._creatingEvent = new EventController(this._daysList, emptyEvent, newEventIndex, this._onDataChange, this._onChangeView, EventControllerMode.ADDING);
    this._subscriptions.push({
      setDefaultView: eventController.setDefaultView.bind(eventController),
      destroyFlatpickr: eventController.destroyFlatpickr.bind(eventController),
    });
  }

  _onSortEvants(sortType) {
    unrender(this._daysList.getElement());
    this._daysList.removeElement();
    this._subscriptions.forEach((item) => item.destroyFlatpickr());
    this._currentSortType = sortType;
    this._reRenderDaysList();
  }

  _renderEvent(eventsList, eventInfo, index) {
    const eventController = new EventController(eventsList, eventInfo, index, this._onDataChange, this._onChangeView);
    this._subscriptions.push({
      setDefaultView: eventController.setDefaultView.bind(eventController),
      destroyFlatpickr: eventController.destroyFlatpickr.bind(eventController),
    });
  }

  _renderEvents(day, eventsList, eventsInfo) {
    eventsInfo.forEach((eventInfo, index) => this._renderEvent(eventsList, eventInfo, index + 1));
    render(day.getElement(), eventsList.getElement(), Position.BEFOREEND);
  }

  _renderDay(dayDate, currentDayNumber) {
    const day = new Day(dayDate, currentDayNumber);
    const eventsList = new EventsList();
    const eventsForRender = this._eventsForRender.filter((event) => Math.floor(event.dateFrom / 1000 / 60 / 60 / 24) === dayDate);

    this._renderEvents(day, eventsList, eventsForRender);

    render(this._daysList.getElement(), day.getElement(), Position.BEFOREEND);
  }

  _renderDaysList() {
    const eventDays = Array.from(new Set(this._events.slice().sort((a, b) => a.dateFrom - b.dateFrom).map((event) => Math.floor(event.dateFrom / 1000 / 60 / 60 / 24))));
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
    if (newData === null && oldData === null) {
      this._creatingEvent = null;
    } else if (oldData === null && newData !== null) {
      this._events.unshift(newData);
    } else if (newData === null && oldData !== null) {
      this._events.splice(this._events.findIndex((item) => item === oldData), 1);
    } else {
      this._events[this._events.findIndex((item) => item === oldData)] = newData;
    }

    unrender(this._daysList.getElement());
    this._daysList.removeElement();
    this._subscriptions.forEach((item) => item.destroyFlatpickr());
    this._subscriptions = [];
    this._reRenderDaysList();
    this._updateTotalSum();
    this._creatingEvent = null;
    this._reRenderRoute();
    this._statisticController.update();
  }

  _onChangeView() {
    this._subscriptions.forEach((item) => item.setDefaultView());
  }

  _updateTotalSum() {
    if (this._events.length > 0) {
      this._totalSum = this._events.map((event) => Number(event.basePrice)).reduce((a, b) => a + b);
      this._tripTotalCost.textContent = this._totalSum;
    } else {
      this._tripTotalCost.textContent = 0;
    }
  }

  _renderMainContent() {
    if (this._events.length === 0) {
      render(this._container, this._noEvents.getElement(), Position.BEFOREEND);
    } else {
      // this._renderSort();
      this._renderDaysList();
      this._updateTotalSum();
    }
  }
}
