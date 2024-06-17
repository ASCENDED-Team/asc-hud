<template>
    <div class="vitality-container ml-2 flex flex-col gap-2">
        <Health :health="health" />
        <Armour v-if="armour > 0" :armour="armour" />
    </div>
</template>

<script setup>
import Health from './vitals/health.vue';
import Armour from './vitals/armour.vue';
const { health, armour } = defineProps(['health', 'armour']);
</script>

<style>
.vitals {
    height: calc(1vh * 4);
    width: calc(1vh * 4);
}

.vitals svg {
    height: calc(1vh * 2.5);
    width: calc(1vh * 2.5);
}
</style>
