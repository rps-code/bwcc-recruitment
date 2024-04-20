require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
const port = 3000

const corsOptions = {
	origin: 'http://localhost:5173',
	optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/api/getSteamBans', async (req, res) => {
	handleSteamRequest(req, res, 'GetPlayerBans/v1')
})

app.post('/api/getPlayerSummary', async (req, res) => {
	handleSteamRequest(req, res, 'GetPlayerSummaries/v0002')
})

app.post('/api/getNameHistory', async (req, res) => {
	axios
		.get(`https://steamcommunity.com/id/${req.body.steamID}/ajaxaliases`)
		.then((response) => {
			if (response.data) res.status(200).json(response.data)
		})
		.catch((error) => {
			console.error('Failed to fetch alias history:', error)
		})
})

const handleSteamRequest = async (req, res, apiMethod) => {
	let steamID = req.body.steamID
	if (!steamID) {
		console.error('Missing steamID in request body')
		return res.status(400).json({ error: 'Missing steamID in request body' })
	}

	if (!/^\d+$/.test(steamID)) {
		console.log('SteamID appears to be a vanity URL, resolving...')
		steamID = await resolveVanityURL(steamID)
		if (!steamID) {
			return res
				.status(404)
				.json({ error: 'Failed to resolve Steam Vanity URL' })
		}
	}

	const url = `http://api.steampowered.com/ISteamUser/${apiMethod}/`
	const params = { key: process.env.STEAM_API_KEY, steamids: steamID }

	try {
		const response = await axios.get(url, { params })
		res.status(200).json(response.data)
	} catch (error) {
		console.error(
			'Failed to fetch Steam data:',
			error.response?.status,
			error.response?.data || error.message
		)
		res
			.status(500)
			.json({ error: 'Failed to fetch Steam data', details: error.message })
	}
}

const resolveVanityURL = async (vanity) => {
	const url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/`
	try {
		const response = await axios.get(url, {
			params: { key: process.env.STEAM_API_KEY, vanityurl: vanity },
		})
		if (response.data.response.success === 1) {
			return response.data.response.steamid
		} else {
			console.error('No SteamID found for the given vanity URL:', vanity)
			return null
		}
	} catch (error) {
		console.error('Error resolving vanity URL:', error)
		return null
	}
}

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})
