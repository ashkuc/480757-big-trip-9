import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/material_blue.css';
import moment, { parseTwoDigitYear } from 'moment';
import {Position, render, unrender, toCapitalize} from '../utils.js';
import {TypePlaces} from '../../data-info/type-places.js';
import {Offers} from '../../data-info/offers.js';
import {Types} from '../../data-info/types.js';
import {DesinationsSample as Destinations} from '../../data-info/destinations-sample.js';
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
    flatpickr(this._eventForm.getElement().querySelector(`.event__input--time[name="event-start-time"]`), {
      defaultDate: this._data.dateFrom,
      minDate: Date.now(),
      enableTime: true,
      dateFormat: `u`,
      allowInput: true,
      time_24hr: true,
      altInput: true,
      altFormat: `d/m/y H:i`,
      onChange(selectedDates) {
        dateEnd.config.minDate = new Date(selectedDates);
      }
    });

    const dateEnd = flatpickr(this._eventForm.getElement().querySelector(`.event__input--time[name="event-end-time"]`), {
      defaultDate: this._data.dateTo,
      minDate: this._data.dateFrom,
      enableTime: true,
      dateFormat: `u`,
      allowInput: true,
      time_24hr: true,
      altInput: true,
      altFormat: `d/m/y H:i`,
    });
    
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._container.getElement().replaceChild(this._event.getElement(), this._eventForm.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._event.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
      evt.preventDefault();
      this._onChangeView();
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

    this._eventForm.getElement().querySelector(`.event__type-list`).addEventListener(`click`, (evt) => {
      if (evt.target.tagName === `INPUT`) {
        this._reRenderDatalist(evt.target.value);
        this._updateType(evt.target.value);
        this._reRenderOffers(evt.target.value);
      }
    });

    this._eventForm.getElement().querySelector(`.event__input--destination`).addEventListener(`input`, (evt) => {
      this._reRenderDescription(evt.target.value);
    });

    this._eventForm.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      const formData = new FormData(evt.target);

      const entry = {
        basePrice: formData.get(`event-price`),
        dateFrom: Number(formData.get(`event-start-time`)),
        dateTo: Number(formData.get(`event-end-time`)),
        destination: formData.get(`event-destination`),
        isFavorite: formData.get(`event-favorite`) === `on` ? true : false,
        offers: Array.from(this._eventForm.getElement().querySelectorAll(`.event__offer-checkbox:checked`)).map((input) => input.getAttribute(`data-offer-name`).split(`-`).join(` `)),
        type: formData.get(`event-type`),
      };

      this._onDataChange(entry, this._data);

      this._container.getElement().replaceChild(this._event.getElement(), this._eventForm.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(this._container.getElement(), this._event.getElement(), Position.BEFOREEND);
  }

  _reRenderDatalist(typeName) {
    const datalist = this._eventForm.getElement().querySelector(`datalist`);
    const places = TypePlaces[typeName.toUpperCase()];
    const newHtmlString = places.map((place) => `<option value="${place.split(` `).map((word) => toCapitalize(word)).join(` `)}"></option>`.trim()).join(``);
    datalist.innerHTML = ``;
    datalist.insertAdjacentHTML(Position.BEFOREEND, newHtmlString);
  }

  _updateType(typeName) {
    let iconLink = this._eventForm.getElement().querySelector(`.event__type-icon`).src;
    const currentType = iconLink.split(`/`).reverse()[0].split(`.`)[0];
    this._eventForm.getElement().querySelector(`.event__type-output`).textContent = `${toCapitalize(typeName)} ${Types.find((item) => item.NAME === typeName).PRETEXT}`;
    if (typeName === `check`) {
      typeName = `check-in`;
    }
    this._eventForm.getElement().querySelector(`.event__type-icon`).src = iconLink.replace(currentType, typeName);
  }

  _reRenderOffers(typeName) {
    unrender(this._eventForm.getElement().querySelector(`.event__section`));
    const offers = Offers.find((item) => item.type === typeName).offers;

    if (offers.length > 0) {
      const newHtmlOffers = `<section class="event__section  event__section--offers">
        <h3 class="event__section-title event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offers.map((offer) => `<div class="event__offer-selector">
            <input class="event__offer-checkbox visually-hidden" id="event-offer-${offer.name.replace(/ /g, `-`)}-${this._index}" type="checkbox" name="event-offer-${offer.name.replace(/ /g, `-`)}" data-offer-name="${offer.name.replace(/ /g, `-`)}">
            <label class="event__offer-label" for="event-offer-${offer.name.replace(/ /g, `-`)}-${this._index}">
              <span class="event__offer-title">${toCapitalize(offer.name)}</span>
              &plus;
              &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
            </label>
          </div>`.trim()).join(``)}
        </div>
      </section>`.trim();

      this._eventForm.getElement().querySelector(`.event__details`).insertAdjacentHTML(Position.AFTERBEGIN, newHtmlOffers);
    }
  }

  _reRenderDescription(destination) {
    unrender(this._eventForm.getElement().querySelector(`.event__section--destination`));
    const descriptionData = Destinations.find((item) => item.name.toLowerCase() === destination.toLowerCase());
    if (descriptionData) {
      const newHtmlDescription = `<section class="event__section event__section--destination">
        <h3 class="event__section-title event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${descriptionData.description}</p>

        ${descriptionData.pictures ? `<div class="event__photos-container">
          <div class="event__photos-tape">
            ${descriptionData.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`.trim()).join(``)}
          </div>
        </div>` : ``}
      </section>`.trim();

      this._eventForm.getElement().querySelector(`.event__details`).insertAdjacentHTML(Position.BEFOREEND, newHtmlDescription);
    }
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._eventForm.getElement())) {
      this._container.getElement().replaceChild(this._event.getElement(), this._eventForm.getElement());
    }
  }
}
