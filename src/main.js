import {Route} from './components/route.js';
import {MenuContainer} from './components/menu-container.js';
import {MenuItem} from './components/menu-item.js';
import {getFilterMarkup} from './components/filter-container.js';
import {getSortMarkup} from './components/sort-container.js';
import {getEvent, getMenuItems, getFilterItems, getSortItems} from './components/data.js';
import {Position, render, unrender} from './components/utils.js';

const EVENTS_NUMBER = 4;

const tripInfoContainer = document.querySelector(`.trip-info`);
const tripControlsHeadings = document.querySelectorAll(`.trip-controls h2`);
const tripEventsContainer = document.querySelector(`.trip-events`);
const tripTotalCost = document.querySelector(`.trip-info__cost-value`);

const eventMocks = new Array(EVENTS_NUMBER).fill(``).map(getEvent);
const menuItems = getMenuItems();
const filterItems = getFilterItems();
const sortItems = getSortItems();
const totalSum = eventMocks.map((event) => event.price).reduce((a, b) => a + b);

const route = new Route(eventMocks);
const menuContainer = new MenuContainer();

const renderMenuItem = (menuItemInfo) => {
  const menuItem = new MenuItem(menuItemInfo);
  render(menuContainer.getElement(), menuItem.getElement(), Position.BEFOREEND);
};

const renderMenu = () => {
  menuItems.forEach((menuItemInfo) => renderMenuItem(menuItemInfo));
  render(tripControlsHeadings[0], menuContainer.getElement(), Position.AFTER);
};

render(tripInfoContainer, route.getElement(), Position.AFTERBEGIN);
// renderComponent(tripControlsHeadings[0], getMenuMarkup(menuItems), `afterend`);
renderMenu();
// renderComponent(tripControlsHeadings[1], getFilterMarkup(filter), `afterend`);
// renderComponent(tripEventsContainer, getSortMarkup(sort));
// renderComponent(tripEventsContainer, getContentMarkup(events));
tripTotalCost.textContent = totalSum;
