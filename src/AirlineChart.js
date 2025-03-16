import React, { useEffect, useRef } from 'react';

const AirlineChart = ({ flights }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const airlines = flights.reduce((acc, flight) => {
      acc[flight.airline] = (acc[flight.airline] || 0) + 1;
      return acc;
    }, {});

    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new window.Chart(ctx, {  // Usa window.Chart invece di Chart
      type: 'pie',
      data: {
        labels: Object.keys(airlines),
        datasets: [{
          data: Object.values(airlines),
          backgroundColor: ['#00ff00', '#ff00ff', '#00ffff', '#ffff00', '#ff0000'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#00ff00'
            }
          }
        }
      }
    });
  }, [flights]);

  return <canvas ref={chartRef} style={{ maxWidth: '400px' }}></canvas>;
};

export default AirlineChart;