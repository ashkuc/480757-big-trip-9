import AbstractComponent from './abstract-component.js';

export default class MenuContainer extends AbstractComponent {
  getTemplate() {
    return `<nav class="trip-controls__trip-tabs trip-tabs">
    </nav>`.trim();
  }
}
