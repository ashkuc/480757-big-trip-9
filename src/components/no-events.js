import AbstractComponent from './abstract-component.js';

export default class NoEvents extends AbstractComponent {
  getTemplate() {
    return `<p class="trip-events__msg">Click New Event to create your first point</p>`.trim();
  }
}
