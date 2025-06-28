<template>
  <MainHeader />

  <main>
    <RandomPause />
    <JournalField />
    <LikedPauses v-if="!!globalState.likedPauses.length" />
  </main>

  <footer>
    <div class="page-width">
      <p class="text-small text-center">Designed & Developed with 🤍 by <a href="https://instagram.com/tonchiserra">Gonzalo Serra</a>.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
  import RandomPause from './components/RandomPause.vue'
  import MainHeader from './components/MainHeader.vue'
  import LikedPauses from './components/LikedPauses.vue'
  import JournalField from './components/JournalField.vue'
  import { globalState } from './main.js'
</script>