import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class EventListComponent extends Component {
  @tracked events = [];
  @tracked selectedType = '';
  @tracked isLoading = true;

  constructor() {
    super(...arguments);
    this.loadEvents();
  }

  async loadEvents() {
    try {
      const response = await fetch('http://localhost:8000/events');
      const data = await response.json();
      this.events = data;
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      this.isLoading = false
    }
  }

  get filteredEvents() {
    if(!this.selectedType) {
      return this.events;
    }

    return this.events.filter(event => event.type === this.selectedType);
  }

  @action
  updateFilter(event) {
    this.selectedType = event.target.value;
  }
}
