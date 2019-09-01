import AbstractComponent from './abstract-component.js';

export class MenuContainer extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<nav class="trip-controls__trip-tabs trip-tabs">
    </nav>`.trim();
  }
}
