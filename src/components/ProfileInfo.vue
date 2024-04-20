<template>
	<div class="flex items-center">
		<img :src="store.avatar" />
		<h5 class="ml-4 text-2xl font-bold tracking-tight text-white">
			{{ store.name }}
		</h5>
		<a
			:href="store.steamUrl"
			target="_blank"
			class="text-white ml-4 flex items-center focus:ring-4 h-8 focus:outline-none font-small rounded-lg text-sm px-5 text-center bg-green-600 hover:bg-green-700 focus:ring-green-800"
		>
			Open Steam Profile
		</a>
		<a
			:href="`https://www.battlemetrics.com/players?filter%5Bsearch%5D=${store.name}&filter%5BplayerFlags%5D=&sort=score`"
			target="_blank"
			class="text-white ml-4 flex items-center focus:ring-4 h-8 focus:outline-none font-small rounded-lg text-sm px-5 text-center bg-green-600 hover:bg-green-700 focus:ring-green-800"
		>
			Open BattleMetrics Profile
		</a>
	</div>
	<div class="mt-4">
		<p class="text-gray-300 text-sm">
			Created: {{ prettyTime(store.timecreated) }}
		</p>
		<p class="text-gray-300 text-sm">Steam ID: {{ store.steamid }}</p>
	</div>
	<div class="mt-4">
		<h5 class="text-md font-bold tracking-tight text-white">Previous Names:</h5>
		<p
			v-for="(change, index) in store.previousNames"
			:key="index"
			class="text-gray-300 text-sm"
		>
			- {{ change.newname }} ({{ change.timechanged }})
		</p>
	</div>
</template>

<script setup lang="ts">
import { useAccountStore } from '../stores/account'

const store = useAccountStore()

function prettyTime(timestamp: number) {
	const date = new Date(timestamp * 1000)
	return date.toLocaleString()
}
</script>
