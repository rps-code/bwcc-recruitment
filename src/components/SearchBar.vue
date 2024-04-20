<template>
	<div class="mt-8 flex items-end">
		<div class="w-3/4">
			<label
				for="steam_url"
				class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>Steam URL</label
			>
			<input
				type="text"
				id="steam_url"
				v-model="steamUrl"
				class="border text-sm rounded-lg block h-11 w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
				placeholder="E.g. https://steamcommunity.com/id/rpscode/"
				required
				@input="validateUrl"
			/>
			<p class="text-red-500 mt-3 text-xs italic" v-if="error">
				{{ error }}
			</p>
		</div>
		<button
			type="submit"
			class="text-white ml-4 focus:ring-4 h-11 focus:outline-none font-medium rounded-lg text-sm w-1/4 px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
			@click="submitSteamUrl()"
		>
			Evalute Steam Profile
		</button>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAccountStore } from '../stores/account'

const store = useAccountStore()
const { setSteamUrl } = useAccountStore()

const steamUrl = ref('')
const error = ref('')

const validateUrl = () => {
	error.value =
		steamUrl.value.startsWith('https://steamcommunity.com/id/') ||
		steamUrl.value === ''
			? ''
			: 'Invalid URL. It must start with "https://steamcommunity.com/id/"'
}

const submitSteamUrl = () => {
	if (error.value !== '') return

	setSteamUrl(steamUrl.value)
	store.getSteamBans()
	store.getPlayerSummary()
	store.getNameHistory()
}
</script>
