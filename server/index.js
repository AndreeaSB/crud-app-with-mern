const express = require('express')
const mongoose = require('mongoose')
const FoodModel = require('./models/Food')

const app = express()
const PORT = 3000;
const MONGO_URI = 'mongodb+srv://AndreeaSB:testing123@cluster0.hrc7roo.mongodb.net/CrudApp';

 app.use(express.json())

 mongoose.Promise = global.Promise;
 mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true}).then(() => {
     console.log("Connected to MongoDB successfully :)");
 }).catch((e) => {
     console.log("Error while attemting to connect to MongoDB");
     console.log(e);
 });

 app.get('/', (req,res) => {
    console.log("hello lume!")
    res.send("Hello lume!")
})

app.get('/getsmth', async (req, res) => {
    console.log(`I'm in`)
    const food = new FoodModel({
        foodName: 'apple',
        daysSinceIAte: 3
    })
    try {
        await food.save()
    } catch(err) {
        console.log(err)
    }
}) 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} :)`)
})