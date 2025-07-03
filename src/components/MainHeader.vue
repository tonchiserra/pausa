<template>
    <header>
        <div class="header page-width">
            <h1>UNA PAUSA</h1>

            <div class="menu-drawer">
                <details ref="menuDrawer">
                    <summary class="button--icon">
                        <IconMenu />
                    </summary>
                </details>
                <div class="menu-drawer__container shadow">
                    <div class="menu-drawer__header">
                        <h2 class="h1">UNA PAUSA</h2>
                        <button @click="menuDrawer?.removeAttribute('open')" class="button--transparent button--icon">
                            <IconClose />
                        </button>
                    </div>

                    <div class="menu-drawer__content">
                        <FeedbackField />
                    </div>
                </div>
            </div>
        </div>
    </header>

    <MoodSelector />
</template>

<script setup lang="ts">
    import IconMenu from "../assets/IconMenu.vue"
    import IconClose from "../assets/IconClose.vue"
    import MoodSelector from "./MoodSelector.vue"
    import FeedbackField from "./FeedbackField.vue"
    import { ref } from "vue"

    const menuDrawer = ref<HTMLDetailsElement | null>(null)
</script>

<style scoped>
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;

        summary {
            color: var(--first-color);
        }
    }

    .menu-drawer details[open] + .menu-drawer__container {
        display: block;
    }

    .menu-drawer__container {
        display: none;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 10;
        width: 100dvw;
        max-width: 600px;
        height: 100dvh;
        animation: slideInX 300ms ease both;
        background-color: var(--bg-color);
    }

    .menu-drawer__header {
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20px;
        padding: 0 30px;
    }

    .menu-drawer__content {
        padding: 30px;
        height: calc(100dvh - 70px);
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    @keyframes slideInX {
        0% {
            transform: translateX(100%);
        }
        100% {
            transform: translateX(0);
        }
    }
</style>