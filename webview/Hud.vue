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
                <h2 class="absolute bottom-0 pl-40 font-extrabold text-white">KMH: {{ convertMPHtoKPH(speed) }}</h2>
                <h2 class="absolute bottom-10 pl-40 font-extrabold text-white">MPH: {{ speed }}</h2>
            </div>
        </div>
    </div>
</template>

<script setup>
import { watch, ref } from 'vue';
import { usePlayerStats } from '../../../../webview/composables/usePlayerStats';

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

let meterBar = ref(0);
let meterBG = ref(615);

function updateMeterBar(speed) {
    if (speed < 0) speed = 0;
    if (speed > 260) speed = 260;

    const newStrokeDashoffsetBar = 615 - (speed / 180) * 615;
    const newStrokeDashoffsetBG = (speed / 180) * 615;

    meterBar = newStrokeDashoffsetBar;
    meterBG = newStrokeDashoffsetBG;
    console.log(newStrokeDashoffsetBar);
}

function convertMPHtoKPH(mph) {
    return mph * 1.60934;
}

watch(speed, (newSpeed) => {
    updateMeterBar(newSpeed);
});
</script>

<style>
.tacho-meter-bar {
    -webkit-filter: drop-shadow(1px 1px 4px #553adf);
    -moz-filter: drop-shadow(1px 1px 4px #553adf);
    -ms-filter: drop-shadow(1px 1px 4px #553adf);
    -o-filter: drop-shadow(1px 1px 4px #553adf);
}

.tacho svg {
    mask: url('../images/newMask.png');
}

#meter-bar,
#meter-bg {
    stroke-dasharray: 615;
}
</style>
