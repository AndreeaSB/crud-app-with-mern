const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const FoodModel = require('./models/Food')

const app = express()
const PORT = 3000;
const MONGO_URI = 'mongodb+srv://AndreeaSB:testing123@cluster0.hrc7roo.mongodb.net/CrudApp';

 app.use(express.json())
 app.use(cors())
 app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/insert', async (req, res) => {
    console.log('inset function')
    const food = new FoodModel({
        foodName: req.body.foodName,
        daysSinceIAte: req.body.days
    })
    try {
        await food.save()
    } catch(err) {
        console.log(err)
    }
}) 

app.put('/update', async (req, res) => {

    console.log('update fct')
    
    try {
        FoodModel.findByIdAndUpdate(req.body.id, {foodName: req.body.foodName}).then(updatedFood => {
            res.send('updated')
        })
    } catch(err) {
        console.log(err)
    }
}) 

app.get('/read', (req,res) => {
    FoodModel.find({}).then(result => {
        res.send(result)
    }).catch(err => {
        res.send(err)
    })
})

app.delete('/delete/:id',async(req,res) => {
    const id = req.params.id
    console.log('delete fct server')

    await FoodModel.findByIdAndDelete(id).then(deletedFood => {
        res.send('Deleted')
        console.log(deletedFood)
    }).catch(err => {
        res.send(err)
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} :)`)
})