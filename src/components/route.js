import {toCapitalize, getRandomFromArray, createElement} from './utils.js';

export class Route {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
  }

  getRoute() {
    let places = new Set(this._events.map((event) => getRandomFromArray(event.places)));
    places = Array.from(places);
    if (places.length > 3) {
      return `${toCapitalize(places[0])} &mdash; ... &mdash; ${toCapitalize(places[places.length - 1])}`;
    } else if (places.length === 3) {
      return `${toCapitalize(places[0])} &mdash; ${toCapitalize(places[1])} &mdash; ${toCapitalize(places[places.length - 1])}`;
    } else {
      return `${toCapitalize(places[0])} &mdash; ${toCapitalize(places[1])}`;
    }
  }

  getPeriod() {
    const firstEventStartSeconds = Math.min.apply(null, this._events.map((event) => event.time.start));
    const lastEventEndSeconds = Math.max.apply(null, this._events.map((event) => event.time.end));
    const firstEventMonth = new Date(firstEventStartSeconds).toDateString().split(/ /).slice(1, 3)[0];
    const firstEventDate = new Date(firstEventStartSeconds).toDateString().split(/ /).slice(1, 3)[1];
    const lastEventMonth = new Date(lastEventEndSeconds).toDateString().split(/ /).slice(1, 3)[0];
    const lastEventDate = new Date(lastEventEndSeconds).toDateString().split(/ /).slice(1, 3)[1];

    if (firstEventMonth === lastEventMonth) {
      return `${firstEventMonth} ${firstEventDate}&nbsp;&mdash;&nbsp;${lastEventDate}`;
    } else {
      return `${firstEventMonth} ${firstEventDate}&nbsp;&mdash;&nbsp;${lastEventMonth} ${lastEventDate}`;
    }
  }

  getTemplate() {
    return `<div class="trip-info__main">
      <h1 class="trip-info__title">${this.getRoute()}</h1>

      <p class="trip-info__dates">${this.getPeriod()}</p>
    </div>`.trim();
  }
}
