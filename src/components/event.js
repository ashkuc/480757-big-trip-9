import AbstractComponent from './abstract-component.js';
import {toCapitalize, getRandomBetween} from './utils.js';
import {Types} from '../data-info/types.js';
import {Offers} from '../data-info/offers.js';

export default class Event extends AbstractComponent {
  constructor({basePrice, dateFrom, destination, isFavorite, offers, type}) {
    super();
    this._type = type;
    this._basePrice = basePrice;
    this._dateFrom = new Date(dateFrom).getTime();
    this._dateTo = new Date(this._dateFrom).getTime() + getRandomBetween(60, 240) * 60 * 1000;
    this._destination = destination;
    this._isFavorite = isFavorite;
    this._possibleOffers = Offers[Offers.findIndex((offer) => offer.type === this._type)].offers;
    this._offers = offers;
  }

  getTemplate() {
    return `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${Types.find((item) => item.NAME === this._type.toLowerCase()).ICON}" alt="Event type icon">
        </div>
        <h3 class="event__title">${toCapitalize(this._type)} ${Types.find((item) => item.NAME.toLowerCase() === this._type.toLowerCase()).PRETEXT} ${toCapitalize(this._destination)}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${new Date(this._dateFrom).toLocaleString().split(/:| /).slice(1, 3).join(`:`)}">${new Date(this._dateFrom).toLocaleString().split(/:| /).slice(1, 3).join(`:`)}</time>
            &mdash;
            <time class="event__end-time" datetime="${new Date(this._dateTo).toLocaleString().split(/:| /).slice(1, 3).join(`:`)}">${new Date(this._dateTo).toLocaleString().split(/:| /).slice(1, 3).join(`:`)}</time>
          </p>
          <p class="event__duration">${Math.floor((this._dateTo - this._dateFrom) / 1000 / 60 / 60)}H ${(this._dateTo - this._dateFrom) / 1000 / 60 % 60}M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this._basePrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${this._offers.length > 0 ? this._offers.slice(0, 3).map((offerName) => `<li class="event__offer">
            <span class="event__offer-title">${toCapitalize(offerName)}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${this._possibleOffers[this._possibleOffers.findIndex((item) => item.name === offerName)].price}</span>
          </li>`.trim()).join(``) : ``}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`.trim();
  }
}
