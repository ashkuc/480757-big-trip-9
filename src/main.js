import {getEvent, getMenuItems, getFilterItems} from './data-info/sample-data.js';
import {Position, render} from './components/utils.js';
import Route from './components/route.js';
import Menu from './components/menu-container.js';
import MenuItem from './components/menu-item.js';
import FilterContainer from './components/filter-container.js';
import FilterItem from './components/filter-item.js';
import Statistic from './components/statistic.js';
import TripController from './components/controllers/trip.js';

const EVENTS_NUMBER = 4;

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
const statistic = new Statistic();
const tripController = new TripController(tripEventsContainer, eventMocks);

// Menu
menu.getElement().addEventListener(`click`, (evt) => {
  if (evt.target.tagName === `A`) {
    evt.preventDefault();
    menu.getElement().querySelector(`.trip-tabs__btn--active`).classList.remove(`trip-tabs__btn--active`);
    evt.target.classList.add(`trip-tabs__btn--active`);

    switch (evt.target.textContent) {
      case `Table`:
        statistic.hide();
        tripController.show();
        break;
      case `Stats`:
        tripController.hide();
        statistic.show();
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

const onNewEventButtonClick = (evt) => {
  evt.preventDefault();
  tripController.createNewEvent();
};

statistic.getElement().classList.add(`visually-hidden`);

render(tripInfoContainer, route.getElement(), Position.AFTERBEGIN);
renderMenu();
renderFilter();
tripController.init();
render(tripEventsContainer, statistic.getElement(), Position.AFTER);
newEventButton.addEventListener(`click`, onNewEventButtonClick);
