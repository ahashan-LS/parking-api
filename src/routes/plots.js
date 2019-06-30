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

router.patch('/plots', async (req,res)=>{
    const plots = await ParkingPlot.updateMany({booked:true},{booked:false})    
    if(plots.nModified){
        return res.status(200).json({
            status:"Success",
            message:plots.nModified+" plots freed!"
        })
    }
    return res.status(400).json({
        status:"Failed",
        message:"No parking plots to free!"
    })
})

module.exports = router