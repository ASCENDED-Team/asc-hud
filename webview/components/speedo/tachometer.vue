<template>
    <div class="tacho-meter-bar absolute z-10 h-full w-full">
        <svg viewBox="0 0 261.92 200.3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                id="meter-bar"
                :style="{ 'stroke-dashoffset': meterBar }"
                class="stroke-[var(--hud-color)]"
                d="m21.96,198.97c-12.33-19.72-19.46-43.03-19.46-68.01C2.5,60.01,60.01,2.5,130.96,2.5s128.46,57.51,128.46,128.46c0,24.98-7.13,48.29-19.46,68.01"
                stroke-width="5px"
            />
        </svg>
    </div>
    <div class="tacho-meter-bg absolute h-full w-full -scale-x-100">
        <svg viewBox="0 0 261.92 200.3" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                id="meter-bg"
                :style="{ 'stroke-dashoffset': meterBG }"
                d="m21.96,198.97c-12.33-19.72-19.46-43.03-19.46-68.01C2.5,60.01,60.01,2.5,130.96,2.5s128.46,57.51,128.46,128.46c0,24.98-7.13,48.29-19.46,68.01"
                class="stroke-slate-200/40"
                stroke-width="5px"
            />
        </svg>
    </div>
</template>

<script setup>
import { watch, ref, toRefs } from 'vue';

const props = defineProps(['speed', 'isMetric']);
const { speed, isMetric } = toRefs(props);

const maxSpeed = isMetric ? 280 : 180;

const meterBar = ref(615);
const meterBG = ref(0);

function updateMeterBar(speed) {
    const newStrokeDashoffsetBar = 615 - (speed / maxSpeed) * 615;
    const newStrokeDashoffsetBG = (speed / maxSpeed) * 615;

    meterBar.value = newStrokeDashoffsetBar;
    meterBG.value = newStrokeDashoffsetBG;
}

watch(speed, (newSpeed) => {
    updateMeterBar(newSpeed);
});
</script>

<style>
.tacho-meter-bar,
.tacho-details.active {
    filter: drop-shadow(0px 0px 10px var(--hud-color));
    -webkit-filter: drop-shadow(0px 0px 10px var(--hud-color));
}

#meter-bar,
#meter-bg {
    stroke-dasharray: 615;
}
</style>
