const express = require('express')
const mongoose = require('mongoose')

const app = express()
const PORT = 3000

app.use(express.json)

mongoose.connect('')

app.listen(PORT, () => {
    console.log('Server is running :)')
})