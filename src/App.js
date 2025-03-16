import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';
import FlightTable from './FlightTable';
import SummaryWidget from './SummaryWidget';
import AirlineChart from './AirlineChart';
import './App.css'; // importa il nuovo file CSS

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
    <div className="app-container">
      <h1 className="app-header">Dashboard Aeroporti Milano</h1>
      
      <div className="grid-container">
        <div className="card">
          <MapComponent origins={uniqueOrigins} />
        </div>
        <div className="card flight-table">
          <FlightTable flights={linFlights} title="Arrivi Linate (LIN)" />
        </div>
        <div className="card flight-table">
          <FlightTable flights={mxpFlights} title="Arrivi Malpensa (MXP)" />
        </div>
      </div>

      <div className="grid-container" style={{ marginTop: '20px' }}>
        <div className="card summary-widget">
          <SummaryWidget flights={allFlights} />
        </div>
        <div className="card airline-chart">
          <AirlineChart flights={allFlights} />
        </div>
        {/* Aggiungi altri widget o grafici se necessario */}
      </div>
    </div>
  );
}

export default App;
