import AbstractComponent from './abstract-component.js';

export class NoEvents extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<p class="trip-events__msg">Click New Event to create your first point</p>`.trim();
  }
}
