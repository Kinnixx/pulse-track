import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class EventListComponent extends Component {
  @tracked selectedType = '';

  get filteredEvents() {
    if(!this.selectedType) {
      return this.args.events;
    }

    return this.args.events.filter(event => event.type === this.selectedType);
  }

  @action
  updateFilter(event) {
    this.selectedType = event.target.value;
  }
}
