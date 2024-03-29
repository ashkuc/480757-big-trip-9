import AbstractComponent from './abstract-component.js';
import {toCapitalize} from './utils.js';
import {Types} from '../data-info/types.js';
import {TypePlaces} from '../data-info/type-places.js';
import {Offers} from '../data-info/offers.js';
import {DesinationsSample as Destinations} from '../data-info/destinations-sample.js';
import {Mode as EventFormMode} from '../components/controllers/event.js';

export default class EventForm extends AbstractComponent {
  constructor({basePrice, dateFrom, dateTo, destination, isFavorite, offers, type}, index, mode) {
    super();
    this._type = type;
    this._basePrice = basePrice;
    this._dateFrom = dateFrom;
    this._dateTo = dateTo;
    this._duration = this._dateTo - this._dateFrom;
    this._destination = destination;
    this._destinationInfo = this._getDestinationInfo();
    this._isFavorite = isFavorite;
    this._possibleOffers = Offers[Offers.findIndex((offer) => offer.type === this._type)].offers;
    this._offers = offers;
    this._index = index;
    this._isDefaultMode = mode === EventFormMode.DEFAULT;
  }

  _getDestinationInfo() {
    if (this._destination) {
      this._destinationInfo = Destinations.find((destination) => destination.name.toLowerCase() === this._destination.toLowerCase());
      return this._destinationInfo ? this._destinationInfo : null;
    } else {
      return null;
    }
  }

  getTemplate() {
    return `${this._isDefaultMode ? `<li class="trip-events__item">` : ``}
      <form class="${this._isDefaultMode ? `` : `trip-events__item `}event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${this._index}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${Types.find((item) => item.NAME === this._type.toLowerCase()).ICON}" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${this._index}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>

                ${Types.map((type) => type.IS_MOVEMENT ? `<div class="event__type-item">
                  <input id="event-type-${type.NAME}-${this._index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.NAME}"${type.NAME === this._type ? ` checked` : ``}>
                  <label class="event__type-label event__type-label--${type.NAME}" for="event-type-${type.NAME}-${this._index}">${toCapitalize(type.NAME)}</label>
                </div>`.trim() : ``).join(``)}

              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>

                ${Types.map((type) => !type.IS_MOVEMENT ? `<div class="event__type-item">
                  <input id="event-type-${type.NAME}-${this._index}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.NAME}"${type.NAME === this._type ? ` checked` : ``}>
                  <label class="event__type-label  event__type-label--${type.NAME === `check` ? `check-in` : type.NAME}" for="event-type-${type.NAME}-${this._index}">${toCapitalize(type.NAME)}</label>
                </div>`.trim() : ``).join(``)}

              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${this._index}">
              ${toCapitalize(this._type)} ${Types.find((item) => item.NAME === this._type).PRETEXT}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-${this._index}" type="text" name="event-destination" value="${toCapitalize(this._destination)}" list="destination-list-${this._index}">
            <datalist id="destination-list-${this._index}">
              ${TypePlaces[this._type.toUpperCase()].map((place) => `<option value="${place.split(` `).map((word) => toCapitalize(word)).join(` `)}"></option>`.trim()).join(``)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${this._index}">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-${this._index}" type="text" name="event-start-time" value="">
            &mdash;
            <label class="visually-hidden" for="event-end-time-${this._index}">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-${this._index}" type="text" name="event-end-time" value="">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${this._index}">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${this._index}" type="text" name="event-price" value="${this._basePrice ? this._basePrice : ``}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          ${this._isDefaultMode ? `<input id="event-favorite-${this._index}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${this._isFavorite ? `checked` : ``}>
          <label class="event__favorite-btn" for="event-favorite-${this._index}">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>` : ``}
        </header>

        <section class="event__details${this._possibleOffers.length > 0 && this._offers || this._destinationInfo ? `` : ` visually-hidden`}">

          ${this._possibleOffers.length > 0 && this._offers ? `<section class="event__section  event__section--offers">
            <h3 class="event__section-title event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${this._possibleOffers.map((offer) => `<div class="event__offer-selector">
                <input class="event__offer-checkbox visually-hidden" id="event-offer-${offer.name.replace(/ /g, `-`)}-${this._index}" type="checkbox" name="event-offer-${offer.name.replace(/ /g, `-`)}" ${this._offers.some((offerName) => offerName === offer.name) ? `checked` : ``} data-offer-name="${offer.name.replace(/ /g, `-`)}">
                <label class="event__offer-label" for="event-offer-${offer.name.replace(/ /g, `-`)}-${this._index}">
                  <span class="event__offer-title">${toCapitalize(offer.name)}</span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
                </label>
              </div>`.trim()).join(``)}
            </div>
          </section>`.trim() : ``}

          ${this._destinationInfo ? `<section class="event__section event__section--destination">
            <h3 class="event__section-title event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${this._destinationInfo.description}</p>

            ${this._destinationInfo ? `<div class="event__photos-container">
              <div class="event__photos-tape">
                ${this._destinationInfo.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`.trim()).join(``)}
              </div>
            </div>` : ``}
          </section>` : ``}
        </section>
      </form>
      ${this._isDefaultMode ? `</li>` : ``}`.trim();
  }
}
