import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { createEvent } from '../utils/api';

export default class CreateFormComponent extends Component {
  @service router;
  @service notification;

  type = '';
  message = '';

  @action
  updateType(event) {
    this.type = event.target.value;
  }

  @action
  updateMessage(event) {
    this.message = event.target.value;
  }

  @action
  async submitForm(event) {
    event.preventDefault();

    if (!this.type || !this.message) {
      this.notification.show('Type and message are required.', 'warning');
      return;
    }

    const response = await createEvent({ type: this.type, message: this.message });

    if (response) {
      this.notification.show('Event successfully created!', 'success');
      this.router.transitionTo('events');
    } else {
      this.notification.show('Failed to create event.', 'error');
    }
  }
}
