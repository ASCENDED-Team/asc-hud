<template>
    <div class="flex h-screen items-center justify-center">
        <Progress v-if="enableProgress" :totalProgress="100" :progressCount="progressCount" />
    </div>
</template>

<script setup lang="ts">
const events = useEvents();
import { ref } from 'vue';
import { useEvents } from '@Composables/useEvents';
import Progress from './progressbar/Progress.vue';
import { HUDEvents } from '@Plugins/asc-hud/shared/src/events';

const progressCount = ref(0);
const enableProgress = ref(false);
const startProgress = (intervalTime: number) => {
    progressCount.value = 0;
    const interval = setInterval(() => {
        progressCount.value++;
        if (progressCount.value >= 100) {
            enableProgress.value = false;
            clearInterval(interval);
        }
    }, intervalTime);
};

events.on(HUDEvents.WebView.PROGRESS_BAR, (value: number) => {
    console.log(value);
    enableProgress.value = true;
    startProgress(value);
});
</script>

<style scoped></style>
