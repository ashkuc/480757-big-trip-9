import {getEventFormMarkup} from './trip-event-form.js';
import {getEventMarkup} from './event.js';

const getDayMarkup = (events) => `<li class="trip-days__item  day">
  <div class="day__info">
    <span class="day__counter">1</span>
    <time class="day__date" datetime="2019-03-18">MAR 18</time>
  </div>

  <ul class="trip-events__list">
    ${events.map((event) => getEventMarkup(event)).join(``)}
  </ul>
</li>`.trim();

export {getDayMarkup};
