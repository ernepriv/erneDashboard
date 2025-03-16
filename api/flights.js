const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const airport = req.query.airport === 'MXP' ? 'mxp' : 'lin';
    const now = new Date();
    // Formato data con + e %3A
    const dateFrom = `${now.toISOString().split('T')[0]}+${now.toTimeString().slice(0, 5).replace(':', '%3A')}`; // Es. 2025-03-16+14%3A30
    const dateTo = `${now.toISOString().split('T')[0]}+23%3A59`; // Es. 2025-03-16+23%3A59

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
        'keyId': '6bc034ea-ae66-40ce-891e-3dccf63cb2eb',
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
    console.error('Errore dettagliato:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    res.status(500).json({ error: 'Errore nel recupero dati: ' + error.message });
  }
};