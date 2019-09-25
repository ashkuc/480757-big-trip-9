import moment from 'moment';
import AbstractComponent from './abstract-component.js';
import {toCapitalize} from './utils.js';
import {Types} from '../data-info/types.js';
import {Offers} from '../data-info/offers.js';

export default class Event extends AbstractComponent {
  constructor({basePrice, dateFrom, dateTo, destination, isFavorite, offers, type}) {
    super();
    this._type = type;
    this._basePrice = basePrice;
    this._dateFrom = dateFrom;
    this._dateTo = dateTo;
    this._duration = moment.duration(moment(this._dateTo).diff(moment(this._dateFrom)));
    this._destination = destination;
    this._isFavorite = isFavorite;
    this._possibleOffers = Offers[Offers.findIndex((offer) => offer.type === this._type)].offers;
    this._offers = offers;
    this._fullDay = 24;
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
            <time class="event__start-time" datetime="${new Date(this._dateFrom).toISOString()}">${moment(this._dateFrom).format(`HH:mm`)}</time>
            &mdash;
            <time class="event__end-time" datetime="${new Date(this._dateTo).toLocaleString()}">${moment(this._dateTo).format(`HH:mm`)}</time>
          </p>
          <p class="event__duration">${this._duration.get(`days`) ? `${this._duration.get(`days`)}D ` : ``}${this._duration.get(`hours`)}H ${this._duration.get(`minutes`)}M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this._basePrice}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${this._possibleOffers.length > 0 && this._offers ? this._offers.slice(0, 3).map((offerName) => `<li class="event__offer">
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
