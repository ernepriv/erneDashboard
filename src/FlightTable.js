import React from 'react';

const FlightTable = ({ flights, title }) => {
  return (
    <div>
      <h2>{title}</h2>
      <table>
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
            <tr key={index}>
              <td>{flight.flightNumber}</td>
              <td>{flight.airline}</td>
              <td>{flight.origin}</td>
              <td>{new Date(flight.scheduled).toLocaleTimeString()}</td>
              <td>{flight.actual ? new Date(flight.actual).toLocaleTimeString() : 'N/A'}</td>
              <td style={{ color: flight.status === 'LANDED' ? '#00aa00' : '#aa0000' }}>
                {flight.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightTable;
