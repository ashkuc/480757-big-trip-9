import {getRouteMarkup} from './components/route.js';
import {getMenuMarkup} from './components/menu.js';
import {getFilterMarkup} from './components/filter.js';
import {getSortMarkup} from './components/sort.js';
import {getContentMarkup} from './components/content.js';
import {getEvent} from './components/data.js';
import {toCapitalize} from './components/utils.js';

const EVENTS_NUMBER = 3;
const tripInfoContainer = document.querySelector(`.trip-info`);
const tripControlsHeadings = document.querySelectorAll(`.trip-controls h2`);
const tripEventsContainer = document.querySelector(`.trip-events`);
const events = new Array(EVENTS_NUMBER).fill('').map(getEvent);

const renderComponent = (container, component, position = `beforeend`) => {
  container.insertAdjacentHTML(position, component.trim());
};

renderComponent(tripInfoContainer, getRouteMarkup(), `afterbegin`);
renderComponent(tripControlsHeadings[0], getMenuMarkup(), `afterend`);
// renderComponent(tripControlsHeadings[1], getFilterMarkup(FILTER_ITEM_CHECKED), `afterend`);
// renderComponent(tripEventsContainer, getSortMarkup(SortItemsOptions));
renderComponent(tripEventsContainer, getContentMarkup(events));
