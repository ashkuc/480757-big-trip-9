import AbstractComponent from './abstract-component.js';

export class FilterContainer extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<form class="trip-filters" action="#" method="get">
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`.trim();
  }
}
