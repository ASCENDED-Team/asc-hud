<template>
    <div class="h-screen w-screen">
        <Transition name="slide-fade">
            <Speedometer
                v-if="inVehicle"
                :speed="speed"
                :gear="gear"
                :maxGear="maxGear"
                :engineOn="engineOn"
                :headlights="headlights"
                :highbeams="highbeams"
                :isMetric="HudConfig.metric"
                :seatBelt="seatBelt"
            />
        </Transition>
    </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue';
import { usePlayerStats } from '../../../../webview/composables/usePlayerStats';
import { useAudio } from '../../../../webview/composables/useAudio';
import { HudConfig } from '../shared/config';
import { useEvents } from '../../../../webview/composables/useEvents';

import Speedometer from './components/Speedometer.vue';

const audio = useAudio();
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

const seatBelt = ref(false);

function setSeatbelt(value) {
    seatBelt.value = value;

    if (!inVehicle.value) return;

    if (seatBelt.value) {
        audio.play('/sounds/seatbelt_on.ogg');
    } else {
        audio.play('/sounds/seatbelt_off.ogg');
    }
}

onMounted(() => {
    events.on('ASC:HUD:SEATBELT', setSeatbelt);
    document.documentElement.style.setProperty('--hud-color', HudConfig.color);
});
</script>

<style>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(100px);
    opacity: 0;
}
</style>
