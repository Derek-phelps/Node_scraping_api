const cryptoJs = require('crypto-js')
const constants = require('../config/index')

const generateCookie = ({
    username = "",
    password = "",
    betType = "",
    betName = "",
    betAmount = "",
    totalBalance = "",
    playerName = "",
    entry = ""
}) => {
    const GN_LOGIN = generateToken({ username, password })
    const GN_BETSLIP_CAL = generateToken({ betType, betName, betAmount, totalBalance, playerName})
    const GN_CUST_EXT = generateToken(entry)
    
    const cookie =  [
        'GN_CAL_SPORTS', '=', 'Y',
        ';GN_SPORTS_REDIRECT', '=', 'Y',
        ';GN_PRC', '=', '"US"',
        ';_gcl_au', '=', '1.1.1346816826.1620788849',
        ';_ga', '=', 'GA1.3.905184216.1620788850',
        ';GN_REGISTERED', '=', 'Y',
        ';_pro', '=', 'sports',
        ';_lastpro', '=', 'sports',
        ';_showsmsverbo',  '=', '29476555',
        ';__utma', '=', '153153834.905184216.1620788850.1620958631.1620958631.1',
        ';__utmz', '=', '153153834.1620958631.1.1.utmcsr=static.caliente.mx|utmccn=(referral)|utmcmd=referral|utmcct=/banner/ngmdesktop/casinoclient.html',
        ';_gid', '=', 'GA1.3.1916734402.1621191705',
        ';GN_SESSTRACKING',  '=', 'cc98e6f4-53f5-44bd-8a92-f1a5269d7c3e',
        ';GN_SESSION', '=', '1621342894439',
        ';GN_PUSH_METHOD', '=', '0',
        'pas[calienteclub][real][isOnline]', '=', '1',
        ';GN_AFFILIATE', '=', 'default78',
        ';GN_PLACED_BET', '=', 'Y',
        ';GN_USERNAME', '=', 'ESPNTEST1',
        '_loginmsg', '=', '1',
        ';GN_TREGION', '=', 'RFUwLiFFZHGBlny_bEaa8YQdPO9wcqamQuVGIMHy1LAtlqZrG-OhvWMB4DS5Ucet',
        'GN_TZ_MODE', '=', 'B',
        ';_global', '=', 'MX,QUE,QUERETARO,5000,0',
        ';GN_BETSLIP_CAL', '=', GN_BETSLIP_CAL,
        ';GN_BS_OPTIONS_CAL', '=', '{"bet_views" ={"hidden" =[]},"prc_change_policy" =null,"views" ={"hidden" =["sgl","acc","sys","fc"],"vtype" ="standard"},"stake_inc" =null,"ew_opt" ={},"qb_stake" =100,"stakes" ={}}',
        ';GN_LOGIN', '=', GN_LOGIN,
        ';GN_CUST_EXT', '=', GN_CUST_EXT,
        ';_gali', '=', 'header-area',
        '_dc_gtm_UA-46882827-1', '=', '1'
    ].join('')

    return cookie
}

const generateToken = (value) => {
    const token = cryptoJs.AES.encrypt(
        JSON.stringify(value),
        constants.CRYPT_STR
    ).toString()
    return token
}

const parseToken = (value) => {
    const token = cryptoJs.AES.decrypt(
        value, constants.CRYPT_STR
    ).toString(cryptoJs.enc.Utf8)
}

module.exports = generateCookie

