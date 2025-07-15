import { createApp, reactive } from 'vue'
import './style.css'
import App from './App.vue'
import type { IGlobalState } from './interfaces/globalStateInterface'

export const globalState: IGlobalState = reactive<IGlobalState>({
    mood: {
        id: '',
        label: '',
        icon: ''
    },
    likedPauses: JSON.parse(localStorage.getItem('pausa-del-dia::liked-pauses') || '[]'),
    userStats: JSON.parse(localStorage.getItem('pausa-del-dia::user-stats') || '{}'),
    userJournal: JSON.parse(localStorage.getItem('pausa-del-dia::user-journal') || '{}')
})

const observer = new IntersectionObserver(entries => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in--animated')
        }
    })
}, { rootMargin: '0px 0px -70px 0px' })

export const initScrollAnimation = () => {
    let elements = document.querySelectorAll('.fade-in')
    elements.forEach((el) => observer.observe(el))
}

export const reInitScrollAnimation = () => {
    setTimeout(() => {
        let elements = document.querySelectorAll('.fade-in')
        elements.forEach((el) => observer.unobserve(el))

        elements.forEach((el) => observer.observe(el))
    }, 300)
}

createApp(App).mount('#app')
