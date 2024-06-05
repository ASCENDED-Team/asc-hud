<template>
    <div class="h-screen w-screen">
        <div class="tacho absolute bottom-0 right-0 w-auto">
            <div
                class="tacho-wrapper relative h-[347.8px] w-[344.8px] rounded-full bg-gradient-to-t from-slate-400/30 to-slate-800/60"
            >
                <div class="tacho-meter-bar absolute z-10 h-full w-full">
                    <svg viewBox="0 0 344.8 347.8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            id="meter-bar"
                            :style="{ 'stroke-dashoffset': meterBar }"
                            d="M49.8,249.5
	c-13.9-22.2-21.9-48.4-21.9-76.5c0-79.8,64.7-144.5,144.5-144.5c79.8,0,144.5,64.7,144.5,144.5c0,28.1-8,54.3-21.9,76.5"
                            stroke="#553adf"
                            stroke-width="57"
                        />
                    </svg>
                </div>
                <div class="tacho-meter-bg absolute h-full w-full -scale-x-100">
                    <svg viewBox="0 0 344.8 347.8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            id="meter-bg"
                            :style="{ 'stroke-dashoffset': meterBG }"
                            d="M49.8,249.5
	c-13.9-22.2-21.9-48.4-21.9-76.5c0-79.8,64.7-144.5,144.5-144.5c79.8,0,144.5,64.7,144.5,144.5c0,28.1-8,54.3-21.9,76.5"
                            stroke="white"
                            stroke-width="57"
                        />
                    </svg>
                </div>
                <h2 class="absolute bottom-20 pl-40 font-extrabold text-white">KMH: {{ testSpeed }}</h2>
                <h2 class="bottom-30 absolute pl-40 font-extrabold text-white">MPH: {{ speed * 2.236936 }}</h2>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue';
import { usePlayerStats } from '../../../../webview/composables/usePlayerStats';
import { HudConfig } from '../shared/config';
import { useEvents } from '../../../../webview/composables/useEvents';

const events = useEvents();

const {
    health,
    armour,
    speed,
    weather,
    crossingRoad,
    street,
    engineOn,
    fps,
    gear,
    headlights,
    highbeams,
    inVehicle,
    inWater,
    indicatorLights,
    isTalking,
    maxGear,
    ping,
    stamina,
    time,
    vehicleHealth,
    weapon,
} = usePlayerStats();

const isMetric = HudConfig.metric;
const maxSpeed = isMetric ? 260 : 160;
const testSpeed = ref(0);

const meterBar = ref(615);
const meterBG = ref(0);

function updateMeterBar(speed) {
    const convertedSpeed = speed;

    const newStrokeDashoffsetBar = 615 - (convertedSpeed / maxSpeed) * 615;
    const newStrokeDashoffsetBG = (convertedSpeed / maxSpeed) * 615;

    meterBar.value = newStrokeDashoffsetBar;
    meterBG.value = newStrokeDashoffsetBG;
}

function convertSpeed(speed) {
    return isMetric ? speed * 3.6 : speed * 2.236936;
}

watch(testSpeed, (newSpeed) => {
    updateMeterBar(newSpeed);
});

onMounted(() => {
    events.on('setSpeed', (newSpeed) => {
        testSpeed.value = newSpeed;
    });
});
</script>

<style>
.tacho-meter-bar {
    filter: drop-shadow(1px 1px 4px #553adf);
    -webkit-filter: drop-shadow(1px 1px 4px #553adf);
}

.tacho svg {
    mask: url('../images/newMask.png');
}

#meter-bar,
#meter-bg {
    stroke-dasharray: 615;
}
</style>
