import {toCapitalize} from './utils.js';

const getMenuMarkup = (menu) => `<nav class="trip-controls__trip-tabs  trip-tabs">
  ${menu.map((element) => `<a class="trip-tabs__btn${element.isActive ? ` trip-tabs__btn--active` : ``}" href="#">${toCapitalize(element.name)}</a>`.trim()).join(``)}
</nav>`;

export {getMenuMarkup};
