import AbstractComponent from './abstract-component.js';
import {toCapitalize, getRandomFromArray} from './utils.js';

export default class Route extends AbstractComponent {
  constructor(events) {
    super();
    this._MAX_PLACES_TO_SHOW = 4;
    this._events = events;
  }

  _getRoute() {
    let places = new Set(this._events.map((event) => getRandomFromArray(event.places)));
    places = Array.from(places);

    return places.length < this._MAX_PLACES_TO_SHOW ? places.map(toCapitalize).join(` &mdash; `) : `${toCapitalize(places[0])} &mdash; ... &mdash; ${toCapitalize(places[places.length - 1])}`;
  }

  _getPeriod() {
    const firstEventStartSeconds = Math.min.apply(null, this._events.map((event) => event.timeStart));
    const lastEventEndSeconds = Math.max.apply(null, this._events.map((event) => event.timeStart + event.duration));
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
      <h1 class="trip-info__title">${this._getRoute()}</h1>

      <p class="trip-info__dates">${this._getPeriod()}</p>
    </div>`.trim();
  }
}
