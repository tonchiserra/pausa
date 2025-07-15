<template>
    <div class="random-pause page-width fade-in">
        <h3>Tu pausa del día 🧘‍♀️</h3>

        <div class="random-pause__card fade-in--animated" ref="randomPauseCard" v-if="!!currentPause?.content">
            <button class="button--transparent random-pause__like" @click="handleLike">
                <IconHeartFill v-if="globalState.likedPauses.some((likedPause: IPause) => likedPause.id === currentPause?.id)" />
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
    import { globalState, reInitScrollAnimation } from '../main'
    import { ref, onMounted } from 'vue'
    import IconHeart from '../assets/IconHeart.vue'
    import IconHeartFill from '../assets/IconHeartFill.vue'
    import IconRefresh from '../assets/IconRefresh.vue'
    import type { IPause } from '../interfaces/pauseInterface.js'


    const currentPause = ref<IPause | null>()
    const randomPauseCard = ref<HTMLElement | null>(null)
    
    onMounted(() => {
        changePause()
        window.addEventListener("MoodChanged", () => changePause())
    })

    const changePause = async () => {
        const body = {
            model: "llama3-8b-8192",
            messages: [
                {
                    role: "system",
                    content: `
                        Genera un ejercicio práctico y cálido para que el usuario pueda relajarse y sentirse mejor.
                        El usuario te dirá cómo se siente, qué pensamientos anotó en el journal y cuáles fueron los ejercicios que le gustaron. Estos datos te llegarán en formato JSON.
                        El objetivo es que el usuario pueda hacer una pausa en su día a día.
                        Debes responder solo con el ejercicio. No debes contestar como si fuera una respuesta de chat, sino como un ejercicio práctico.
                        El texto que retornes debe contener solo el ejercicio, sin explicaciones adicionales.
                        Asegúrate de que el texto no sea largo, no más de 50 palabras, y que el usuario pueda hacer el ejercicio sin importar donde esté.
                        Lo que el usuario te diga sobre cómo se siente, sus pensamientos y los ejercicios que le gustaron, es solo para que puedas generar un ejercicio que se adapte a su situación actual. No debes contestar como si fuera un chat.
                        Ejemplo 1: Hacé una actividad física que te guste: bailar, correr, saltar. Usá tu energía para disfrutar el movimiento.
                        Ejemplo 2: Hacé una pausa para respirar profundamente. Inhalá por la nariz contando hasta 4, sostené el aire contando hasta 4 y exhalá por la boca contando hasta 4.
                        Ejemplo 3: Hacé una pausa para estirarte. Estirá los brazos hacia arriba, tocá tus pies y mové el cuello suavemente de lado a lado.
                        Ejemplo 4: Hacé una pausa para meditar. Cerrá los ojos, sentate en un lugar tranquilo y enfocate en tu respiración. Inhalá y exhalá lentamente, dejando que tu mente se relaje.
                        Ejemplo 5: Hacé una pausa para escuchar música. Poné tus auriculares, elegí una canción que te guste y disfrutá de la melodía.
                        Ejemplo 6: Hacé una pausa para tomar agua.
                    `
                },
                {
                    role: "user",
                    content: `
                        Me siento ${globalState.mood.id}. Necesito un ejercicio práctico y cálido para relajarme y sentirme mejor.
                        Mis pensamientos anotados en el journal son: ${globalState.userJournal}.
                    `
                }
            ],
            temperature: 0.8,
            max_tokens: 200
        }

        try {
            let response = await fetch(`https://api.groq.com/openai/v1/chat/completions`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer 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`
                },
                body: JSON.stringify(body)
            })

            let data = await response.json()

            if(!!data?.choices[0]?.message?.content) {
                currentPause.value = {
                    id: Date.now(),
                    content: data.choices[0].message.content,
                    mood: globalState.mood.id
                }
            }else {
                throw new Error("No content found in response")
            }

        }catch(error) {
            console.error("Error fetching pauses:", error)

            let pausesByMood = pauses.filter((pause: IPause) => pause.mood === globalState.mood.id)
            currentPause.value = pausesByMood[Math.floor(Math.random() * pausesByMood.length)]
        }
        
        if(!!randomPauseCard.value) {
            randomPauseCard.value.style.backgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 80%, .3)`
        }
    }

    const handleLike = () => {
        if(globalState.likedPauses.some((likedPause: IPause) => likedPause.id === currentPause.value?.id)) {
            globalState.likedPauses = globalState.likedPauses.filter((likedPause: IPause) => likedPause.id !== currentPause.value?.id)
        } else {
            currentPause.value && globalState.likedPauses.push(currentPause.value)
        }

        localStorage.setItem('pausa-del-dia::liked-pauses', JSON.stringify(globalState.likedPauses))
        reInitScrollAnimation()
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