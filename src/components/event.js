import AbstractComponent from './abstract-component.js';
import {toCapitalize} from './utils.js';
import {EventTypes} from '../event-types.js';
import {EventOptions} from '../event-options.js';

export default class Event extends AbstractComponent {
  constructor({type, place, timeStart, duration, price, options}) {
    super();
    this._type = type;
    this._place = place;
    this._timeStart = timeStart;
    this._duration = duration;
    this._timeEnd = this._timeStart + this._duration;
    this._price = price;
    this._options = options;
  }

  getTemplate() {
    return `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${EventTypes.find((item) => item.NAME === this._type).ICON}" alt="Event type icon">
        </div>
        <h3 class="event__title">${toCapitalize(this._type)} ${EventTypes.find((item) => item.NAME === this._type).PRETEXT} ${toCapitalize(this._place)}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${new Date(this._timeStart).toLocaleString().split(/:| /).slice(1, 3).join(`:`)}">${new Date(this._timeStart).toLocaleString().split(/:| /).slice(1, 3).join(`:`)}</time>
            &mdash;
            <time class="event__end-time" datetime="${new Date(this._timeEnd).toLocaleString().split(/:| /).slice(1, 3).join(`:`)}">${new Date(this._timeEnd).toLocaleString().split(/:| /).slice(1, 3).join(`:`)}</time>
          </p>
          <p class="event__duration">${Math.floor(this._duration / 1000 / 60 / 60)}H ${this._duration / 1000 / 60 % 60}M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this._price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${this._options.length > 0 ? this._options.map((optionName) => `<li class="event__offer">
            <span class="event__offer-title">${toCapitalize(EventOptions[EventOptions.findIndex((eventOption) => eventOption.NAME.split(` `).includes(optionName))].NAME)}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${EventOptions[EventOptions.findIndex((eventOption) => eventOption.NAME.split(` `).includes(optionName))].COST}</span>
          </li>`.trim()).join(``) : ``}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`.trim();

  }
}
