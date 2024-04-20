<template>
	<h2 class="text-lg text-white font-bold mb-4">Induction Checklist</h2>
	<ul>
		<li
			v-for="(task, index) in tasks"
			:key="index"
			class="flex items-center justify-between py-1"
		>
			<div class="flex items-center">
				<input type="checkbox" v-model="task.completed" class="mr-2 h-5 w-5" />
				<span
					:class="{
						'line-through text-gray-500': task.completed,
						'text-gray-300': !task.completed,
					}"
				>
					{{ task.description }}
				</span>
			</div>
		</li>
	</ul>
</template>

<script setup>
import { ref } from 'vue'

const tasks = ref([
	{
		description: `Explain what we offer (regular training, competitive matches [18's, 49's etc], fun events, a fun & welcoming community)`,
		completed: false,
	},
	{
		description: `Discuss what we expect (turn up to at least 1 event a week, seed the server, be active in-game and on discord, don't be a member of another HLL clan)`,
		completed: false,
	},
	{
		description:
			'Inform them no toxicity at all in discord and servers, including ones that are not ours',
		completed: false,
	},
	{
		description:
			'Explain to them to inform an admin/mod/nco if they witness this behaviour from others',
		completed: false,
	},
	{
		description: `Update their nickname in both the OP's room and main discord to include [BWCC] tags`,
		completed: false,
	},
	{
		description: `Ask them to update their Steam profile to include the BWCC tags - verify using the 'Open Steam Profile' button above`,
		completed: false,
	},
	{
		description: `Invite them to the OP's room and let them know the password`,
		completed: false,
	},
	{
		description: `Teach them about the Sign Ups category and how it works breifly, but mention they should look in their own time as there's a lot to read`,
		completed: false,
	},
	{
		description: `Mention the importance of Accepting/Declining/Tentative - and ask them if they do select tentative that they make their decision at most 2 days before the event`,
		completed: false,
	},
	{
		description: `Inform them to pick a role in the BWCC Only category in the OP's room`,
		completed: false,
	},
	{
		description: `Show them the road map in the main discord - it is usually 6 weeks to become a member but dependant on activity this could be reduced`,
		completed: false,
	},
	{
		description: `Go back to their application in enlistment-forms and accept the application then double check they have the correct roles`,
		completed: false,
	},
	{
		description: `Ask if they have any questions`,
		completed: false,
	},
	{
		description: `Post a welcome message in and tage Members and Recruits`,
		completed: false,
	},
])
</script>

<style scoped>
.line-through {
	text-decoration: line-through;
}
</style>
