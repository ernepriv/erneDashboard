import React from 'react';

const FlightTable = ({ flights, title }) => {
  return (
    <div style={{ backgroundColor: '#1a1a1a', color: '#00ff00', padding: '10px', borderRadius: '5px' }}>
      <h2>{title}</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Volo</th>
            <th>Compagnia</th>
            <th>Origine</th>
            <th>Previsto</th>
            <th>Effettivo</th>
            <th>Stato</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#2a2a2a' : '#1a1a1a' }}>
              <td>{flight.flightNumber}</td>
              <td>{flight.airline}</td>
              <td>{flight.origin}</td>
              <td>{new Date(flight.scheduled).toLocaleTimeString()}</td>
              <td>{flight.actual ? new Date(flight.actual).toLocaleTimeString() : 'N/A'}</td>
              <td style={{ color: flight.status === 'LANDED' ? '#00ff00' : '#ff0000' }}>{flight.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightTable;