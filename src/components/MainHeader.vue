<template>
    <header>
        <div class="header page-width">
            <h1>PAUSA DEL DÍA</h1>

            <div class="menu-drawer">
                <details ref="menuDrawer">
                    <summary>
                        <IconMenu />
                    </summary>
                </details>
                <div class="menu-drawer__container shadow">
                    <div class="menu-drawer__header">
                        <button @click="menuDrawer?.removeAttribute('open')" class="button--transparent">
                            <IconClose />
                        </button>
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
        max-width: 400px;
        height: 100dvh;
        animation: slideInX 300ms ease both;
        background-color: #fff;
    }

    .menu-drawer__header {
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding: 0 30px;
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