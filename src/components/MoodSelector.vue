<template>
    <div class="mood-selector shadow">
        <details ref="moodSelector">
            <summary>
                <span class="mood-selector__label">¿Cómo te sientes hoy?</span>
                <span class="text-small">{{ globalState.mood.label }}</span>
            </summary>
        </details>
        <div class="mood-selector__options">
            <div v-for="mood in moods" @click="selectMood(mood)" class="mood-selector__option text-small shadow">{{ mood.label }}</div>
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
        selectMood(moods[Math.floor(Math.random() * moods.length)]);
    })

    const selectMood = (mood: Mood) => {
        globalState.mood = mood
        moodSelector.value?.removeAttribute('open')
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
        position: absolute;
        bottom: 100%;
        right: 0;
        flex-direction: column;
        gap: 8px;
        padding: 8px 0;
        width: 100%;
        animation: showOptions 300ms ease both;
    }

    .mood-selector details[open] + .mood-selector__options {
        display: flex;
    }

    .mood-selector__option {
        height: 40px;
        width: 100%;
        border-radius: var(--border-radius);
        border: 2px solid var(--second-color);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        background-color: #fff;
        transition: all 300ms ease;

        &:hover {
            border-color: var(--first-color);
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