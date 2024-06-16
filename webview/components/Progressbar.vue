<template>
    <div class="flex h-screen items-center justify-center">
        <Progress
            v-if="enableProgress"
            :totalProgress="100"
            :progressCount="progressCount"
            :bgColor="bgColor"
            :progressColor="progressColor"
            :textColor="textColor"
        />
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
const bgColor = ref('grey');
const progressColor = ref('#30efa6');
const textColor = ref('#30efa6');

const startProgress = (intervalTime: number) => {
    progressCount.value = 0;
    const stepTime = intervalTime / 100; 
    const interval = setInterval(() => {
        progressCount.value++;
        if (progressCount.value >= 100) {
            enableProgress.value = false;
            clearInterval(interval);
        }
    }, stepTime);
};

events.on(
    HUDEvents.WebView.PROGRESS_BAR,
    (value: number, backgroundColor: string, barColor: string, textcolor: string) => {
        console.log(backgroundColor, barColor);
        enableProgress.value = true;
        bgColor.value = backgroundColor ?? bgColor.value;
        progressColor.value = barColor ?? progressColor.value;
        textColor.value = textcolor ?? textColor.value;
        console.log(backgroundColor, barColor, bgColor.value, progressColor.value);
        startProgress(value);
    },
);

// onMounted(() => {
//     enableProgress.value = true;
//     bgColor.value = 'white';
//     progressColor.value = 'red';
//     startProgress(100);
// });
</script>

<style scoped></style>
