import {getDayMarkup} from './day.js';

const getContentMarkup = (events) => `<ul class="trip-days">
  ${getDayMarkup(events)}
</ul>`;

export {getContentMarkup};
