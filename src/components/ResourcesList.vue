<template>
    <div class="page-width resources-list fade-in">
        <h3>Recursos gratuitos 📦</h3>

        <div class="resources-list__grid">
            <template v-for="(resource, i) in resources" :key="`resource-${i}`">
                <div class="resource resource--youtube fade-in" v-if="resource.type === 'youtube'" v-html="resource.contenido"></div>

                <div class="resource resource--spotify fade-in" v-if="resource.type === 'spotify'"></div>

                <div class="resource resource--netflix fade-in" v-if="resource.type === 'netflix'"></div>

                <div class="resource resource--instagram fade-in" v-if="resource.type === 'instagram'"></div>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    import resources from '../db/resources.json'
</script>

<style scoped>
    .resources-list {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .resources-list__grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
    }

    .resource {
        width: 100%;
        overflow: hidden;
        border-radius: var(--border-radius);
    }

    .resource--youtube {
        aspect-ratio: 16 / 9;
        background-color: var(--color-secondary);
    }
</style>