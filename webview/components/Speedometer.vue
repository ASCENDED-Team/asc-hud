<template>
    <div class="tacho absolute bottom-5 right-12 w-auto">
        <div
            class="tacho-wrapper relative h-[270px] w-[270px] rounded-full bg-gradient-to-t from-gray-500/20 to-transparent"
        >
            <TachoMeter :unitSpeed="getUnitAndSpeed(useKnots, vehicleClass, isMetric, speed)" />
            <Fuel :fuel="fuelPercentage" />
        </div>
        <Speed :unitSpeed="getUnitAndSpeed(useKnots, vehicleClass, isMetric, speed)" />
        <VehicleData
            :engineOn="engineOn"
            :locked="locked"
            :headlights="headlights"
            :highbeams="highbeams"
            :seatBelt="seatBelt"
        />
    </div>
</template>

<script setup lang="ts">
const events = useEvents();
import TachoMeter from './speedo/tachometer.vue';
import Fuel from './speedo/fuel.vue';
import Speed from './speedo/speed.vue';
import VehicleData from './speedo/vehicledata.vue';
import { useEvents } from '@Composables/useEvents';
import { ref, computed } from 'vue';
import { HUDEvents } from '@Plugins/asc-hud/shared/src/events';

const { speed, gear, maxGear, engineOn, locked, headlights, highbeams, isMetric, useKnots, vehicleClass, seatBelt } =
    defineProps([
        'speed',
        'gear',
        'maxGear',
        'engineOn',
        'locked',
        'headlights',
        'highbeams',
        'isMetric',
        'useKnots',
        'vehicleClass',
        'seatBelt',
    ]);

const fuelPercentage = ref(0);
events.on(HUDEvents.WebView.PUSH_FUEL, (value: number) => {
    fuelPercentage.value = value;
});

function getUnitAndSpeed(_useKnots: boolean, _vehicleClass: number, _isMetric: boolean, _speed: number) {
    let _unit: string;
    let _calcSpeed: number;

    if (_useKnots) {
        if (_vehicleClass > 13 && _vehicleClass < 17) {
            _unit = 'KN';
        } else {
            _unit = _isMetric ? 'KM/H' : 'Mph';
        }
    } else {
        _unit = _isMetric ? 'KM/H' : 'Mph';
    }

    switch (_unit) {
        case 'KM/H':
            _calcSpeed = _speed * 3.6;
            break;
        case 'Mph':
            _calcSpeed = _speed * 2.236936;
            break;
        case 'KN':
            _calcSpeed = _speed * 1.943844;
            break;
        default:
            _calcSpeed = _speed * 3.6;
            break;
    }

    return { unit: _unit, speed: _calcSpeed };
}
</script>

<style></style>
