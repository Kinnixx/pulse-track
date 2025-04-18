import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class NotificationService extends Service {
  @tracked message = '';
  @tracked type = '';
  @tracked visible = false;

  show(message, type, duration = 3000) {
    this.message = message;
    this.type = type;
    this.visible = true;

    setTimeout(() => {
      this.visible = false;
      this.message = '';
      this.type = '';
    }, duration);
  }
}
