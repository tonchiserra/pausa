<template>
    <div class="page-width journal-field fade-in">
        <h3>¿En qué estás pensando? 💭</h3>

        <div class="journal-field__form fade-in">
            <textarea name="JournalField" id="JournalField" v-model="text" @input="handleInput" placeholder="Escribe algo..."></textarea>
            <button class="button--primary" @click="saveJournal" :disabled="disableButton">Guardar</button>
        </div>
        <span class="journal-field__disclaimer">No te preocupes, todos los datos se guardan de manera local, solo para vos. Escribe tranquilo.</span>

        <div class="journal-field__previous fade-in" v-if="!!journal.length">
            <h4>Tus pensamientos previos:</h4>
            <div class="journal-field__previous-list">
                <div v-for="item in journal" class="journal-field__previous-item">
                    <span>{{ item.date }}</span>
                    <p class="text-small">{{ item.text }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { reInitScrollAnimation } from '../main.js'

    const text = ref('')
    const disableButton = ref(true)
    const journal = ref(JSON.parse(localStorage.getItem('pausa-del-dia::journal') ?? '[]'))

    const handleInput = () => {
        if(text.value.trim() !== '') disableButton.value = false
        else disableButton.value = true
    }

    const saveJournal = () => {
        if(text.value.trim() !== '') {
            journal.value.unshift({
                text: text.value,
                date: new Date().toLocaleDateString('es-AR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            })
            localStorage.setItem('pausa-del-dia::journal', JSON.stringify(journal.value))
            
            text.value = ''
            disableButton.value = true

            reInitScrollAnimation()
        }
    }
</script>

<style scoped>
    .journal-field {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .journal-field__disclaimer {
        font-size: 12px;
        color: #999;
        padding: 0 4px;
    }

    .journal-field__form {
        margin-top: 16px;
        border-radius: var(--border-radius);
        background-color: rgba(255, 255, 255, .6);
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    textarea {
        height: 200px;
        background-color: transparent;
        padding-bottom: 8px;
        width: 100%;
    }

    .journal-field__previous {
        margin-top: 40px;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .journal-field__previous-list {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        height: 100%;
        max-height: 300px;
        overflow-y: auto;
        padding: 12px 0 0 0;
    }

    .journal-field__previous-item {
        border-top: 1px solid #999;
        padding: 20px 4px;
        position: relative;

        span {
            position: absolute;
            top: -8px;
            left: 0;
            right: 0;
            margin: 0 auto;
            width: max-content;
            padding: 0 12px;
            background-color: var(--bg-color);
            font-size: 12px;
            color: #999;
        }
    }
</style>