import AbstractComponent from './abstract-component.js';

export default class Day extends AbstractComponent {
  constructor(dayNumber = null, currentDayNumber = null) {
    super();
    this._day = this._getDate(dayNumber);
    this._currentDayNumber = currentDayNumber;
  }

  _getDate(dayNumber) {
    return dayNumber ? new Date(dayNumber * 24 * 60 * 60 * 1000).toDateString().split(` `).slice(1, 3).map((item) => item.toUpperCase()).join(` `) : null;
  }

  getTemplate() {
    return `<li class="trip-days__item day">
      <div class="day__info">
        ${this._currentDayNumber ? `<span class="day__counter">${this._currentDayNumber}</span>` : ``}
        ${this._day ? `<time class="day__date" datetime="2019-03-18">${this._day}</time>` : ``}
      </div>  
    </li>`.trim();
  }
}
