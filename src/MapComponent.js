import React, { useEffect, useRef } from 'react';

const MapComponent = ({ origins }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = L.map('map').setView([45.4642, 9.1900], 5); // Centrata su Milano
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
      mapRef.current = map;
    }

    // Rimuovi marker esistenti
    mapRef.current.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        mapRef.current.removeLayer(layer);
      }
    });

    // Aggiungi marker per le origini
    origins.forEach(origin => {
      const coord = getCoordinates(origin);
      if (coord) {
        L.marker(coord).addTo(mapRef.current).bindPopup(origin);
      }
    });
  }, [origins]);

  return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
};

// Coordinate predefinite per alcune origini
const getCoordinates = (airportLabel) => {
  const coords = {
    'OSLO': [60.1939, 11.1004],
    'GDANSK': [54.3776, 18.4662],
    'LONDON GATWICK': [51.1481, -0.1903],
    'PARIS CHARLES DE GAULLE': [49.0097, 2.5479],
    'ROME FIUMICINO': [41.8003, 12.2389],
    'AMSTERDAM SCHIPHOL': [52.3086, 4.7639],
    'MILANO MALPENSA': [45.6306, 8.7281],
    'BERLINO TEGEL': [52.5597, 13.2877],
    'MADRID BARAJAS': [40.4522, -3.5602],
    'BARCELLONA EL PRAT': [41.2970, 2.0783],
    'BRUXELLES ZAVENTEM': [50.9019, 4.4844],
    'VIENNA SCHWECHAT': [48.1103, 16.5697],
    'BUDAPEST LISZT FERENC': [47.4368, 19.2556],
    'PRAGA VÁCLAV HAVEL': [50.1006, 14.26],
    'ZURIGO': [47.4647, 8.5492],
    'ATHINAI ELEFTHERIOS VENIZELOS': [37.9364, 23.9447],
    'STOCCOLMA ARLANDA': [59.6519, 17.9186],
    'COPENAGHEN KASTRUP': [55.6170, 12.6568],
    'OSLO GARDERMOEN': [60.1939, 11.1004],
    'HELSINKI VANTAA': [60.3172, 24.9633],
    'LISBONA HUMBERTO DELGADO': [38.7812, -9.1355],
    'DUBLINO': [53.4219, -6.2701],
    'LONDRA HEATHROW': [51.4700, -0.4543],
    'LONDRA STANSTED': [51.8747, 0.2350],
    'LONDRA LUTON': [51.8747, -0.3683],
    'LONDRA CITY': [51.5053, 0.0554],
    'MALPENSA': [45.6306, 8.7281],
    'MILANO LINATE': [45.4612, 9.2747],
    'MILANO ORIO AL SERIO': [45.7000, 9.7000],
    'ROMA CIAMPINO': [41.8003, 12.5942],
    'ROMA FIUMICINO': [41.8003, 12.2389],
    'NAPOLI CAPODICHINO': [40.8869, 14.2903],
    'CATANIA FONTANAROSSA': [37.4667, 15.0667],
    'PALERMO FALCONE BORSELLINO': [38.1758, 13.1006],
    'BARI KAROL WOJTYLA': [41.1389, 16.7611],
    'TARANTO GROTTAGLIE': [40.4647, 17.4472],
    'BRINDISI PAPOLA CASALE': [40.6397, 17.9472],
    'LECCE GALATINA': [40.3000, 18.1667],
    'PESCARA LIBERA': [42.4614, 14.1844],
    'PISA GALILEI': [43.6833, 10.4000],
    'FIRENZE PERETOLA': [43.8103, 11.2056],
    'GENOVA COLUMBUS': [44.4138, 8.8378],
    'TORINO SANDRO PERTINI': [45.2000, 7.6499],
    'VENEZIA MARCO POLO': [45.5056, 12.3519],
    'VERONA VILLAFRANCA': [45.3981, 10.9281],
    'CAGLIARI ELMAS': [39.2519, 9.0544],
    'OLBIA COSTA SMERALDA': [40.9206, 9.5167],
    'ALGHERO FERTILIA': [40.5656, 8.3194],
    'BERGAMO ORIO AL SERIO': [45.7000, 9.7000],
    'COMO': [45.8000, 9.0833],
    'LECCO': [45.8667, 9.4000],
    'SEREGNO': [45.7667, 9.2667],
    'MONZA': [45.5833, 9.2667],
    'MILANO': [45.4642, 9.1900],
    'ROMA': [41.9028, 12.4964],
    'NAPOLI': [40.8522, 14.2681],
    'CATANIA': [37.5079, 15.0830],
    'PALERMO': [38.1157, 13.3615],
    'BARI': [41.1256, 16.8663],
    'TARANTO': [40.4647, 17.4472],
    'BRINDISI': [40.6349, 17.9472],
    'LECCE': [40.3526, 18.1732],
    'PESCARA': [42.4614, 14.1844],
    'PISA': [43.7167, 10.4000],
    'FIRENZE': [43.7696, 11.2558],
    'GENOVA': [44.4056, 8.9463],
    'TORINO': [45.0703, 7.6869],
    'VENEZIA': [45.4408, 12.3155],
    'VERONA': [45.4384, 10.9916],
    'CAGLIARI': [39.2238, 9.1217],
    'OLBIA': [40.9236, 9.5167],
    'ALGHERO': [40.5656, 8.3194]
  };
  return coords[airportLabel];
};

export default MapComponent;