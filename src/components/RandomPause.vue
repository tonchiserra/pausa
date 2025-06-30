<template>
    <div class="random-pause page-width fade-in">
        <h3>Tu pausa del día 🧘‍♀️</h3>

        <div class="random-pause__card fade-in--animated" ref="randomPauseCard" v-if="!!currentPause?.content">
            <button class="button--transparent random-pause__like" @click="handleLike">
                <IconHeartFill v-if="globalState.likedPauses.includes(currentPause?.id)" />
                <IconHeart v-else />
            </button>
            <p class="h2">{{ currentPause.content }}</p>
        </div>

        <button @click="changePause" class="random-pause__button button--primary">
            <IconRefresh />
            Quiero otra
        </button>
    </div>
</template>

<script setup lang="ts">
    import pauses from '../db/pauses.json'
    import { globalState } from '../main.js'
    import { ref, onMounted } from 'vue'
    import IconHeart from '../assets/IconHeart.vue'
    import IconHeartFill from '../assets/IconHeartFill.vue'
    import IconRefresh from '../assets/IconRefresh.vue'

    const currentPause = ref()
    const randomPauseCard = ref<HTMLElement | null>(null)
    
    onMounted(() => {
        changePause()
        window.addEventListener("MoodChanged", () => changePause())
    })

    const changePause = () => {
        let pausesByMood = pauses.filter(pause => pause.mood === globalState.mood.id)
        currentPause.value = pausesByMood[Math.floor(Math.random() * pausesByMood.length)]
        
        if(!!randomPauseCard.value) {
            randomPauseCard.value.style.backgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%, .3)`
        }
    }

    const handleLike = () => {
        if(globalState.likedPauses.includes(currentPause.value.id)) {
            globalState.likedPauses = globalState.likedPauses.filter((id: number) => id !== currentPause.value.id)
        } else {
            globalState.likedPauses.push(currentPause.value.id)
        }

        localStorage.setItem('pausa-del-dia::liked-pauses', JSON.stringify(globalState.likedPauses))
    }

</script>

<style scoped>
    .random-pause {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .random-pause__card {
        background-color: var(--second-color);
        padding: 3rem;
        border-radius: var(--border-radius);
        position: relative;
    }

    .random-pause__button {
        margin-left: auto;
        margin-right: 0;

        &:hover {
            svg {
                transform: rotate(180deg);
            }
        }
    }

    .random-pause__like {
        position: absolute;
        top: 1.2rem;
        right: 1.2rem;
    }
</style>