import AbstractComponent from './abstract-component.js';

export default class extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<li class="trip-days__item day">     
    </li>`.trim();
  }
}
