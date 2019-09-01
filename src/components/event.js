import AbstractComponent from './abstract-component.js';
import {toCapitalize, getRandomBetween} from './utils.js';
import {EventTypes} from '../event-types.js';
import {EventOptions} from '../event-options.js';

export default class extends AbstractComponent {
  constructor({type, places, time, price, options}) {
    super();
    this._type = type;
    this._places = places;
    this._time = time;
    this._price = price;
    this._options = options;
  }

  getTemplate() {
    return `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${EventTypes.find((item) => item.NAME === this._type).ICON}" alt="Event type icon">
        </div>
        <h3 class="event__title">${toCapitalize(this._type)} ${EventTypes.find((item) => item.NAME === this._type).PRETEXT} ${this._places[Math.floor(Math.random() * 8)].split(` `).map((word) => toCapitalize(word)).join(` `)}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${new Date(this._time.start).toISOString().split(`:`).slice(0, 2).join(`:`)}">${new Date(this._time.start).toISOString().split(/T|:/).slice(1, 3).join(`:`)}</time>
            &mdash;
            <time class="event__end-time" datetime="${new Date(this._time.start + (getRandomBetween(30, 180) * 60 * 1000)).toISOString().split(`:`).slice(0, 2).join(`:`)}">${new Date(this._time.start + (getRandomBetween(30, 180) * 60 * 1000)).toISOString().split(/T|:/).slice(1, 3).join(`:`)}</time>
          </p>
          <p class="event__duration">${Math.floor((new Date(this._time.end) - new Date(this._time.start)) / 1000 / 60 / 60)}H ${(new Date(this._time.end) - new Date(this._time.start)) / 1000 / 60 % 60}M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this._price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${this._options.length > 0 ? this._options.map((optionName) => `<li class="event__offer">
            <span class="event__offer-title">${toCapitalize(optionName)}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${EventOptions.find((option) => option.NAME === optionName).COST}</span>
          </li>`.trim()).join(``) : ``}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`.trim();

  }
}
