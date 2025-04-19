import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { deleteEvent } from '../utils/api';

export default class EventListComponent extends Component {
  @service notification;

  @tracked events = [];
  @tracked selectedType = '';
  @tracked isLoading = true;
  @tracked deletingId = null;

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

  /**
 * Handles the deletion of a specific event by calling the API
 * and displaying a notification.
 *
 * @param {number} id - The ID of the event to delete.
 * @returns {Promise<void>}
 */
  @action
  async removeEvent(id) {
    this.deletingId = id;

    await new Promise(resolve => setTimeout(resolve, 300))

    const response = await deleteEvent(id);

    if (response) {
      this.events = this.events.filter(e => e.id !== id);
      this.notification.show('Event removed.', 'success');
    } else {
      this.notification.show('Failed to remove event.', 'error');
    }

    this.deletingId = null;
  }
}
