const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 8080
require('dotenv').config()

app.use(bodyParser.json())

//lat and lon need to be sent from the front end.

app.get('/', async (req, res) => {
	const {lat, lon, option } = req.query

	const url = `https://api.meetup.com/find/upcoming_events?photo-host=public&page=300&sig_id=${process.env.API_SIG_ID}&radius=50&lon=+${lon}&lat=${lat}&sig=${process.env.API_KEY}`
	const response = await axios.get(url)
	const upcomingEventsNearYou = await response.data.events
		.map(({name, id, description, group: {urlname}}) => ({id, urlname, name, description}))
		.filter(event => event.description && event.description.includes(option))

	res.send(upcomingEventsNearYou)
})

app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`))
