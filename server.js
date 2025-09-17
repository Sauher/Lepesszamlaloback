const express = require('express')
var cors = require('cors')
const {initStore} = require(`./utils/store`)
const userRoutes = require('./modules/users')
const stepRoutes = require('./modules/steps')
const app = express()

// Middleware-ek
app.use(cors())
app.use(express.json()) //json formátum megkövetelése
app.use(express.urlencoded({extended: true})); //req body-n keresztül átmenjenek az adatok


app.get('/', (req, res) => {
  res.send({msg:'Backend API by Bajai SZC Türr István Technikum - 13.A Szoftverfejlesztő '})
})

app.use(`/users`,userRoutes)
app.use(`/steps`, stepRoutes)
app.listen(3000, ()=>{
    console.log(`Server listening on http://localhost:3000`)
})