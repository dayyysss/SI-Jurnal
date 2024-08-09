import React from 'react';

// Menggunakan default value untuk extraObject jika tidak didefinisikan
const CalendarEventsBodyRightDrawer = ({ extraObject = {} }) => {
  // Mendestruktur properti dengan default value
  const { filteredEvents = [] } = extraObject;

  return (
    <div>
      {filteredEvents.length === 0 ? (
        <p>No events available</p>
      ) : (
        <ul>
          {filteredEvents.map(event => (
            <li key={event.id}>{event.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CalendarEventsBodyRightDrawer;
