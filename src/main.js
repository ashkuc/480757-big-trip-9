import {getRouteMarkup} from './components/route.js';
import {getMenuMarkup} from './components/menu.js';
import {getFiltersMarkup} from './components/filters.js';
import {getSortMarkup} from './components/sort.js';
import {getTripContentMarkup} from './components/trip-content.js';

const tripInfoContainer = document.querySelector(`.trip-info`);
const tripControlsHeadings = document.querySelectorAll(`.trip-controls h2`);
const tripEventsContainer = document.querySelector(`.trip-events`);

const renderComponent = (container, component, position = `beforeend`) => {
  container.insertAdjacentHTML(position, component);
};

renderComponent(tripInfoContainer, getRouteMarkup(), `afterbegin`);
renderComponent(tripControlsHeadings[0], getMenuMarkup(), `afterend`);
renderComponent(tripControlsHeadings[1], getFiltersMarkup(), `afterend`);
renderComponent(tripEventsContainer, getSortMarkup());
renderComponent(tripEventsContainer, getTripContentMarkup());
