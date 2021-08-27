const constants = require('../config/index')
const api = require('../api/api')
const generateCookie = require('../utils/utils')
const {v4 : uuidv4} = require('uuid')

const getBetData = async (req) => {
    const betCookie = await generateCookie(req)
    console.log(betCookie)
    try {
        const $ = await api.get(constants.BET_API_URL, betCookie)
        const scrapedData = []
    
        $('tbody').each((index, element) => {
            if (index === 0) return true
            const id = uuidv4()
            const tds = $(element).find('td')
            const betDate = $(tds[0]).text()
            const betNumber = $(tds[1]).text()
            const betType = $(tds[2]).text()
            const betName = $(tds[3]).text()
            const betAmount = $(tds[4]).text()
            const Odds = $(tds[5]).text()
            const Entry = $(tds[6]).text()
            const Condition = $(tds[7]).text()
            const tableRow = { id, betDate, betNumber, betType, betName, betAmount, Odds, Entry, Condition }      
            scrapedData.push(tableRow)
                  
        })
        return ({ msg: 'success', betData: scrapedData})
    } catch (err) {
       console.log(err.message) 
    }
    
}

const makeBet = async (data) => {
    try {
        const cookie = generateCookie(data)
        const response = await api.post(
            constants.BET_CREATE_URL,
            constants.BET_COOKIE,
            cookie)
            if (response) {
                return ({ msg:  'success!'})
               
            }
    } catch (err) {
        return ({ error:  err.message })
    } 
}

module.exports = {
    getBetData: getBetData,
    makeBet: makeBet
}

