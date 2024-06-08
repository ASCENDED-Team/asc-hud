<template>
    <div class="tacho-vehicle-data absolute -bottom-1 left-1/2 flex -translate-x-1/2 transform gap-2">
        <Lights :class="{ active: headlights || highbeams }" :headlights="headlights" :highbeams="highbeams" />
        <Engine :class="{ active: engineOn }" class="mt-3" />
        <Engine class="mt-3" />
        <Engine />
    </div>
</template>

<script setup>
import Lights from './lights.vue';
import Engine from './engine.vue';

const { engineOn, headlights, highbeams } = defineProps(['engineOn', 'headlights', 'highbeams']);
</script>

<style></style>
