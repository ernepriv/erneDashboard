const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const airport = req.query.airport === 'MXP' ? 'mxp' : 'lin';
    const now = new Date();
    const dateFrom = now.toISOString().split('T')[0] + 'T00:00'; // Inizio giornata corrente
    const dateTo = now.toISOString().split('T')[0] + 'T23:59';   // Fine giornata corrente

    const apiUrl = 'https://apiextra.seamilano.eu/ols-flights/v1/en/operative/flights/lists';
    const response = await axios.get(apiUrl, {
      params: {
        movementType: 'A',
        dateFrom: dateFrom,
        dateTo: dateTo,
        loadingType: 'P',
        airportReferenceIata: airport,
        mfFlightType: 'P'
      },
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'keyId': '6bc034ea-ae66-40ce-891e-3dccf63cb2eb', // Chiave API trovata
        'Accept': '*/*',
        'Origin': airport === 'mxp' ? 'https://www.milanomalpensa-airport.com' : 'https://www.milanolinate-airport.com',
        'Referer': airport === 'mxp' ? 'https://www.milanomalpensa-airport.com/' : 'https://www.milanolinate-airport.com/'
      }
    });

    const flights = response.data.data.map(flight => ({
      flightNumber: flight.flightNumber || 'N/A',
      airline: flight.airlineDescription || 'Sconosciuta',
      origin: flight.routing[0]?.airportLabel || 'Sconosciuto',
      scheduled: flight.scheduledArrivalTime || 'N/A',
      actual: flight.actualArrivalTime || 'N/A',
      status: flight.statusPubblicDescription || 'Sconosciuto'
    }));

    res.json({ flights });
  } catch (error) {
    console.error('Errore:', error.message);
    res.status(500).json({ error: 'Errore nel recupero dati: ' + error.message });
  }
};