import AbstractComponent from './abstract-component.js';

export default class extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<ul class="trip-days">
    </ul>`.trim();
  }
}
