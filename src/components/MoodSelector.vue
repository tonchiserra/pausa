<template>
    <div class="mood-selector shadow">
        <details ref="moodSelector">
            <summary>
                <span class="mood-selector__label">¿Cómo te sientes hoy?</span>
                <span class="text-small">{{ globalState.mood.label }}</span>
            </summary>
        </details>
        <div class="mood-selector__options shadow">
            <h4 class="text-center">¿Cómo te sientes hoy?</h4>
            <div v-for="mood in moods" @click="selectMood(mood)" class="mood-selector__option">
                <span class="h1">{{ mood.icon }}</span>
                <span class="h6">{{ mood.label.slice(0, -2) }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue'
    import type { Mood } from '../interfaces/moodInterface.js'
    import moods from '../db/moods.json'
    import { globalState } from '../main.js'

    const moodSelector = ref<HTMLDetailsElement | null>(null)

    onMounted(() => {
        let storedMood = localStorage.getItem('pausa-del-dia::mood') ?? ''
        selectMood(moods.find(mood => mood.id === storedMood) ?? moods[0])

        let now = new Date().toISOString()
        let lastTime = new Date(globalState.userStats.lastTimeConnected)
        let isNewDay = now.slice(0, 10) !== lastTime.toISOString().slice(0, 10)

        if(isNewDay) moodSelector.value?.setAttribute('open', 'true')
    })

    const selectMood = (mood: Mood) => {
        globalState.mood = mood
        moodSelector.value?.removeAttribute('open')

        localStorage.setItem('pausa-del-dia::mood', mood.id)

        window.dispatchEvent(new Event('MoodChanged'))
    }
</script>

<style scoped>
    .mood-selector {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1;
        border-radius: var(--border-radius);
        height: 48px;
        background-color: var(--bg-color);
        border: 2px solid var(--first-color);
        width: 170px;
        padding: 4px 12px 6px;
        transition: all 300ms ease;

        &:hover {
            background-color: #fff;
        }

        details {
            width: 100%;
            height: 100%;
        }

        summary {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
            width: 100%;
        }
    }

    .mood-selector__options {
        display: none;
        position: fixed;
        bottom: 0;
        right: 0;
        grid-template-columns: repeat(3, 1fr);
        gap: 8px;
        padding: 20px;
        width: 100dvw;
        height: auto;
        max-height: 100dvh;
        animation: showOptions 300ms ease both;
        background-color: var(--bg-color);
        overflow-y: auto;

        h4 {
            grid-column: span 3;
            margin: 1rem 0 2rem 0;
        }
    }

    .mood-selector details[open] + .mood-selector__options {
        display: grid;
    }

    .mood-selector__option {
        height: auto;
        width: 100%;
        aspect-ratio: 1;
        border-radius: var(--border-radius);
        border: 2px solid var(--second-color);
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 0;
        background-color: rgba(255, 255, 255, .6);
        transition: all 300ms ease;

        &:hover {
            border-color: var(--first-color);
        }

        span {
            text-wrap: wrap;
        }
    }

    .mood-selector__label {
        font-size: 12px;
        color: #999;
    }

    @keyframes showOptions {
        0% {
            opacity: 0;
            transform: translateY(60px);
        }
        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>