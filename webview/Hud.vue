<template>
    <div class="h-screen w-screen">
        <Transition name="slide">
            <Coords
                :direction="direction"
                :street="street"
                class="absolute bottom-[10px] left-[50px] transition-all duration-500 ease-in-out"
                :style="getCoordsStylePosition"
            />
        </Transition>
        <Vitality
            class="absolute bottom-[70px] left-[50px] transition-all duration-500 ease-in-out"
            :style="getVitalityStylePosition"
        />
        <Transition name="slide-fade">
            <Speedometer
                :speed="speed"
                :gear="gear"
                :maxGear="maxGear"
                :engineOn="engineOn"
                :locked="locked"
                :headlights="headlights"
                :highbeams="highbeams"
                :isMetric="HudConfig.metric"
                :seatBelt="seatBelt"
            />
        </Transition>
    </div>
</template>

<script setup>
import { onMounted, computed, watch, ref } from 'vue';
import { usePlayerStats } from '../../../../webview/composables/usePlayerStats';
import { useMinimap } from '../../../../webview/composables/useMinimap';
import { useAudio } from '../../../../webview/composables/useAudio';
import { HudConfig } from '../shared/config';
import { useEvents } from '../../../../webview/composables/useEvents';

import Coords from './components/Street.vue';
import Vitality from './components/Vitality.vue';
import Speedometer from './components/Speedometer.vue';
import { HUDEvents } from '../shared/src/events';

const audio = useAudio();
const events = useEvents();

const { minimap } = useMinimap();

const {
    health,
    armour,
    speed,
    weather,
    crossingRoad,
    street,
    direction,
    engineOn,
    locked,
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

const getCoordsStylePosition = computed(() => {
    if (!minimap.value) {
        return ``;
    }

    if (HudConfig.hideMinimapOnFoot && !inVehicle.value) {
        return [`left: ${minimap.value.left}px`, `bottom: 10px`, `width: ${minimap.value.width}px`];
    }

    return [
        `left: ${minimap.value.left}px`,
        `bottom: ${minimap.value.screenHeight - minimap.value.bottom + minimap.value.height}px`,
        `width: ${minimap.value.width}px`,
    ];
});

const getVitalityStylePosition = computed(() => {
    if (!minimap.value) {
        return ``;
    }

    if (HudConfig.hideMinimapOnFoot && !inVehicle.value) {
        return [
            `left: ${minimap.value.left - 8}px`,
            `bottom: 70px`,
            `width: ${minimap.value.width}px`,
            `flex-direction: row`,
        ];
    }

    return [`left: ${minimap.value.left + minimap.value.width}px`, `top: ${minimap.value.top}px`];
});

onMounted(() => {
    events.on(HUDEvents.ToClient.SEATBELT, setSeatbelt);
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

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.5s;
}

.slide-enter,
.slide-leave-to {
    transform: translateX(100%);
}
</style>
