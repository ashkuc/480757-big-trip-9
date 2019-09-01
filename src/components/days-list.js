import AbstractComponent from './abstract-component.js';

export class DaysList extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<ul class="trip-days">
    </ul>`.trim();
  }
}
