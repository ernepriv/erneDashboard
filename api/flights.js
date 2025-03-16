const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  try {
    const airport = req.query.airport === 'MXP' ? 'MXP' : 'LIN';
    const url = airport === 'LIN' 
      ? 'https://www.milanolinate-airport.com/en/flights/arrivals'
      : 'https://www.milanomalpensa-airport.com/en/flights/arrivals';

    const { data } = await axios.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' } // Simula un browser
    });
    const $ = cheerio.load(data);

    const flights = [];
    // Selettore per la tabella dei voli (adattato dopo ispezione)
    $('table.flight-table tbody tr').each((i, elem) => {
      const flightNumber = $(elem).find('td:nth-child(1)').text().trim() || 'N/A';
      const airline = $(elem).find('td:nth-child(2)').text().trim() || 'Sconosciuta';
      const origin = $(elem).find('td:nth-child(3)').text().trim() || 'Sconosciuto';
      const scheduled = $(elem).find('td:nth-child(4)').text().trim() || 'N/A';
      const status = $(elem).find('td:nth-child(5)').text().trim() || 'Sconosciuto';

      flights.push({ flightNumber, airline, origin, scheduled, status });
    });

    res.json({ flights });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Errore nello scraping: ' + error.message });
  }
};