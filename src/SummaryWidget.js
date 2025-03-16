import React from 'react';

const SummaryWidget = ({ flights }) => {
  const totalFlights = flights.length;
  const delayedFlights = flights.filter(flight => {
    if (!flight.actual || !flight.scheduled) return false;
    const scheduledTime = new Date(flight.scheduled).getTime();
    const actualTime = new Date(flight.actual).getTime();
    return actualTime - scheduledTime > 15 * 60 * 1000; // 15 minuti
  }).length;

  return (
    <div style={{ backgroundColor: '#1a1a1a', color: '#00ff00', padding: '10px', borderRadius: '5px' }}>
      <h3>Riepilogo Voli</h3>
      <p>Totale Voli: {totalFlights}</p>
      <p>Voli in Ritardo: {delayedFlights}</p>
    </div>
  );
};

export default SummaryWidget;