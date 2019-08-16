import {getDayMarkup} from './day.js';

const getContentMarkup = () => {
  return `
    <ul class="trip-days">
      ${getDayMarkup()}
    </ul>
  `;
};

export {getContentMarkup};
