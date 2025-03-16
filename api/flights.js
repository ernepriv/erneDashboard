const axios = require('axios');
const https = require('https');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  try {
    const airport = req.query.airport === 'MXP' ? 'MXP' : 'LIN';
    const url = airport === 'LIN'
      ? 'https://www.milanolinate-airport.com/en/flights/arrivals'
      : 'https://www.milanomalpensa-airport.com/en/flights/arrivals';

    const agent = new https.Agent({
      rejectUnauthorized: false, // Ignora errori di certificato (non ideale per produzione)
      secureOptions: require('constants').SSL_OP_LEGACY_SERVER_CONNECT // Abilita renegoziazione legacy
    });

    const { data } = await axios.get(url, {
      httpsAgent: agent,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
    });
    const $ = cheerio.load(data);

    const flights = [];
    $('table tr, .flight-row, .arrival-item').each((i, elem) => {
      const flightNumber = $(elem).find('td:nth-child(1), .flight-number').text().trim() || 'N/A';
      const airline = $(elem).find('td:nth-child(2), .airline').text().trim() || 'Sconosciuta';
      const origin = $(elem).find('td:nth-child(3), .origin').text().trim() || 'Sconosciuto';
      const scheduled = $(elem).find('td:nth-child(4), .scheduled').text().trim() || 'N/A';
      const status = $(elem).find('td:nth-child(5), .status').text().trim() || 'Sconosciuto';

      if (flightNumber !== 'N/A') {
        flights.push({ flightNumber, airline, origin, scheduled, status });
      }
    });

    if (flights.length === 0) {
      console.log(`Nessun dato trovato per ${airport}. HTML ricevuto:`, data.substring(0, 500));
    }

    res.json({ flights });
  } catch (error) {
    console.error('Errore:', error.message);
    res.status(500).json({ error: 'Errore nello scraping: ' + error.message });
  }
};