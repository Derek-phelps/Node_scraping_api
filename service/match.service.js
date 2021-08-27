const constants = require('../config/index');
const api = require('../api/api');

const getBoxData = async () => {
  const bet_cookies = await api.parseCookies(constants.USER_COOKIE)
  console.log(bet_cookies)
  try {
    const $ = await api.get(
      constants.USER_BOX_URL,
      constants.USER_COOKIE
    )

    const scrapedData = []
    $('table > tbody > tr').each((index, element) => {
      if (index === 0) return true;
      const tds = $(element).find('td');
      const time = $(tds[1]).text();
      const selen1 = $(tds[3]).text();
      const selen2 = $(tds[4]).text();
      const selen3 = $(tds[5]).text();
      const tableRow =  { time, selen1, selen2, selen3 }
      scrapedData.push(tableRow)
    })
    return ({msg: 'success!', boxData: scrapedData})
  } catch (err) {
    return err.message
  }
    
} 

exports.getBoxData = getBoxData
