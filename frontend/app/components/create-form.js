import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CreateFormComponent extends Component {
  @service router;

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
      alert('Type and message are required.');
      return;
    }

    const response = await fetch('http://localhost:8000/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        type: this.type,
        message: this.message,
      }),
    });

    if (response.ok) {
      alert('Event created!');
      this.router.transitionTo('events');
    } else {
      alert('Failed to create event.');
    }
  }
}
