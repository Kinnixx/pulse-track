import Route from '@ember/routing/route';;

export default class EventsRoute extends Route {

  async model() {
    let response = await fetch('http://localhost:8000/events');

    if(!response.ok) {
      throw new Error('Failed to fetch events');
    }

    return await response.json();
  }
}
