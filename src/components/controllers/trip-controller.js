import {Position, render} from '../utils.js';
import {getSortItems} from '../../sample-data.js';
import DaysList from '../days-list.js';
import Day from '../day.js';
import DayInfo from '../day-info.js';
import EventsList from '../events-list.js';
import Event from '../event.js';
import EventForm from '../event-form.js';
import SortContainer from '../sort-container.js';
import SortItem from '../sort-item.js';
import NoEvents from '../no-events.js';

export default class {
  constructor(container, events) {
    this._container = container;
    this._events = events;
    this._daysList = new DaysList();
    this._day = new Day();
    this._dayInfo = new DayInfo();
    this._eventsList = new EventsList();
    this._sortItems = getSortItems();
    this._sortContainer = new SortContainer();
    this._noEvents = new NoEvents();
    // this._onSortItemClick = this._onSortItemClick.bind(this);
  }

  _renderSortItem(sortItemInfo) {
    const sortItem = new SortItem(sortItemInfo);
    render(this._sortContainer.getElement().querySelector(`span:last-child`), sortItem.getElement(), Position.BEFORE);
  }

  _renderSort() {
    this._sortItems.forEach((sortItemInfo) => this._renderSortItem(sortItemInfo));
    this._sortContainer.getElement().addEventListener(`click`, this._onSortItemClick)
    render(this._container.querySelector(`h2`), this._sortContainer.getElement(), Position.AFTER);
  }

  // _onSortItemClick(evt) {
  //   if (evt.target.tagName === `INPUT`) {

  //   }
  // }

  _renderEvent(eventInfo, index) {
    const event = new Event(eventInfo);
    const eventForm = new EventForm(eventInfo, index);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._eventsList.getElement().replaceChild(event.getElement(), eventForm.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    event.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._eventsList.getElement().replaceChild(eventForm.getElement(), event.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventForm.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._eventsList.getElement().replaceChild(event.getElement(), eventForm.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    eventForm.getElement().querySelectorAll(`input[type="text"]`).forEach((input) => {
      input.addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
    });

    eventForm.getElement().querySelectorAll(`input[type="text"]`).forEach((input) => {
      input.addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });
    });

    eventForm.getElement().querySelector(`form`).addEventListener(`submit`, () => {
      this._eventsList.getElement().replaceChild(event.getElement(), eventForm.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._eventsList.getElement(), event.getElement(), Position.BEFOREEND);
  }

  _renderEvents() {
    this._events.forEach((eventInfo, index) => this._renderEvent(eventInfo, index + 1));
    render(this._day.getElement(), this._eventsList.getElement(), Position.BEFOREEND);
  }

  _renderMainContent() {
    if (this._events.length === 0) {
      render(this._container, this._noEvents.getElement(), Position.BEFOREEND);
    } else {
      this._renderSort();
      render(this._container, this._daysList.getElement(), Position.BEFOREEND);
      render(this._daysList.getElement(), this._day.getElement(), Position.BEFOREEND);
      render(this._day.getElement(), this._dayInfo.getElement(), Position.BEFOREEND);
      this._renderEvents();
    }
  }

  init() {
    this._renderMainContent();
  }
}
