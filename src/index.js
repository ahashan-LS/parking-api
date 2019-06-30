const express = require('express')
require('./db/mongoose')
const app = express()
const plotRoutes = require('./routes/plots')
const port = process.env.PORT || 3000

app.use(express.json())
app.use(plotRoutes)
app.listen(port, ()=>{
    console.log('Server is up and running in port: '+port)
})