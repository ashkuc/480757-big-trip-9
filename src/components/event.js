import {toCapitalize, getRandomBetween, shuffleArray, getRandomFromArray} from './utils.js';

const getEventMarkup = ({types, places, time, price, additionalOptions}) => `<li class="trip-events__item">
  <div class="event">
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${types[getRandomBetween(0, 9)].icon}" alt="Event type icon">
    </div>
    <h3 class="event__title">${toCapitalize(getRandomFromArray(types).name)} ${getRandomFromArray(types).pretext} ${places[Math.floor(Math.random() * 8)].split(` `).map((word) => toCapitalize(word)).join(` `)}</h3>
  
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${new Date(time.start).toISOString().split(`:`).slice(0, 2).join(`:`)}">${new Date(time.start).toISOString().split(/T|:/).slice(1, 3).join(`:`)}</time>
        &mdash;
        <time class="event__end-time" datetime="${new Date(time.start + (getRandomBetween(30, 180) * 60 * 1000)).toISOString().split(`:`).slice(0, 2).join(`:`)}">${new Date(time.start + (getRandomBetween(30, 180) * 60 * 1000)).toISOString().split(/T|:/).slice(1, 3).join(`:`)}</time>
      </p>
      <p class="event__duration">${Math.floor((new Date(time.end) - new Date(time.start)) / 1000 / 60 / 60)}H ${(new Date(time.end) - new Date(time.start)) / 1000 / 60 % 60}M</p>
    </div>
  
    <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
    </p>
  
    <h4 class="visually-hidden">Offers:</h4>
    <ul class="event__selected-offers">
      ${shuffleArray(additionalOptions).slice(0, getRandomBetween(0, 2)).map((option) => `<li class="event__offer">
        <span class="event__offer-title">${toCapitalize(option.name)}</span>
        &plus;
        &euro;&nbsp;<span class="event__offer-price">${option.cost}</span>
      </li>`.trim()).join(``)}
    </ul>
  
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;

export {getEventMarkup};
