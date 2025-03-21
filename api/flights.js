const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const airport = req.query.airport === 'MXP' ? 'mxp' : 'lin';
    const now = new Date();
    const twoHoursAgo = new Date(now - 2 * 60 * 60 * 1000); // 2 ore fa

    // Costruisci l'URL manualmente per evitare ricodifica
    const dateFrom = `${twoHoursAgo.toISOString().split('T')[0]}+${twoHoursAgo.toTimeString().slice(0, 5).replace(':', '%3A')}`;
    const dateTo = `${now.toISOString().split('T')[0]}+${now.toTimeString().slice(0, 5).replace(':', '%3A')}`;
    const apiUrl = `https://apiextra.seamilano.eu/ols-flights/v1/en/operative/flights/lists?movementType=A&dateFrom=${dateFrom}&dateTo=${dateTo}&loadingType=P&airportReferenceIata=${airport}&mfFlightType=P`;

    const response = await axios.get(apiUrl, {
      headers: {
        'Accept': '*/*',
        'Accept-Language': 'en,it-IT;q=0.9,it;q=0.8,en-US;q=0.7',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Type': 'application/json',
        'DNT': '1',
        'Origin': airport === 'mxp' ? 'https://www.milanomalpensa-airport.com' : 'https://www.milanolinate-airport.com',
        'Pragma': 'no-cache',
        'Referer': airport === 'mxp' ? 'https://www.milanomalpensa-airport.com/' : 'https://www.milanolinate-airport.com/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'cross-site',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36 Edg/134.0.0.0',
        'keyId': '6bc034ea-ae66-40ce-891e-3dccf63cb2eb',
        'sec-ch-ua': '"Chromium";v="134", "Not:A-Brand";v="24", "Microsoft Edge";v="134"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"'
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