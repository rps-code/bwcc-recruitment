import { defineStore } from 'pinia'
import axios from 'axios'

interface AliasHistory {
	newname: string
	timechanged: string
}

export const useAccountStore = defineStore('account', {
	state: () => ({
		steamUrl: '',
		communityBanned: false,
		vacBanned: false,
		numberOfVacBans: 0,
		daysSinceLastBan: 0,
		numberOfGameBans: 0,
		avatar: '',
		name: '',
		steamid: 0,
		timecreated: 0,
		previousNames: [] as AliasHistory[],
	}),

	actions: {
		setSteamUrl(url: string) {
			this.steamUrl = url
		},

		resetSteamUrl() {
			this.steamUrl = ''
		},

		async fetchSteamData(apiPath: string, handler: (data: any) => void) {
			const steamID = this.extractSteamID()
			const apiUrl = import.meta.env.API_URL
			try {
				const response = await axios.post(`${apiUrl}/api/${apiPath}`, {
					steamID,
				})
				handler(response.data)
			} catch (error) {
				console.error(`Failed to fetch data from ${apiPath}`, error)
				this.vacBanned = false
			}
		},

		async getSteamBans() {
			await this.fetchSteamData('getSteamBans', (data) => {
				if (data.players) {
					const r = data.players[0]
					this.communityBanned = r.CommunityBanned
					this.vacBanned = r.VACBanned
					this.numberOfVacBans = r.NumberOfVACBans
					this.daysSinceLastBan = r.DaysSinceLastBan
					this.numberOfGameBans = r.NumberOfGameBans
				} else {
					console.error('Unexpected response structure:', data)
				}
			})
		},

		async getPlayerSummary() {
			await this.fetchSteamData('getPlayerSummary', (data) => {
				if (data.response) {
					const r = data.response.players[0]
					this.avatar = r.avatarmedium
					this.name = r.personaname
					this.steamid = r.steamid
					this.timecreated = r.timecreated
				} else {
					console.error('Unexpected response structure:', data)
				}
			})
		},

		async getNameHistory() {
			await this.fetchSteamData('getNameHistory', (data) => {
				if (data) {
					this.previousNames = data
				} else {
					console.error('Unexpected response structure:', data)
				}
			})
		},

		extractSteamID() {
			const urlParts = this.steamUrl.split('/')
			return urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2]
		},
	},
})
