import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';
import FlightTable from './FlightTable';
import SummaryWidget from './SummaryWidget';
import AirlineChart from './AirlineChart';

function App() {
  const [linFlights, setLinFlights] = useState([]);
  const [mxpFlights, setMxpFlights] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlights = async (airport) => {
      try {
        const response = await axios.get(`/api/flights?airport=${airport}`);
        return response.data.flights;
      } catch (err) {
        setError(err.message);
        return [];
      }
    };

    const loadData = async () => {
      const linData = await fetchFlights('LIN');
      const mxpData = await fetchFlights('MXP');
      setLinFlights(linData);
      setMxpFlights(mxpData);
    };

    loadData();
  }, []);

  if (error) {
    return <div style={{ color: 'red' }}>Errore: {error}</div>;
  }

  const allFlights = [...linFlights, ...mxpFlights];
  const uniqueOrigins = [...new Set(allFlights.map(flight => flight.origin))];

  return (
    <div style={{ backgroundColor: '#000000', color: '#00ff00', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Dashboard Aeroporti Milano</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        <MapComponent origins={uniqueOrigins} />
        <FlightTable flights={linFlights} title="Arrivi Linate (LIN)" />
        <FlightTable flights={mxpFlights} title="Arrivi Malpensa (MXP)" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '20px' }}>
        <SummaryWidget flights={allFlights} />
        <AirlineChart flights={allFlights} />
        {/* Aggiungi altri widget qui se vuoi */}
      </div>
    </div>
  );
}

export default App;