<template>
	<div class="flex flex-col w-screen">
		<div class="block p-6 rounded-lg w-full mb-4 shadow bg-slate-800">
			<h5 class="mb-2 text-2xl font-bold tracking-tight text-white">
				BWCC Recruitment Tool
			</h5>
			<p class="font-normal text-gray-400">
				Please note this tool helps recruitment for BWCC, but due diligence
				should also be practiced.
			</p>

			<SearchBar />
		</div>
		<div v-if="store.steamUrl !== ''" class="flex">
			<div class="block p-6 w-3/4 rounded-lg shadow bg-slate-800">
				<ProfileInfo />
			</div>
			<div class="block p-6 rounded-lg w-1/4 ml-4 shadow bg-slate-800">
				<SteamBans />
			</div>
		</div>
		<div v-if="store.steamUrl !== ''" class="flex mt-4">
			<div class="block p-6 rounded-lg w-full shadow bg-slate-800">
				<Checklist />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import SteamBans from './components/SteamBans.vue'
import SearchBar from './components/SearchBar.vue'
import ProfileInfo from './components/ProfileInfo.vue'
import Checklist from './components/Checklist.vue'

import { useAccountStore } from './stores/account'

const store = useAccountStore()
</script>
