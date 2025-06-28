import { createApp, reactive } from 'vue'
import './style.css'
import App from './App.vue'

export const globalState = reactive({
    mood: {
        id: '',
        label: ''
    },
    likedPauses: JSON.parse(localStorage.getItem('pausa-del-dia::liked-pauses') || '[]')
})

createApp(App).mount('#app')
