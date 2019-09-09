import {getEvent, getMenuItems, getFilterItems} from './data-info/sample-data.js';
import {Position, render} from './components/utils.js';
import Route from './components/route.js';
import MenuContainer from './components/menu-container.js';
import MenuItem from './components/menu-item.js';
import FilterContainer from './components/filter-container.js';
import FilterItem from './components/filter-item.js';
import TripController from './components/controllers/trip.js';

const EVENTS_NUMBER = 4;

const tripInfoContainer = document.querySelector(`.trip-info`);
const tripControlsHeadings = document.querySelectorAll(`.trip-controls h2`);
const tripEventsContainer = document.querySelector(`.trip-events`);
const tripTotalCost = document.querySelector(`.trip-info__cost-value`);

const eventMocks = new Array(EVENTS_NUMBER).fill(``).map(getEvent);
const menuItems = getMenuItems();
const filterItems = getFilterItems();
let totalSum = 0;

const route = new Route(eventMocks);
const menuContainer = new MenuContainer();
const filterContainer = new FilterContainer();
const tripController = new TripController(tripEventsContainer, eventMocks);

// Menu
const renderMenuItem = (menuItemInfo) => {
  const menuItem = new MenuItem(menuItemInfo);
  render(menuContainer.getElement(), menuItem.getElement(), Position.BEFOREEND);
};

const renderMenu = () => {
  menuItems.forEach((menuItemInfo) => renderMenuItem(menuItemInfo));
  render(tripControlsHeadings[0], menuContainer.getElement(), Position.AFTER);
};

// Filter
const renderFilterItem = (filterItemInfo) => {
  const filterItem = new FilterItem(filterItemInfo);
  render(filterContainer.getElement().querySelector(`button[type="submit"]`), filterItem.getElement(), Position.BEFORE);
};

const renderFilter = () => {
  filterItems.forEach((filterItemInfo) => renderFilterItem(filterItemInfo));
  render(tripControlsHeadings[1], filterContainer.getElement(), Position.AFTER);
};

const showTotalSum = () => {
  if (eventMocks.length > 0) {
    totalSum = eventMocks.map((event) => event.price).reduce((a, b) => a + b);
    tripTotalCost.textContent = totalSum;
  }
};

render(tripInfoContainer, route.getElement(), Position.AFTERBEGIN);
renderMenu();
renderFilter();
tripController.init();
showTotalSum();
