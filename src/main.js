import {getEvent, getMenuItems, getFilterItems} from './data-info/sample-data.js';
import {Position, render, unrender} from './components/utils.js';
import Route from './components/route.js';
import Menu from './components/menu-container.js';
import MenuItem from './components/menu-item.js';
import FilterContainer from './components/filter-container.js';
import FilterItem from './components/filter-item.js';
import TripController from './components/controllers/trip.js';
import StatisticController from './components/controllers/statistic.js';

const EVENTS_NUMBER = 8;

const tripInfoContainer = document.querySelector(`.trip-info`);
const tripControlsHeadings = document.querySelectorAll(`.trip-controls h2`);
const tripEventsContainer = document.querySelector(`.trip-events`);
const newEventButton = document.querySelector(`.trip-main__event-add-btn`);

const eventMocks = new Array(EVENTS_NUMBER).fill(``).map(getEvent);
const menuItems = getMenuItems();
const filterItems = getFilterItems();

const route = new Route(eventMocks);
const menu = new Menu();
const filterContainer = new FilterContainer();
const statisticController = new StatisticController(tripEventsContainer, eventMocks);

// Menu
menu.getElement().addEventListener(`click`, (evt) => {
  if (evt.target.tagName === `A`) {
    evt.preventDefault();

    switch (evt.target.textContent) {
      case `Table`:
        showTable();
        break;
      case `Stats`:
        showStats();
        break;
    }
  }
});

const renderMenuItem = (menuItemInfo) => {
  const menuItem = new MenuItem(menuItemInfo);
  render(menu.getElement(), menuItem.getElement(), Position.BEFOREEND);
};

const renderMenu = () => {
  menuItems.forEach((menuItemInfo) => renderMenuItem(menuItemInfo));
  render(tripControlsHeadings[0], menu.getElement(), Position.AFTER);
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

const showTable = () => {
  menu.getElement().querySelector(`.trip-tabs__btn--active`).classList.remove(`trip-tabs__btn--active`);
  menu.getElement().querySelector(`.trip-tabs__btn[data-name="table"]`).classList.add(`trip-tabs__btn--active`);
  statisticController.hide();
  tripController.show();
};

const showStats = () => {
  menu.getElement().querySelector(`.trip-tabs__btn--active`).classList.remove(`trip-tabs__btn--active`);
  menu.getElement().querySelector(`.trip-tabs__btn[data-name="stats"]`).classList.add(`trip-tabs__btn--active`);
  tripController.hide();
  statisticController.show();
};

const onNewEventButtonClick = (evt) => {
  evt.preventDefault();
  showTable();
  tripController.createNewEvent();
};

const reRenderRoute = () => {
  unrender(route.getElement());
  route.removeElement();
  render(tripInfoContainer, route.getElement(), Position.AFTERBEGIN);
};

const tripController = new TripController(tripEventsContainer, eventMocks, reRenderRoute, statisticController);

render(tripInfoContainer, route.getElement(), Position.AFTERBEGIN);
renderMenu();
renderFilter();
tripController.init();
statisticController.init();
newEventButton.addEventListener(`click`, onNewEventButtonClick);
