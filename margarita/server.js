const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios')
const app = express()
const PORT = process.env.PORT || 8080

app.use(bodyParser.json())

const apikey = 'a4c5ea4ff6248b08c89790e834395f2aa70cdd81'

// app.get('/', (req, res) => {
// 	axios.get('https://api.meetup.com/find/upcoming_events?photo-host=public&page=20&sig_id=248508646&lon=+-79.24829869999999&lat=43.8590714&sig=a4c5ea4ff6248b08c89790e834395f2aa70cdd81')
// 		.then(resp => res.send(resp.data.events.map(({name, description}) => ({name, description}))))
// 		.catch(e => res.json({e}))
// })

//lat and lon need to be sent from the front end.

app.get('/', async (req, res) => {
	const response = await axios.get(`https://api.meetup.com/find/upcoming_events?photo-host=public&page=20&sig_id=248508646&lon=+-79.2585416&lat=43.8734314&sig=${apikey}`)
	const upcomingEventsNearYou = await response.data.events.map(({name, id, description, group: {urlname}}) => ({id, urlname, name, description}))
	res.send(upcomingEventsNearYou)
})

app.listen(PORT, () => console.log(`Listening on localhost:${PORT}`))