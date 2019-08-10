import {getTripEventFormMarkup} from './trip-event-form';
import {getTripEventCardMarkup} from './trip-event-card';

const getTripDayMarkup = () => {
  return `
    <li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter">1</span>
        <time class="day__date" datetime="2019-03-18">MAR 18</time>
      </div>

      <ul class="trip-events__list">
        ${getTripEventFormMarkup()}
        ${getTripEventCardMarkup()}
        ${getTripEventCardMarkup()}
        ${getTripEventCardMarkup()}
      </ul>
    </li>
  `;
};

export {getTripDayMarkup};
