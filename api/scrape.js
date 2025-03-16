const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
  try {
    // Esempio: scraping di titoli da un sito (modifica l'URL e il selettore)
    const { data } = await axios.get('https://example.com');
    const $ = cheerio.load(data);
    const titles = [];
    $('h2').each((i, elem) => titles.push($(elem).text()));
    res.json({ titles });
  } catch (error) {
    res.status(500).json({ error: 'Errore nello scraping' });
  }
};