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
