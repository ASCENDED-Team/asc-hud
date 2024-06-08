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
            />
        </Transition>
    </div>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue';
import { usePlayerStats } from '../../../../webview/composables/usePlayerStats';
import { HudConfig } from '../shared/config';
import { useEvents } from '../../../../webview/composables/useEvents';

import Speedometer from './components/Speedometer.vue';

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
