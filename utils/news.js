const fetch = require('node-fetch');
const xml2js = require('xml2js');

class NewsService {
  constructor() {
    this.rssUrl = 'https://feeds.feedburner.com/TheHackersNews';
    this.parser = new xml2js.Parser();
  }

  async getLatestNews(maxItems = 3) {
    try {
      const response = await fetch(this.rssUrl);
      const xmlData = await response.text();
      
      const result = await this.parser.parseStringPromise(xmlData);
      
      if (result.rss && result.rss.channel && result.rss.channel[0].item) {
        const items = result.rss.channel[0].item.slice(0, maxItems);
        
        return items.map(item => ({
          title: item.title[0],
          description: item.description[0],
          link: item.link[0],
          pubDate: item.pubDate[0]
        }));
      }
      
      return [];
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  }

  formatNewsMessage(newsItems) {
    if (newsItems.length === 0) {
      return '❌ Tidak dapat mengambil berita saat ini. Silakan coba lagi nanti.';
    }

    let message = '📰 *BERITA CYBER SECURITY TERBARU*\n\n';
    
    newsItems.forEach((item, index) => {
      const title = item.title.replace(/[<>]/g, '');
      const description = item.description.replace(/[<>]/g, '').substring(0, 150) + '...';
      
      message += `*${index + 1}. ${title}*\n`;
      message += `${description}\n`;
      message += `🔗 [Baca selengkapnya](${item.link})\n\n`;
    });
    
    return message;
  }
}

module.exports = NewsService;
