import {getRouteMarkup} from './components/route.js';
import {getMenuMarkup} from './components/menu.js';
import {getFilterMarkup} from './components/filter.js';
import {getSortMarkup} from './components/sort.js';
import {getContentMarkup} from './components/content.js';
import {getEvent, getMenuItems, getFilterItems, getSortItems} from './components/data.js';

const EVENTS_NUMBER = 4;
const tripInfoContainer = document.querySelector(`.trip-info`);
const tripControlsHeadings = document.querySelectorAll(`.trip-controls h2`);
const tripEventsContainer = document.querySelector(`.trip-events`);
const tripTotalCost = document.querySelector(`.trip-info__cost-value`);
const events = new Array(EVENTS_NUMBER).fill(``).map(getEvent);
const menuItems = getMenuItems();
const filterItems = getFilterItems();
const sortItems = getSortItems();
const totalSum = events.map((event) => event.price).reduce((a, b) => a + b);

const renderComponent = (container, component, position = `beforeend`) => {
  container.insertAdjacentHTML(position, component.trim());
};

renderComponent(tripInfoContainer, getRouteMarkup(events), `afterbegin`);
renderComponent(tripControlsHeadings[0], getMenuMarkup(menuItems), `afterend`);
renderComponent(tripControlsHeadings[1], getFilterMarkup(filter), `afterend`);
renderComponent(tripEventsContainer, getSortMarkup(sort));
renderComponent(tripEventsContainer, getContentMarkup(events));
tripTotalCost.textContent = totalSum;
