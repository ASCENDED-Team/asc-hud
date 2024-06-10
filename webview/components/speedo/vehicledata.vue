<template>
    <div class="tacho-vehicle-data absolute -bottom-1 left-1/2 flex -translate-x-1/2 transform gap-2">
        <Lights :class="{ active: headlights || highbeams }" :headlights="headlights" :highbeams="highbeams" />
        <Lock :class="{ active: locked }" class="mt-3" />
        <Engine :class="{ active: engineOn }" class="mt-3" />
        <Seatbelt :class="{ active: seatBelt }" />
    </div>
</template>

<script setup>
import Lights from './lights.vue';
import Lock from './lock.vue';
import Engine from './engine.vue';
import Seatbelt from './seatbelt.vue';

const { engineOn, locked, headlights, highbeams, seatBelt } = defineProps([
    'engineOn',
    'locked',
    'headlights',
    'highbeams',
    'seatBelt',
]);
</script>

<style>
.tacho-details.active > div {
    background: linear-gradient(to bottom, var(--hud-color), transparent) !important;
}
</style>
