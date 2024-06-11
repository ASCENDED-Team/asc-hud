<template>
    <div class="tacho absolute bottom-5 right-12 w-auto">
        <div
            class="tacho-wrapper relative h-[270px] w-[270px] rounded-full bg-gradient-to-t from-gray-500/20 to-transparent"
        >
            <TachoMeter :speed="convertSpeed(speed)" :isMetric="isMetric" />
            <Fuel :fuel="40" />
        </div>
        <Speed :speed="convertSpeed(speed).toFixed(0)" :isMetric="isMetric" />
        <VehicleData
            :engineOn="engineOn"
            :locked="locked"
            :headlights="headlights"
            :highbeams="highbeams"
            :seatBelt="seatBelt"
        />
    </div>
</template>

<script setup>
import TachoMeter from './speedo/tachometer.vue';
import Fuel from './speedo/fuel.vue';
import Speed from './speedo/speed.vue';
import VehicleData from './speedo/vehicledata.vue';

const { speed, gear, maxGear, engineOn, locked, headlights, highbeams, isMetric, seatBelt } = defineProps([
    'speed',
    'gear',
    'maxGear',
    'engineOn',
    'locked',
    'headlights',
    'highbeams',
    'isMetric',
    'seatBelt',
]);

function convertSpeed(speed) {
    return isMetric ? speed * 3.6 : speed * 2.236936;
}
</script>

<style></style>
