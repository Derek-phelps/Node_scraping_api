const axios = require('axios')
const cheerio = require('cheerio')

const get = async (url, cookie) => {
    const response = await axios({
        method: 'get',
        url: url,
        headers: {
            'Cookie': cookie
        }
    })
    if (response.error) return({ error:   'Not found User!'})
    
    const html = response.data
    return cheerio.load(html)    
}

const post = async (url, cookie, data) => {
    const response = await axios({
        method: 'post',
        url: url,
        headers: {
            'Cookie': cookie
        }
    }, data)
    if (response.error) {
        console.log('error')
        return response
    }
    console.log('response.data')
    return response.data
}

module.exports = {
    get: get,
    post: post
}