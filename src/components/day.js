import AbstractComponent from './abstract-component.js';

export default class Day extends AbstractComponent {
  getTemplate() {
    return `<li class="trip-days__item day">     
    </li>`.trim();
  }
}
