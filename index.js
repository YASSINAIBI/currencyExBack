const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');

require('dotenv').config()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://yassine:yassine@cluster0.xiqyp.mongodb.net/currencyEx?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('connected to database'));

const Currency = mongoose.model('Currency', { value: Number });

app.post('/addData', (req, res) => {
    const currency = new Currency({ value: req.body.currencyVal });
    currency.save().then(() => console.log('currency is added succesfully'));
    res.end()
})

app.get('/', (req, res)=> {
    res.send('welcome')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`app is now listening at port ${PORT}`))