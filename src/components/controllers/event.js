import {Position, render} from '../utils.js';
import Event from '../event.js';
import EventForm from '../event-form.js';

export default class EventController {
  constructor(container, data, index, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._index = index;
    this._event = new Event(this._data);
    this._eventForm = new EventForm(this._data, this._index);
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;

    this.init();
  }

  init() {
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._container.getElement().replaceChild(this._event.getElement(), this._eventForm.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._event.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._container.getElement().replaceChild(this._eventForm.getElement(), this._event.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    this._eventForm.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._container.getElement().replaceChild(this._event.getElement(), this._eventForm.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    this._eventForm.getElement().querySelectorAll(`input[type="text"]`).forEach((input) => {
      input.addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
    });

    this._eventForm.getElement().querySelectorAll(`input[type="text"]`).forEach((input) => {
      input.addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });
    });

    this._eventForm.getElement().querySelector(`form`).addEventListener(`submit`, () => {
      this._container.getElement().replaceChild(this._event.getElement(), this._eventForm.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._container.getElement(), this._event.getElement(), Position.BEFOREEND);
  }
}
