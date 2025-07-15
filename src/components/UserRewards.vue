<template>
    <div class="page-width user-rewards fade-in" v-if="!!globalState.userStats?.rewards?.length">
        <h3>Observa tu progreso 🚀</h3>

        <div class="user-rewards__list">
            <div class="user-reward fade-in text-center" v-for="(reward, i) in globalState.userStats.rewards" :key="`reward-${i}`">
                <div class="h0">{{ reward.icon }}</div>
                <h5>{{ reward.label }}</h5>
                <span>{{ reward.text }}</span>
            </div>
        </div>
    </div>

    <div class="new-reward-popup shadow" v-if="!!newReward">
        <div class="h1">{{ newReward.icon }}</div>
        <h5>{{ newReward.label }}</h5>
        <p class="text-small">{{ newReward.text}}</p>
    </div>
</template>

<script setup lang="ts">
    import { globalState, reInitScrollAnimation } from '../main'
    import { onMounted, ref } from 'vue'
    import type { IReward } from '../interfaces/rewardInterface.js'

    const newReward = ref<IReward | null>(null)

    onMounted(() => {
        let now = new Date().toISOString()
        console.log("User Stats: ", globalState.userStats)

        if(!!globalState.userStats.lastTimeConnected) {
            let lastTime = new Date(globalState.userStats.lastTimeConnected)
            let isNewDay = now.slice(0, 10) !== lastTime.toISOString().slice(0, 10)

            if(isNewDay) {
                // quantity of days doing pauses
                globalState.userStats.daysPaused++

                let differenceInDays = Math.floor((new Date(now).getTime() - lastTime.getTime()) / (1000 * 60 * 60 * 24))
                let isNextDay = differenceInDays === 1

                if (isNextDay) {
                    // quantity of days in a row doing pauses
                    globalState.userStats.daysPausedInRow++
                }else {
                    globalState.userStats.daysPausedInRow = 1
                }
            }

        }else {
            globalState.userStats.rewards = []
            globalState.userStats.daysPaused = 1
            globalState.userStats.daysPausedInRow = 1
        }

        if(!!globalState.userStats.daysPaused) {
            switch (globalState.userStats.daysPaused) {
                case 1:
                    setReward({ id: 1, text: '¡Felicidades! Has completado tu primer día de pausa.', label: 'Primera pausa', icon: '🎉' })
                    break
                case 10:
                    setReward({ id: 2, text: '¡Diez días! Tu compromiso con el bienestar es admirable.', label: '10 pausas', icon: '🏆' })
                    break
                case 15:
                    setReward({ id: 3, text: '¡Quince días! Tu dedicación a las pausas está dando frutos.', label: '15 pausas', icon: '🌟' })
                    break
                case 30:
                    setReward({ id: 4, text: '¡Treinta días! Has establecido un hábito saludable.', label: '30 pausas', icon: '💪' })
                    break
                case 50:
                    setReward({ id: 5, text: '¡Cincuenta días! Tu compromiso con el bienestar es inspirador.', label: '50 pausas', icon: '🔥' })
                    break
                case 100:
                    setReward({ id: 6, text: '¡Cien días! Has demostrado una gran constancia.', label: '100 pausas', icon: '🏅' })
                    break
                case 200:
                    setReward({ id: 7, text: '¡Doscientos días! Tu dedicación a las pausas es ejemplar.', label: '200 pausas', icon: '🎖️' })
                    break
            }
        }

        if(!!globalState.userStats.daysPausedInRow) {
            switch (globalState.userStats.daysPausedInRow) {
                case 3:
                    setReward({ id: 8, text: '¡Tres días seguidos! Estás construyendo un hábito saludable.', label: '3 días seguidos', icon: '🎯' })
                    break
                case 7:
                    setReward({ id: 9, text: '¡Una semana sin cortes! Estás en el camino correcto para un hábito saludable.', label: '7 días seguidos', icon: '🌟' })
                    break
                case 14:
                    setReward({ id: 10, text: '¡Catorce días seguidos! Estás construyendo un hábito sólido.', label: '14 días seguidos', icon: '💪' })
                    break
                case 30:
                    setReward({ id: 11, text: '¡Treinta días seguidos! Tu constancia es admirable.', label: '30 días seguidos', icon: '🔥' })
                    break
                case 60:
                    setReward({ id: 12, text: '¡Sesenta días seguidos! Has demostrado una gran dedicación.', label: '60 días seguidos', icon: '🏅' })
                    break
                case 90:
                    setReward({ id: 13, text: '¡Noventa días seguidos! Tu compromiso es ejemplar.', label: '90 días seguidos', icon: '🎖️' })
                    break
                case 120:
                    setReward({ id: 14, text: '¡Ciento veinte días seguidos! Tu esfuerzo está dando frutos.', label: '120 días seguidos', icon: '🌟' })
                    break
                case 180:
                    setReward({ id: 15, text: '¡Ciento ochenta días seguidos! Has establecido un hábito increíble.', label: '180 días seguidos', icon: '🏆' })
                    break
                case 365:
                    setReward({ id: 16, text: '¡Un año completo de días seguidos! Tu dedicación es inspiradora.', label: '365 días seguidos', icon: '🌍' })
                    break
            }
        }

        globalState.userStats.lastTimeConnected = now
        localStorage.setItem('pausa-del-dia::user-stats', JSON.stringify(globalState.userStats))
    })

    const setReward = (reward: IReward) => {
        if(!!!globalState.userStats.rewards.some((r: IReward) => r.id === reward.id)) {
            globalState.userStats.rewards.push(reward)
            reInitScrollAnimation()
            
            setTimeout(() => {
                newReward.value = reward
            }, 1500)

            setTimeout(() => {
                newReward.value = null
            }, 8000)
        }
    }
</script>

<style scoped>
    .user-rewards {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .user-rewards__list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2rem;
    }

    .user-reward {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        padding: 2rem;
        background-color: var(--second-color);
        border-radius: var(--border-radius);

        span {
            color: #999;
            font-size: 12px;
        }
    }

    .new-reward-popup {
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 999;
        width: calc(100% - 40px);
        max-width: 500px;
        height: auto;
        padding: 1.4rem 2rem;
        border-radius: var(--border-radius);
        animation: fadeIn 600ms ease both;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 1rem 2rem;
        background-color: var(--bg-color);
        border: 2px solid var(--first-color);

        p {
            flex-grow: 1;
            width: 100%;
        }
    }
</style>