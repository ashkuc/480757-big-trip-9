import {toCapitalize} from './utils.js';

const getFilterMarkup = (filter) => `<form class="trip-filters" action="#" method="get">
  ${filter.map((element) => `<div class="trip-filters__filter">
    <input id="filter-${element.name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${element.name}"${element.isChecked ? ` checked` : ``}>
    <label class="trip-filters__filter-label" for="filter-${element.name}">${toCapitalize(element.name)}</label>
  </div>`.trim()).join(``)}
  
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;

export {getFilterMarkup};
