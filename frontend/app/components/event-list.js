import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class EventListComponent extends Component {
  @service notification;
  @service api;

  @tracked events = [];
  @tracked selectedType = '';
  @tracked selectedDate = null;
  @tracked sortOrder = 'desc';

  @tracked isLoading = true;
  @tracked deletingId = null;

  /**
  * Fetches events from the backend API when the component is initialized.
  */
  constructor() {
    super(...arguments);
    this.loadEvents();
  }

 /**
 * Loads all events from the API and stores them in the tracked `events` array.
 *
 * @returns {Promise<void>}
 */
   async loadEvents() {
    try {
      const data = await this.api.getEvents();
      this.events = data;
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      this.isLoading = false
    }
  }

  /**
 * Filters the list of events based on selected type and date.
 * @returns {Array} The filtered list of events.
 */
  get filteredEvents() {
    let filtered = this.events;

    if(this.selectedType) {
      filtered = filtered.filter(event => event.type === this.selectedType);
    }

    if(this.selectedDate) {
      filtered = filtered.filter(event =>  {
        const eventDate = event.created_at.split(' ')[0];
        return eventDate === this.selectedDate;
      });
    }

    // Sort by date
    filtered = filtered.slice().sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      return this.sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

    return filtered;
  }

  /**
 * Updates the selected type for filtering.
 * @param {Event} event The change event from the select input.
 */
  @action
  updateFilter(event) {
    this.selectedType = event.target.value;
  }

  /**
 * Updates the selected date for filtering.
 * @param {Event} event The change event from the date input.
 */
  @action
  updateDateFilter(event) {
    this.selectedDate = event.target.value;
  }

  /**
   * Toggles the sort order between ascending and descending.
   */
  @action
  toggleSortOrder() {
    this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
  }

/**
 * Deletes an event by its ID, updates the local list, and shows a notification.
 * Adds a short delay for fade-out animation before removal.
 *
 * @param {number} id - The ID of the event to delete.
 */
  @action
  async removeEvent(id) {
    this.deletingId = id;

    await new Promise(resolve => setTimeout(resolve, 300))

    const response = await this.api.deleteEvent(id);

    if (response) {
      this.events = this.events.filter(e => e.id !== id);
      this.notification.show('Event removed.', 'success');
    } else {
      this.notification.show('Failed to remove event.', 'error');
    }

    this.deletingId = null;
  }
}
