<template>
    <div class="page-width liked-pauses">
        <h3>🌿 Tu rincón personal</h3>
        
        <div class="liked-pauses__grid">
            <div class="liked-pauses__item" v-for="pause in likedPauses" :key="pause.id" :style="`background-color: hsl(${Math.floor(Math.random() * 360)}, 70%, 80%, .3)`">
                <p>{{ pause.content }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import pauses from '../db/pauses.json'
    import { globalState } from '../main.js'
    import { computed } from 'vue'

    const likedPauses = computed(() => {
        return pauses.filter(pause => globalState.likedPauses.includes(pause.id))
    })
</script>

<style scoped>
    .liked-pauses {
        padding-top: 60px;
        padding-bottom: 60px;
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
        animation: fadeIn 600ms ease both;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
        
    }
</style>