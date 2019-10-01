import { getEvent } from './data-info/sample-data';

export class EventsModelMock {
  constructor(count) {
    this._events = new Array(count).fill(``).map(getEvent);
    this._filterFn = () => true;
    this._sortFn = () => 0;
  }

  useFilter(fn) {
    this._filterFn = fn;
    return this;
  }

  useSort(fn) {
    this._sortFn = fn;
    return this;
  }

  add(newEvent) {
    this._events = [newEvent, ...this._events];
  }

  remove(eventToRemove) {
    this._events = this._events.filter((event) => event !== eventToRemove);
  }

  update(oldEvent, newEvent) {
    this._events = this._events.map((event) => event === oldEvent ? newEvent : event);
  }

  getEvents() {
    return this._events.filter(this._filterFn).sort(this._sortFn);
  }

  get events() {
    return this.getEvents();
  }
}
