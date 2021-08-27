const express = require('express')
const router = express.Router()

const match = require('../service/match.service')
const user = require('../service/user.service')
const Bet = require('../service/bet.service')


router.get('/userData', async (req, res, next) => {
    const userData = await user.getUserData()
    res.status(200).send(userData)
})

router.get('/boxData', async(req, res, next) => {
    const boxData =  await match.getBoxData()
    res.status(200).send(boxData)
})

router.get('/betData', async(req, res, next) => {
    
    const betList =  await Bet.getBetData(req.body)
    res.status(200).send(betList)
})

router.post('/makeBet', async(req, res, next) => {    
    const betResult = await Bet.makeBet(req.body)
    res.status(200).send(betResult)
   
})

module.exports = router