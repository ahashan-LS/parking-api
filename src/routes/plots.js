const express = require('express')
const ParkingPlot = require('../models/parking-plot')
const router = new express.Router()

router.get('/plots', async (req,res)=>{
    try {
        const plots = await ParkingPlot.find({})
        res.send(plots)
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
})

router.post('/plots', async (req, res)=>{
    const plot = new ParkingPlot(req.body)
    try {
        await plot.save()
        res.send(plot)
    } catch (error) {
        
    }
})

module.exports = router