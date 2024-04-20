<template>
	<h5 class="mb-2 text-lg font-bold tracking-tight text-white">Steam Bans</h5>
	<div>
		<p v-if="store.communityBanned" class="text-red-500">🔴 Game banned</p>
		<p v-else class="text-green-500">🟢 Not game banned</p>
		<p v-if="store.numberOfGameBans" class="text-red-500">
			🔴 {{ store.numberOfGameBans }} total game ban(s)
		</p>
		<p v-else class="text-green-500">🟢 0 total game bans</p>
		<p v-if="store.vacBanned" class="text-red-500">🔴 VAC banned</p>
		<p v-else class="text-green-500">🟢 Not VAC banned</p>
		<p v-if="store.numberOfVacBans" class="text-red-500">
			🔴 {{ store.numberOfVacBans }} total VAC ban(s)
		</p>
		<p v-else class="text-green-500">
			🟢 {{ store.numberOfVacBans }} total VAC bans
		</p>
		<p v-if="store.daysSinceLastBan" class="text-red-500">
			🔴 {{ store.daysSinceLastBan }} days since last ban
		</p>
		<p v-else class="text-green-500">
			🟢 {{ store.daysSinceLastBan }} days since last ban
		</p>
	</div>
</template>

<script setup lang="ts">
import { useAccountStore } from '../stores/account'

const store = useAccountStore()
</script>
