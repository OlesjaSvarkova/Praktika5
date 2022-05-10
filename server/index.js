const express = require('express')
const cors = require('cors')
const app = express()
const connect = require('./config')

app.use(cors())
app.set('json spaces', 2)

app.get('/api/continentName/:continent', function (req, res) {
    const continent = req.params.continent
    connect.query("SELECT country.name AS countryName, continent, code, population FROM country " +
    "WHERE continent=  '" + continent + "' order by country.name asc", (error, results) => {
        if (!error) {
            res.json(results.rows)
        }
        else {
            res.json(error.message)
        }
    })
});

app.get('/api/countryName/:countryName', function (req, res) {
    const countryName = req.params.countryName
    connect.query("SELECT country.name AS countryName, continent, code, country.population, city.name AS cityName , governmentform, surfacearea, headofstate FROM country INNER JOIN city ON city.countrycode = country.code " +
    "WHERE country.capital = city.id AND country.name=  '" + countryName + "'", (error, results) => {
        if (!error) {
            res.json(results.rows)
        }
        else {
            res.json(error.message)
        }
    })
});

app.listen(5000, () => {
    console.log('Server is running')
})