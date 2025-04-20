import Service from '@ember/service';
import config from 'frontend/config/environment';

export default class ApiService extends Service {
  baseUrl = config.APP.apiBaseUrl;

/**
 * Sends a GET request to retrieve all events.
 *
 * @returns {Promise<Object[]>} An array of event objects, or an empty array if an error occurred.
 */
  async getEvents() {
    try {
      const response = await fetch(`${this.baseUrl}/events`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching events:', error);
      return [];
    }
  }

  /**
   * Sends a POST request to create a new event.
   *
   * @param {Object} param0 - An object containing type and message.
   * @param {string} param0.type - The type of the event (info, warning, error).
   * @param {string} param0.message - The message describing the event.
   * @returns {Promise<Response|false>} The response object or false if an error occurred.
   */
  async createEvent({ type, message }) {
    try {
      const response = await fetch(`${this.baseUrl}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ type, message })
      });

      if(!response.ok) {
        console.error('Server responded with error status:', response.status);
        return false;
      }

      return response;
    } catch (error) {
        console.error('Error while creating event:', error);
        return false;
    }
  }

  /**
   * Sends a DELETE request to remove an event by its ID.
   *
   * @param {number} id - The ID of the event to delete.
   * @returns {Promise<boolean>} True if deleted, false if failed.
   */
  async deleteEvent(id) {
    try {
      const response = await fetch(`${this.baseUrl}/event/${id}`, {
        method: 'DELETE',
      });

      if(!response.ok) {
        console.error('Delete failed', response.status);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error deleting event:', error);
      return false;
    }
  }
}
