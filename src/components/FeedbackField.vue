<template>
    <div class="feedback-field">
        <h4>¿Tienes alguna sugerencia?</h4>

        <form action="https://formsubmit.co/d1590c6b06d8c39e872775151f89c7c7" method="POST">
            <textarea name="FeedbackField" id="FeedbackField" v-model="text" @input="handleInput" placeholder="Escribe algo..." required></textarea>
            <button type="submit" class="button--primary" :disabled="disableButton">
                Enviar
                <IconArrow />
            </button>
        </form>
    </div>
</template>

<script setup lang="ts">
    import IconArrow from '../assets/IconArrow.vue'
    import { ref } from 'vue'

    const text = ref('')
    const disableButton = ref(true)

    const handleInput = () => {
        if(text.value.trim() !== '') disableButton.value = false
        else disableButton.value = true
    }
</script>

<style scoped>
    .feedback-field {
        margin-top: auto;
        margin-bottom: 0;
        display: flex;
        flex-direction: column;
        gap: 0;

        button {
            &:hover svg {
                transform: translateX(5px);
            }
        }

        form {
            margin-top: 16px;
            border-radius: var(--border-radius);
            background-color: rgba(255, 255, 255, .6);
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 8px;

            textarea {
                height: 200px;
                background-color: transparent;
                padding-bottom: 8px;
                width: 100%;
            }
        }
    }
</style>