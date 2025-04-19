/**
 * Sends a POST request to create a new event.
 *
 * @param {Object} param0 - An object containing type and message.
 * @param {string} param0.type - The type of the event (info, warning, error).
 * @param {string} param0.message - The message describing the event.
 * @returns {Promise<Response|false>} The response object or false if an error occurred.
 */
export async function createEvent({ type, message }) {
  try {
    const response = await fetch('http://localhost:8000/events', {
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
export async function deleteEvent(id) {
  try {
    const response = await fetch(`http://localhost:8000/event/${id}`, {
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
