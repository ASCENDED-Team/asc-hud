<template>
    <div class="tacho absolute bottom-5 right-12 w-auto">
        <div
            class="tacho-wrapper relative h-[270px] w-[270px] rounded-full bg-gradient-to-t from-slate-400/20 to-slate-800/50"
        >
            <TachoMeter :speed="convertSpeed(speed)" :isMetric="isMetric" />
            <Fuel />
        </div>
        <Speed :speed="convertSpeed(speed).toFixed(0)" :isMetric="isMetric" />
        <VehicleData :engineOn="engineOn" :headlights="headlights" :highbeams="highbeams" />
    </div>
</template>

<script setup>
import TachoMeter from './speedo/tachometer.vue';
import Fuel from './speedo/fuel.vue';
import Speed from './speedo/speed.vue';
import VehicleData from './speedo/vehicledata.vue';

const { speed, gear, maxGear, engineOn, headlights, highbeams, isMetric } = defineProps([
    'speed',
    'gear',
    'maxGear',
    'engineOn',
    'headlights',
    'highbeams',
    'isMetric',
]);

function convertSpeed(speed) {
    return isMetric ? speed * 3.6 : speed * 2.236936;
}
</script>

<style></style>
