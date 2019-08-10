import {getTripDayMarkup} from './trip-day.js';

const getTripContentMarkup = () => {
  return `
    <ul class="trip-days">
      ${getTripDayMarkup()}
    </ul>
  `;
};

export {getTripContentMarkup};
