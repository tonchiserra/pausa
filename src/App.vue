<template>
  	<MainHeader />

	<main>
		<RandomPause />
		<JournalField />
		<UserRewards />
		<LikedPauses v-if="!!globalState.likedPauses.length" />
		<ResourcesList />
	</main>

	<footer>
		<div class="page-width">
			<p class="text-small text-center">Designed & developed with 🤍 by <a href="https://instagram.com/tonchiserra" target="_blank">Gonzalo Serra</a>.</p>
		</div>
	</footer>
</template>

<script setup lang="ts">
	import RandomPause from './components/RandomPause.vue'
	import MainHeader from './components/MainHeader.vue'
	import LikedPauses from './components/LikedPauses.vue'
	import JournalField from './components/JournalField.vue'
	import ResourcesList from './components/ResourcesList.vue'
	import UserRewards from './components/UserRewards.vue'
  	import { globalState, initScrollAnimation } from './main.js'
	
	import { onMounted } from 'vue'

	onMounted(() => {
		initScrollAnimation()
	})
</script>