<template>
    <div class="page-width liked-pauses fade-in">
        <h3>Tu rincón personal 🌿</h3>
        
        <div class="liked-pauses__grid">
            <div class="liked-pauses__item fade-in" v-for="pause in likedPauses" :key="pause.id" :style="`background-color: hsl(${Math.floor(Math.random() * 360)}, 70%, 80%, .3)`">
                <p>{{ pause.content }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { globalState } from '../main.js'
    import { ref } from 'vue'

    const likedPauses = ref(globalState.likedPauses)
</script>

<style scoped>
    .liked-pauses {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .liked-pauses__grid {
        columns: 2;
        gap: 1rem;
    }

    .liked-pauses__item {
        padding: 2rem;
        border-radius: var(--border-radius);
        margin-bottom: 1rem;
        -webkit-column-break-inside: avoid;
        page-break-inside: avoid;
        break-inside: avoid;
    }
</style>