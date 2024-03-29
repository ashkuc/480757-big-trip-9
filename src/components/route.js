import moment from 'moment';
import AbstractComponent from './abstract-component.js';
import {toCapitalize, getRandomBetween} from './utils.js';

export default class Route extends AbstractComponent {
  constructor(events) {
    super();
    this._MAX_PLACES_TO_SHOW = 4;
    this._events = events;
  }

  _getRoute() {
    let destinations = Array.from(new Set(this._events.sort((a, b) => a.dateFrom - b.dateFrom).map((event) => event.destination)));

    return destinations.length < this._MAX_PLACES_TO_SHOW
      ? destinations.map(toCapitalize).join(` &mdash; `)
      : `${toCapitalize(destinations[0])} &mdash; ... &mdash; ${toCapitalize(destinations[destinations.length - 1])}`;
  }

  _getPeriod() {
    const firstEventStartSeconds = Math.min.apply(null, this._events.map((event) => event.dateFrom));
    const lastEventEndSeconds = Math.max.apply(null, this._events.map((event) => event.dateTo));
    const firstEventMonth = moment(firstEventStartSeconds).format(`MMM`);
    const firstEventDate = moment(firstEventStartSeconds).format(`DD`);
    const lastEventMonth = moment(lastEventEndSeconds).format(`MMM`);
    const lastEventDate = moment(lastEventEndSeconds).format(`DD`);

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
