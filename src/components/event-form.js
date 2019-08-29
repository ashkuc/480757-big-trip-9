import {toCapitalize, toTimeForEdit, createElement} from './utils.js';
import {EventTypes} from '../event-types.js';
import {EventOptions} from '../event-options.js';

export class EventForm {
  constructor({type, places, time, price, options, description, photos}) {
    this._type = type;
    this._places = places;
    this._time = time;
    this._price = price;
    this._options = options;
    this._description = description;
    this._photos = photos;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${EventTypes.find((item) => item.NAME === this._type).ICON}" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>

                ${EventTypes.map((type) => type.IS_MOVEMENT ? `<div class="event__type-item">
                  <input id="event-type-${type.NAME}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.NAME}"${type.NAME === this._type ? ` checked` : ``}>
                  <label class="event__type-label  event__type-label--${type.NAME}" for="event-type-${type.NAME}-1">${toCapitalize(type.NAME)}</label>
                </div>`.trim() : ``).join(``)}

              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>

                ${EventTypes.map((type) => !type.IS_MOVEMENT ? `<div class="event__type-item">
                  <input id="event-type-${type.NAME}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.NAME}"${type.NAME === this._type ? ` checked` : ``}>
                  <label class="event__type-label  event__type-label--${type.NAME}" for="event-type-${type.NAME}-1">${toCapitalize(type.NAME)}</label>
                </div>`.trim() : ``).join(``)}

              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
              ${toCapitalize(this._type)} ${EventTypes.find((item) => item.NAME === this._type).PRETEXT}
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${this._places[Math.floor(Math.random() * 8)].split(` `).map((word) => toCapitalize(word)).join(` `)}" list="destination-list-1">
            <datalist id="destination-list-1">
              ${this._places.map((place) => `<option value="${place.split(` `).map((word) => toCapitalize(word)).join(` `)}"></option>`.trim()).join(``)}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">
              From
            </label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${toTimeForEdit(this._time.start)}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">
              To
            </label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${toTimeForEdit(this._time.end)}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${this._price}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>

          <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" checked>
          <label class="event__favorite-btn" for="event-favorite-1">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </label>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">

          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">

              ${Array.from(EventOptions).map((option) => `<div class="event__offer-selector">
                <input class="event__offer-checkbox  visually-hidden" id="event-offer-${option[0].split(/ /).slice(-1)}-1" type="checkbox" name="event-offer-${option[0].split(/ /).slice(-1)}" ${this._options.includes(option[0]) ? `checked` : ``}>
                <label class="event__offer-label" for="event-offer-${option[0].split(/ /).slice(-1)}-1">
                  <span class="event__offer-title">${toCapitalize(option[0])}</span>
                  &plus;
                  &euro;&nbsp;<span class="event__offer-price">${option[1]}</span>
                </label>
              </div>`.trim()).join(``)}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${this._description}</p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${this._photos.map((photo) => `<img class="event__photo" src="${photo}" alt="Event photo">`.trim()).join(``)}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`.trim();
  }
}
