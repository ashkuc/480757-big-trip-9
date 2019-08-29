import {getEvent, getMenuItems, getFilterItems, getSortItems} from './components/data.js';
import {Position, render} from './components/utils.js';
import {Route} from './components/route.js';
import {MenuContainer} from './components/menu-container.js';
import {MenuItem} from './components/menu-item.js';
import {FilterContainer} from './components/filter-container.js';
import {FilterItem} from './components/filter-item.js';
import {SortContainer} from './components/sort-container.js';
import {SortItem} from './components/sort-item.js';
import {DaysList} from './components/days-list.js';
import {Day} from './components/day.js';
import {DayInfo} from './components/day-info.js';
import {EventsList} from './components/events-list.js';
import {Event} from './components/event.js';
import {EventForm} from './components/event-form.js';

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
const filterContainer = new FilterContainer();
const sortContainer = new SortContainer();
const daysList = new DaysList();
const day = new Day();
const dayInfo = new DayInfo();
const eventsList = new EventsList();

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

// Sort
const renderSortItem = (sortItemInfo) => {
  const sortItem = new SortItem(sortItemInfo);
  render(sortContainer.getElement().querySelector(`span:last-child`), sortItem.getElement(), Position.BEFORE);
};

const renderSort = () => {
  sortItems.forEach((sortItemInfo) => renderSortItem(sortItemInfo));
  render(tripEventsContainer.querySelector(`h2`), sortContainer.getElement(), Position.AFTER);
};

// Events
const renderEvent = (eventInfo) => {
  const event = new Event(eventInfo);
  const eventForm = new EventForm(eventInfo);

  const onEscKeyDown = (evt) => {
    evt.preventDefault();
    if (evt.key === `Escape` || evt.key === `Esc`) {
      eventsList.getElement().replaceChild(event.getElement(), eventForm.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  event.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    eventsList.getElement().replaceChild(eventForm.getElement(), event.getElement());
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventForm.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    eventsList.getElement().replaceChild(event.getElement(), eventForm.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  eventForm.getElement().querySelectorAll(`input[type="text"]`).forEach((input) => {
    input.addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
  });

  eventForm.getElement().querySelectorAll(`input[type="text"]`).forEach((input) => {
    input.addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscKeyDown);
    });
  });

  eventForm.getElement().querySelector(`form`).addEventListener(`submit`, () => {
    eventsList.getElement().replaceChild(event.getElement(), eventForm.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventsList.getElement(), event.getElement(), Position.BEFOREEND);
};

const renderEvents = () => {
  eventMocks.forEach((eventInfo) => renderEvent(eventInfo));
  render(day.getElement(), eventsList.getElement(), Position.BEFOREEND);
};

render(tripInfoContainer, route.getElement(), Position.AFTERBEGIN);
renderMenu();
renderFilter();
renderSort();
render(tripEventsContainer, daysList.getElement(), Position.BEFOREEND);
render(daysList.getElement(), day.getElement(), Position.BEFOREEND);
render(day.getElement(), dayInfo.getElement(), Position.BEFOREEND);
renderEvents();
tripTotalCost.textContent = totalSum;
