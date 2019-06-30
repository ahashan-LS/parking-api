const express = require('express')
const ParkingPlot = require('../models/parking-plot')
const router = new express.Router()

router.patch('/park/:id', async (req, res) => {
    try {
        const _id = req.params.id
        const plot = await ParkingPlot.findById(_id)
        if(!plot){
            return res.status(404).send()
        }
        if(plot.booked){
            const emptyPlot = await ParkingPlot.findOne({booked:false})
            if(!emptyPlot){
                return res.status(400).json({
                    status:"failed",
                    message:"All parking plot are booked at this moment"
                })
            }
            return res.status(400).json({
                status:"failed",
                message:"The plot is booked at this moment! But, plot: "+emptyPlot.code+" is available"
            })
            
        }
        const updatedPlot = await ParkingPlot.findByIdAndUpdate(req.params.id, {booked:true}, {new:true})
        if(!updatedPlot){
            return res.status(500).json({
                status:"failed",
                message:"Unable to book the plot. Internal Error"
            })
        }
        return res.status(200).json({
            status:"Success",
            message:"The plot is successfully booked!"
        })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
        
    }
})

module.exports = router