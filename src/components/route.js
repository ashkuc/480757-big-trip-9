import {getMinMax, toCapitalize} from './utils.js';

const getRouteMarkup = (events) => {
  const route = () => {
    let places = new Set(events.map((event) => event.places[getMinMax(0, 7)]));
    places = Array.from(places);
    if (places.length > 3) {
      return `${toCapitalize(places[0])} &mdash; ... &mdash; ${toCapitalize(places[places.length - 1])}`;
    } else if (places.length === 3) {
      return `${toCapitalize(places[0])} &mdash; ${toCapitalize(places[1])} &mdash; ${toCapitalize(places[places.length - 1])}`;
    } else {
      return `${toCapitalize(places[0])} &mdash; ${toCapitalize(places[1])}`;
    }
  };

  const period = () => {
    const firstEventStartSeconds = Math.min.apply(null, events.map((event) => event.time.start));
    const lastEventEndSeconds = Math.max.apply(null, events.map((event) => event.time.end));
    const firstEventMonth = new Date(firstEventStartSeconds).toDateString().split(/ /).slice(1, 3)[0];
    const firstEventDate = new Date(firstEventStartSeconds).toDateString().split(/ /).slice(1, 3)[1];
    const lastEventMonth = new Date(lastEventEndSeconds).toDateString().split(/ /).slice(1, 3)[0];
    const lastEventDate = new Date(lastEventEndSeconds).toDateString().split(/ /).slice(1, 3)[1];

    if (firstEventMonth === lastEventMonth) {
      return `${firstEventMonth} ${firstEventDate}&nbsp;&mdash;&nbsp;${lastEventDate}`;
    } else {
      return `${firstEventMonth} ${firstEventDate}&nbsp;&mdash;&nbsp;${lastEventMonth} ${lastEventDate}`;
    }
  };
  period();

  return `<div class="trip-info__main">
    <h1 class="trip-info__title">${route()}</h1>

    <p class="trip-info__dates">${period()}</p>
  </div>`;
};

export {getRouteMarkup};
