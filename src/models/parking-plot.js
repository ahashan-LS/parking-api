const mongoose = require('mongoose')

const ParkingPlot = mongoose.model('ParkingPlot',{
    code:{
        type:String,
        required:true,
        trim:true
    },
    booked:{
        type:Boolean,
        default:false,    
    }    
})
module.exports = ParkingPlot