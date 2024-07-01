<template>
    <div class="h-screen w-screen">
        <PlayerData :domain="HudConfig.domain" :players="onlinePlayers" :time="formattedTime" />
        <Transition name="slide">
            <Coords
                id="coordsDiv"
                :direction="direction"
                :street="street"
                class="absolute bottom-[10px] left-[50px] transition-all duration-500 ease-in-out"
                :style="getCoordsStylePosition"
            />
        </Transition>
        <Vitality
            class="absolute bottom-[70px] left-[50px] transition-all duration-500 ease-in-out"
            :health="health"
            :armour="armour"
            :style="getVitalityStylePosition"
        />
        <Progressbar />
        <Transition name="slide-fade">
            <Speedometer
                v-if="inVehicle"
                :speed="speed"
                :gear="gear"
                :maxGear="maxGear"
                :engineOn="engineOn"
                :locked="locked"
                :headlights="headlights"
                :highbeams="highbeams"
                :isMetric="HudConfig.metric"
                :seatBelt="seatBelt"
                :fuelPercentage="fuelPercentage"
                :milage="milage"
            />
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { usePlayerStats } from '../../../../webview/composables/usePlayerStats';
import { useMinimap } from '../../../../webview/composables/useMinimap';
import { useAudio } from '../../../../webview/composables/useAudio';
import { HudConfig } from '../shared/config';
import { useEvents } from '../../../../webview/composables/useEvents';

import Coords from './components/Street.vue';
import Vitality from './components/Vitality.vue';
import Progressbar from './components/Progressbar.vue';
import Speedometer from './components/Speedometer.vue';
import { HUDEvents } from '../shared/src/events';
import PlayerData from './components/PlayerData.vue';

const audio = useAudio();
const events = useEvents();

const { minimap } = useMinimap();

const {
    health,
    armour,
    speed,
    street,
    direction,
    engineOn,
    locked,
    gear,
    headlights,
    highbeams,
    inVehicle,
    maxGear,
    time,
} = usePlayerStats();

const seatBelt = ref(false);
const onlinePlayers = ref(0);
const fuelPercentage = ref(0);
const milage = ref(0);

function setSeatbelt(value) {
    if (value === seatBelt.value) return;

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
        let coordsHeight = document.getElementById('coordsDiv')?.offsetHeight || 30;
        let coordsBottom = document.getElementById('coordsDiv')?.style.bottom;

        return [
            `left: ${minimap.value.left - 8}px`,
            `bottom: ${coordsHeight * 2 - parseInt(coordsBottom)}px`,
            `width: ${minimap.value.width}px`,
            `flex-direction: row`,
        ];
    }

    return [`left: ${minimap.value.left + minimap.value.width}px`, `top: ${minimap.value.top}px`];
});

const formattedTime = computed(() => {
    const { hour, minute } = time.value;

    const utcDate = new Date();
    utcDate.setUTCHours(hour);
    utcDate.setUTCMinutes(minute);

    const formatter = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: HudConfig.timezone,
    });

    const formatted = formatter.format(utcDate);
    return formatted;
});

onMounted(() => {
    events.on(HUDEvents.WebView.SEATBELT, setSeatbelt);
    events.on(HUDEvents.WebView.UPDATE_PLAYERS, (players) => {
        onlinePlayers.value = players;
    });
    events.on(HUDEvents.WebView.PUSH_FUEL, (value: number) => {
        fuelPercentage.value = value;
    });
    events.on(HUDEvents.WebView.PUSH_MILAGE, (value: number) => {
        milage.value = parseFloat(value.toFixed(0));
    });

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
