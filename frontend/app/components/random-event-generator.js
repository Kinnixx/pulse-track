import Component from '@glimmer/component';
import { action } from '@ember/object';
import { createEvent } from '../utils/api';
import { inject as service } from '@ember/service';

export default class RandomEventGenerator extends Component {
  @service notification;

  @action
  async generateEvent() {
    const types = ['info', 'warning', 'error'];

    const messagesByType = {
      info: [
        'User logged in',
        'Scheduled backup completed',
        'Heartbeat received'
      ],
      warning: [
        'High memory usage detected',
        'Unusual activity pattern',
        'Slow API response'
      ],
      error: [
        'Database connection failed',
        'Unhandled exception occurred',
        'Service timeout'
      ]
    };

    const randomType = types[Math.floor(Math.random() * types.length)];
    const messages = messagesByType[randomType];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    const response = await createEvent({ type: randomType, message: randomMessage });

    if (response) {
      this.notification.show('Random event created!', 'success');
    } else {
      this.notification.show('Failed to generate random event.', 'error');
    }
  }
}
