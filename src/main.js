import {getRouteMarkup} from './components/route.js';
import {getMenuMarkup} from './components/menu.js';
import {getFilterMarkup} from './components/filter.js';
import {getSortMarkup} from './components/sort.js';
import {getTripContentMarkup} from './components/trip-content.js';

const FILTER_ITEM_CHECKED = `everything`;
const SortItemsOptions = {
  CHECKED_ITEM: `event`,
  ITEMS_WITH_ICON: [`time`, `Price`]
};
const tripInfoContainer = document.querySelector(`.trip-info`);
const tripControlsHeadings = document.querySelectorAll(`.trip-controls h2`);
const tripEventsContainer = document.querySelector(`.trip-events`);

const renderComponent = (container, component, position = `beforeend`) => {
  container.insertAdjacentHTML(position, component);
};

renderComponent(tripInfoContainer, getRouteMarkup(), `afterbegin`);
renderComponent(tripControlsHeadings[0], getMenuMarkup(), `afterend`);
renderComponent(tripControlsHeadings[1], getFilterMarkup(FILTER_ITEM_CHECKED), `afterend`);
renderComponent(tripEventsContainer, getSortMarkup(SortItemsOptions));
renderComponent(tripEventsContainer, getTripContentMarkup());
